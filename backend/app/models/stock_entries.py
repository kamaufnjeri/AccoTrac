from datetime import datetime
import uuid
from app import db


class StockEntry(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    stock_id = db.Column(db.String(36), db.ForeignKey('stock.id'))
    account_id = db.Column(db.String(36), db.ForeignKey('account.id'))
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'))
    transaction_id = db.Column(db.String(36), db.ForeignKey('transaction.id'))
    quantity = db.Column(db.Integer)
    remaining_quantity = db.Column(db.Integer)
    price = db.Column(db.Integer)
    date = db.Column(db.Date)
    category = db.Column(db.String(255))
    cogs = db.Column(db.Integer, default=0)


    def to_dict(self):
        return {
            "id": self.id,
            "stock_id": self.stock_id,
            "quantity": self.quantity,
            "remaining_quantity": self.remaining_quantity,
            "price": self.price,
            "date": self.date,
            "category": self.category,
            "cost_of_goods_sold": self.cogs
        }