from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config

"""Set up flask"""
app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
cors = CORS(app, origins="http://localhost:3000")
migrate = Migrate(app, db)

from app.routes import *
app.register_blueprint(transaction_bp)
app.register_blueprint(stock_bp)