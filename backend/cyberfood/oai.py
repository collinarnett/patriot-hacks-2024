import logging
import os
from enum import Enum

import requests
from openai import OpenAI
from pydantic import BaseModel


class Classification(str, Enum):
    unprocessed = "Unprocessed"
    processed = "Processed"
    ultraprocessed = "Ultra-processed"


class NovaClassification(BaseModel):
    name: str
    classification: Classification


class IngredientClass(BaseModel):
    class_: Classification


class Product(BaseModel):
    name: str


class Ingredients(BaseModel):
    ingredients: list[str]


class Food(BaseModel):
    fdc_id: str
    description: str
    ingredients: list[str]


def find_ingredients(object_: str) -> Food | None:
    data_gov_api_key = os.environ["DATA_GOV_API_KEY"]
    food_data_search_endpoint = "https://api.nal.usda.gov/fdc/v1/foods/search"
    params = {
        "api_key": data_gov_api_key,
        "query": object_,
        "pageSize": 5,
        "dataType": ["Branded"],
    }
    response = requests.get(food_data_search_endpoint, params=params)

    client = OpenAI()

    def prompt(foods: list) -> Food | None:
        p = f"""
        Pick one of the following foods that best matches the search term.
        Extract the "fdcId", "description" and "ingredients" of the food you have chosen.

        Search Term:
        {object_}

        Foods:
        {foods}

        Food:
        """
        response = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": p,
                }
            ],
            response_format=Food,
        )
        return response.choices[0].message.parsed

    if response.status_code == 200:
        search_results: list[str] = response.json()["foods"]
        return prompt(search_results)
    elif response.status_code == 400:
        logging.error("FoodData API: bad input parameter")
        return


def classify_ingredients(ingredients: list[str]) -> list[NovaClassification | None]:
    cwd = os.path.dirname(__file__)
    rel_path = "config/nova_classification_guide.md"
    guide_path = os.path.join(cwd, rel_path)
    with open(guide_path, "r") as f:
        nova_classification_guide = f.read()

    client = OpenAI()

    def prompt(ingredient: str) -> NovaClassification | None:
        p = f"""
        Classify this food ingredient as one of the 3 following classification groups.
        Use the subsequent NOVA classification guide in order to perform the classification.

        Ingredient:
        {ingredient}

        Classification groups:
        * Unprocessed
        * Processed
        * Ultra-processed

        Classification guide:
        {nova_classification_guide}

        Classification:
        """
        response = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": p,
                }
            ],
            response_format=IngredientClass,
        )
        result = response.choices[0].message.parsed
        if result:
            return NovaClassification(name=ingredient, classification=result.class_)
        else:
            return

    return [prompt(ingredient) for ingredient in ingredients]


def identify_object(image: str) -> Product:
    client = OpenAI()

    prompt = """
    Write the name of the product in this image below.

    Product:
    """

    img_type = "image/jpeg"

    response = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:{img_type};base64,{image}"},
                    },
                ],
            }
        ],
        response_format=Product,
    )
    return response.choices[0].message.parsed
