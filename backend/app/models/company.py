from app import db
from datetime import datetime
import uuid
from .user_company import UserCompanyAssociation

class Company(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    name = db.Column(db.String(128), nullable=False, unique=True)
    accounts = db.relationship('Account', backref='company', lazy=True)
    transactions = db.relationship('Transaction', backref='company', lazy=True)
    #stocks = db.relationship('Stock', backref='company', lazy=True)
    selected_company = db.relationship('User', backref='selected_company', lazy=True)


    def __init__(self, **kwargs):
        self.id = str(uuid.uuid4())
        super(Company, self).__init__(**kwargs)

    def get_user_role(self, user_id):
        """Get user role in a company"""
        association = UserCompanyAssociation.query.filter_by(
            user_id=user_id,
            company_id=self.id
        ).first()
        return association.role if association else None
    
    
    def set_user_role(self, user_id, is_admin=False):
        """get the association from database to see if it exists""" 
        association = UserCompanyAssociation.query.filter_by(
            user_id=user_id,
            company_id=self.id
        ).first()

        if association:
            """if association is present then update"""
            association.is_admin = is_admin
        else:
            """if it does not exist then we create a new one"""
            association = UserCompanyAssociation(
                user_id=user_id,
                company_id=self.id,
                is_admin=is_admin
            )
        db.session.add(association)
        db.session.commit()

    def to_dict(self):
        return {
            "name": self.name,
            "accounts": [account.to_dict() for account in self.accounts]
        }