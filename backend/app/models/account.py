from datetime import datetime
import uuid
from app import db


"""class that creates accounts for a company"""
class Account(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    name = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False, index=True)
    sub_category = db.Column(db.String(255), index=True)
    debit_total = db.Column(db.Integer, default=0)
    credit_total = db.Column(db.Integer, default=0)
    company_id = db.Column(db.String(36), db.ForeignKey('company.id'))
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'))

    def __init__(self, **kwargs):
        self.id = str(uuid.uuid4())
        super(Account, self).__init__(**kwargs)

    def to_dict(self):
        """Returns Account object with some of its attributes"""
        new_dict = {}
        new_dict['id'] = self.id
        new_dict['name'] = self.name
        new_dict['category'] = self.category
        return new_dict