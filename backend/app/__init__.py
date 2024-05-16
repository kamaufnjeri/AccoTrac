from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from flask_login import LoginManager
from flask_mail import Mail, Message
"""send email asynchronously in the background"""
from threading import Thread


"""load dot environment to get environment variables from .env file"""
load_dotenv()
"""Set up flask"""
app = Flask(__name__)


app.config.from_object(Config)
db = SQLAlchemy(app)
cors = CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost"]}}, supports_credentials=True)
migrate = Migrate(app, db)
login = LoginManager(app)

"""setup mail"""
mail = Mail(app)

"""send email"""
def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)

def send_email(subject, sender, recipients, text_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    try:
        Thread(target=send_async_email, args=(app, msg)).start()
        return "Success sending email", True
    except Exception as e:
        return str(e), False

"""import all routes and register them"""  
from app.routes import *
app.register_blueprint(transaction_bp)
app.register_blueprint(account_bp)
app.register_blueprint(report_bp)
app.register_blueprint(user_bp)
app.register_blueprint(backend_only_bp)

"""handle 401 error"""
@app.errorhandler(401)
def custom_401(error):
    message = {'error': str(error)}
    return jsonify(message), 401