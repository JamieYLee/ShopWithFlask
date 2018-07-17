# imports necessary for bare flask app
from flask import Flask
from flask_bootstrap import Bootstrap

# application variables
app = Flask(__name__)
bootstrap = Bootstrap(app)

# routes must be imported after app variable is set
from app import routes
