import flask
import os
from flask import jsonify, request
import numpy as np
import random
import json
from Climate import *
import random
import numpy as np
from humidity import *
from predict import *
from SortDataByPrice import *
from CropRotation import *
from CropRecommendation import *
from flask_cors import CORS

app = flask.Flask(__name__)
app.debug = True
CORS(app, origins=["http://localhost:3000", "https://shehryarusman.github.io"])

@app.route('/')
def index():
    return {"Hello": "World"}, 200

@app.route('/news', methods = ['GET'])
def get_posts():
    file = "news.json"
    directory = "backend"
    with open(os.path.join(directory, file), "r") as json_file:
        json_data = json.load(json_file)
    return jsonify(json_data)

@app.route('/predict', methods=['GET', 'OPTIONS'])
def predict():
    lat = float(request.args.get('latitude', 33.44193097647909))
    lang = float(request.args.get('longitude', -112.07110698105588))
    print(lat,lang)
    temperature, precipitation = collect_weather(lat, lang)
    Ph =  pH_of_soil()
    humidity = get_humidity(lat, lang)
    commodities = predict_crop(temperature, humidity, Ph, precipitation)
    print(commodities)
    prices = control(lat, lang, commodities)
    print(prices)
    keys = list(prices.keys())
    values = list(prices.values())
    sorted_value_index = np.argsort(values)
    sorted_dict = {keys[i]: values[i] for i in sorted_value_index}
    print(sorted_dict)

    output_json = {}
    output_json["rotationTxt"] = main_rotation(list(sorted_dict.keys()))
    print(output_json["rotationTxt"])
    add_data = main_howto(sorted_dict)
    print(add_data)
    output_json["cropSpecific"] = add_data

    return output_json

def pH_of_soil():
    return random.choice(np.arange(4.5, 8.5, 0.007))

def test(a, b):
    print(a,b)

if __name__ == '__main__':
    dirName = "backend"
    certName = os.path.join(dirName, "cert.pem")
    keyName = os.path.join(dirName, 'key.pem')
    context = (certName, keyName)
    app.run(ssl_context=context)
