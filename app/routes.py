from app import app
from flask import render_template, jsonify, request # needed to render html files
import requests

@app.route('/')
@app.route('/index', methods = ['POST'])
def index():
    url = 'https://jamieylee.github.io/productJSON/'
    value = requests.get(url).json()
    return render_template('index.html', value=value)
