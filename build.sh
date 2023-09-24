#!/bin/bash

set -o errexit

pip install -r requirements.txt

export FLASK_APP=./backend/app.py 
flask run --cert=cert.pem --key=key.pem