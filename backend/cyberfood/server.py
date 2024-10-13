import base64

import werkzeug
from flask import Blueprint, request

from cyberfood import oai
from cyberfood.oai import Classification, NovaClassification

bp = Blueprint("api", __name__, url_prefix="/api")


def calculate_score(ingredients: list[NovaClassification]) -> float:
    total_weight = 0
    for ingredient in ingredients:
        if ingredient.classification == Classification.processed:
            total_weight += 1
        elif ingredient.classification == Classification.ultraprocessed:
            total_weight += 2

    return total_weight / len(ingredients) if ingredients else 0


@bp.route("image", methods=["POST"])
def image():

    data = request.get_json()

    # Decode the base64 string
    img_b64_str = base64.b64decode(data["image"]).decode("utf-8")
    product = oai.identify_object(img_b64_str)
    if product:
        return {"name": product.name}
    else:
        raise werkzeug.exceptions.InternalServerError(
            "Error occured when attempting to identify object"
        )


@bp.route("ingredients", methods=["POST"])
def ingredients():

    data = request.get_json()

    result = oai.find_ingredients(data["name"])
    if result:
        return {"name": data["name"], "ingredients": result.ingredients}
    else:
        raise werkzeug.exceptions.InternalServerError(
            "Error occured when attempting to find ingredients"
        )


@bp.route("classification", methods=["POST"])
def classification():
    data = request.get_json()

    result = oai.classify_ingredients(data["ingredients"])
    if result:
        return {
            "name": data["name"],
            "ingredients": [i.dict() for i in result if i],
            "score": calculate_score(result),
        }
    else:
        raise werkzeug.exceptions.InternalServerError(
            "Error occured when attempting to classify ingredients"
        )
