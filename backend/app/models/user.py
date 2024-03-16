from app import db
from datetime import datetime
import uuid
from .user_company import UserCompanyAssociation


class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    username = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    accounts = db.relationship('Account', backref='users', lazy=True)


    def __init__(self, **kwargs):
        self.id = str(uuid.uuid4())
        super(User, self).__init__(**kwargs)

    def get_role_for_company(self, company_id):
        """get role of user for a specific company"""
        association = UserCompanyAssociation.query.filter_by(
            user_id=self.id,
            company_id=company_id
        ).first()
        return association.role if association else None
    