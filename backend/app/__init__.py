from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from flask_login import LoginManager

"""Set up flask"""
app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
cors = CORS(app, origins="http://localhost")
migrate = Migrate(app, db)
login = LoginManager(app)


from app.routes import *
# handle 401 error
@app.errorhandler(401)
def custom_401(error):
    message = {'error': str(error)}
    return jsonify(message), 401