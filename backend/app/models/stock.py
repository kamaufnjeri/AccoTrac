from datetime import datetime
import uuid
from app import db


class Stock(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    name = db.Column(db.String(255))
    total_quantity = db.Column(db.Integer, default=0)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'))
    company_id = db.Column(db.String(36), db.ForeignKey('company.id'))
    entries = db.relationship('StockEntry', backref='stock', lazy=True)

    def get_sorted_purchase_entries(self):
        non_zero_entries = [
            entry for entry in self.entries
            if entry.quantity != 0 and entry.category == "purchase"
        ]
        sorted_entries = sorted(non_zero_entries, key=lambda x: x.date)

        return sorted_entries
    
    def get_sorted_sales_entries(self):
        non_zero_entries = [
            entry for entry in self.entries
            if entry.quantity != 0 and entry.category == "sales"
        ]
        sorted_entries = sorted(non_zero_entries, key=lambda x: x.date)

        return sorted_entries
    

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "total_quantity": self.total_quantity,
            "company_id": self.company_id,
            "user_id": self.user_id,
            "entries": [entry.to_dict() for entry in self.entries],
            # ... (add other relevant fields)
        }