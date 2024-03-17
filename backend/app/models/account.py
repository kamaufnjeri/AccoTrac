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
    stock_entries =db.relationship('StockEntries', backref='account', lazy=True)
    journal_entries = db.relationship('JournalEntry', backref='account', lazy=True)

    def __init__(self, **kwargs):
        self.id = str(uuid.uuid4())
        super(Account, self).__init__(**kwargs)

    def to_dict(self):
        return {
            "name": self.name,
            "category": self.category,
            "sub_category": self.sub_category,
            "id": self.id,
            "company_id": self.id,
            "debit_total": self.debit_total,
            "credit_total": self.credit_total,
            "entries": [
                entry.to_dict() for entry in self.journal_entries
            ]
        }