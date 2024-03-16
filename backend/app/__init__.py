from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config

"""Set up flask"""
app = Flask(__name__)
db = SQLAlchemy(app)
app.config.from_object(Config)
cors = CORS(app, origins="http://localhost")
migrate = Migrate(app, db)