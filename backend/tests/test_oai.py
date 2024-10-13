import base64

from cyberfood import oai


def test_identify_redbull():
    with open("./tests/assets/redbull.jpeg", "rb") as f:
        image = base64.b64encode(f.read()).decode("utf-8")
    result = oai.identify_object(image)
    assert result.name == "Red Bull Energy Drink"


def test_find_redbull_ingredients():
    product = "Red Bull Energy Drink"
    result = oai.find_ingredients(product)
    assert result
    assert result.fdc_id == "541366"


def test_classify_redbull_ingredients():
    ingredients = [
        "CARBONATED WATER",
        "SUCROSE",
        "GLUCOSE",
        "CITRIC ACID",
        "TAURINE",
        "NATURAL AND ARTIFICIAL FLAVORS",
        "SODIUM CITRATE",
        "CAFFEINE",
        "COLORS",
        "NIACINAMIDE",
        "PYRIDOXINE HCL",
        "CALCIUM PANTOTHENATE",
        "ASCORBIC ACID",
        "VITAMIN B12",
    ]
    result = oai.classify_ingredients(ingredients)
    print(result)
