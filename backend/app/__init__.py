from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from flask_login import LoginManager
from flask_mail import Mail, Message
from threading import Thread, Event # send email asynchronously in the background


# load dot environment to get environment variables from .env file
load_dotenv()

"""Set up flask"""
app = Flask(__name__)


app.config.from_object(Config)
db = SQLAlchemy(app)
cors = CORS(app, origins="http://localhost")
migrate = Migrate(app, db)
login = LoginManager(app)

# setup mail
mail = Mail(app)

# send email
def send_async_email(app, msg, completion_event):
    try:
        with app.app_context():
            mail.send(msg)
        completion_event.set()  # Signal that email sending is completed successfully
    except Exception as e:
        completion_event.set()  # Signal that email sending failed


def send_email(subject, sender, recipients, text_body):
    completion_event = Event()  # Event to signal completion
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    Thread(target=send_async_email, args=(app, msg, completion_event)).start()
    return completion_event  # Return the event for the caller to wait on

from app.routes import *
# handle 401 error
@app.errorhandler(401)
def custom_401(error):
    message = {'error': str(error)}
    return jsonify(message), 401