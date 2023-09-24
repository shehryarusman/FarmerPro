import flask
from flask import jsonify, request
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
from get_firebase_image import download_first_image_in_folder, delete_folder_contents
from flask_cors import CORS
import time
import tensorflow as tf
import cv2

app = flask.Flask(__name__)
CORS(app)

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

def load_model(model_path: str):
    model = tf.saved_model.load(model_path)
    signatures = list(model.signatures.keys())
    return model, signatures

# the function for the maize prediction
def image_pred(file_path: str, model):

    plant_names = ['Tomato Healthy', 'Tomato Septoria Leaf Spot', 'Tomato Bacterial Spot', 'Tomato Blight', 'Cabbage Healthy', 'Tomato Spider Mite', 'Tomato Leaf Mold', 'Tomato_Yellow Leaf Curl Virus', 'Soy_Frogeye_Leaf_Spot', 'Soy_Downy_Mildew', 'Maize_Ravi_Corn_Rust', 'Maize_Healthy', 'Maize_Grey_Leaf_Spot', 'Maize_Lethal_Necrosis', 'Soy_Healthy', 'Cabbage Black Rot']
    # e = image_name
    e = cv2.imread(file_path)
    # e_r = resized image + rgb image
    e_r = cv2.cvtColor(cv2.resize(e, (300, 300)), cv2.COLOR_BGR2RGB)/255.0
    # e_f = expanded_image
    e_f = np.expand_dims(e_r, axis=0)
    print("Image Shape", e_f.shape)


    # Assuming 'input_data' is your prepared input data tensor
    tensor = tf.convert_to_tensor(e_f)
    float_tensor = tf.cast(tensor, dtype=tf.float32)

    infer = model.signatures['serving_default']
    output_data = infer(float_tensor)
    
    predicted_health = plant_names[np.argmax(output_data["dense_1"][0])]
    return predicted_health, max(output_data["dense_1"][0]).numpy()


@app.route('/api/classifydisease', methods=['GET', 'POST'])
def disease_classification():
    if request.method == "POST":
        doIClassify = dict(request.json)
        print(doIClassify["runmodel"])
        if doIClassify["runmodel"] == True:
            download_first_image_in_folder( 'images/', 'image.png')
            time.sleep(0.5) #optional
            model, signatures = load_model('model')
            classification, percentage = image_pred('image.png', model)
            print("model results:", classification, percentage)
            delete_folder_contents('images/')
            return {"class":classification, "percentage": str(percentage)}
        return {"None": 0.0}
    return {"None": 0.0}
    
if __name__ == '__main__':
    app.run(debug=True)