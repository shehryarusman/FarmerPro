import flask
from flask import jsonify
import pandas as pd
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



app = flask.Flask(__name__)
app.debug = True

@app.route('/')
def index():
    return {"Hello": "World"}, 200

def func(x):
    return 27*np.sin(x/43) + 53 + 10*np.sin(x)/5

def expected(x, poverty):
    if poverty == 0:
        poverty = 1000
    return int(func(x)*5*(poverty/24376))

def getDailyTemps(id):
    f = open("temps.json", "r")
    temps = json.load(f)
    #print(temps)
    return temps[str(id)] 


@app.route('/news', methods = ['GET'])
def get_posts():
    with open("news.json", "r") as json_file:
        json_data = json.load(json_file)
    return jsonify(json_data)

@app.route('/products/<int:product_id>', methods = ['GET'])
def get_products(product_id):
    with open ("records.json", "r") as json_file:
        json_data = json.load(json_file)
    for object_name, object_data in json_data.items():
        if object_data.get('id') == product_id:
            return "product found"
    return "product not found"

@app.route('/api/save-canvas', methods=['POST'])
def save_canvas():
    data = flask.request.get_json()
    dataURL = data['dataURL']
    #print(json.loads(dataURL))
    return jsonify({'message': 'Canvas saved successfully'})
    
    #jsonify({'modelTopology': model_json, 'weightsManifest': weights_manifest})

@app.route('/model')
def export_model():
    return json.load('\backend\model\model.json')

@app.route('/api/predict', methods=['GET'])
def predict(lat=33.44193097647909,lang=-112.07110698105588):
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


if __name__ == '__main__':
    app.run()