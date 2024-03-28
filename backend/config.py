import os
from dotenv import load_dotenv

load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    random_key = os.urandom(24).hex()
    SECRET_KEY = os.environ.get('SECRET_KEY') or random_key
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_PORT = int(os.getenv('MAIL_PORT') or 25)
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS') is not None
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = 'AccoTrac@outlook.com'  # Specify the default sender email address
    MAIL_MAX_EMAILS = None  # Optional: specify the maximum number of emails to send in a single connection
    MAIL_USE_SSL = False
    ADMINS = os.getenv('ADMINS')