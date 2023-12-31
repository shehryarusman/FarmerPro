import pickle
import numpy as np
import os


def predict_crop(temperature, humidity, ph, rainfall):
    file = "finalized_model.sav"
    directory = "backend"
    filename = os.path.join(directory, file)
    clf = pickle.load(open(filename, 'rb'))
    # Real life predictions
    answer = (clf.predict(np.array([temperature, humidity, ph, rainfall]).reshape(1, -1)))
    probs = clf.predict_proba(np.array([temperature, humidity, ph, rainfall]).reshape(1, -1))
    best_n = np.argsort(probs, axis=1)[:,-4:]
    print("-------------")
    print(answer)
    answer = clf.classes_[best_n][0]
    answer = list(answer)
    answer.reverse()
    return answer
