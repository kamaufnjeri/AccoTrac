from datetime import datetime
import uuid
from app import db


class Transaction(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    date = db.Column(db.Date)
    description = db.Column(db.Text)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'))
    company_id = db.Column(db.String(36), db.ForeignKey('company.id'))
    journal_entries = db.relationship('JournalEntry', backref='transaction', lazy=True, cascade='all,delete')
    stock_entries = db.relationship('StockEntry', backref='transaction', lazy=True)
    
    def __init__(self, **kwargs):
        self.id = str(uuid.uuid4())
        super(Transaction, self).__init__(**kwargs)
        
    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "date": self.date.strftime('%Y-%m-%d'),
            "user_id": self.user_id,
            "company_id": self.company_id,
            "entries": [entry.to_dict() for entry in self.journal_entries]
        }