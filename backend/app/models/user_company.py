from app import db
from datetime import datetime
import uuid

"""Association table of many-many-realtionship between users and companies"""
class UserCompanyAssociation(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    company_id = db.Column(db.String(36), db.ForeignKey('company.id'), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    user = db.relationship('User', backref=db.backref('user_companies', lazy=True), cascade="all,delete")
    company = db.relationship('Company', backref=db.backref('company_users', lazy=True), cascade="all,delete")

    def __init__(self, **kwargs):
        self.id = str(uuid.uuid4())
        super(UserCompanyAssociation, self).__init__(**kwargs)