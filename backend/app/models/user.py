from app import db, login
from datetime import datetime
import uuid
from .user_company import UserCompanyAssociation
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(UserMixin, db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    admin_id = db.Column(db.String(36), nullable=False, default='0')
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    firstname = db.Column(db.String(256), nullable=False)
    lastname = db.Column(db.String(256), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    valid_email = db.Column(db.Boolean, default=False)
    password_hash = db.Column(db.String(256), nullable=False)
    accounts = db.relationship('Account', backref='users', lazy=True, cascade="all,delete")


    def __init__(self, **kwargs):
        self.id = str(uuid.uuid4())
        super(User, self).__init__(**kwargs)

    def set_password(self, password):
        """sets user password as a hash"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Return true if user hash password matches user password"""
        return check_password_hash(self.password_hash, password)

    def get_role_for_company(self, company_id):
        """get role of user for a specific company"""
        association = UserCompanyAssociation.query.filter_by(
            user_id=self.id,
            company_id=company_id
        ).first()
        return association.role if association else None

    def to_dict(self):
        """Returns User object with some of its attributes"""
        new_dict = {}
        new_dict['id'] = self.id
        new_dict['firstname'] = self.firstname
        new_dict['lastname'] = self.lastname
        new_dict['email'] = self.email
        return new_dict

@login.user_loader
def load_user(id):
    return db.session.get(User, id)