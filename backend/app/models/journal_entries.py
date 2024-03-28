from datetime import datetime
import uuid
from app import db


class JournalEntry(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    transaction_id = db.Column(db.Integer, db.ForeignKey('transaction.id'))
    account_id = db.Column(db.Integer, db.ForeignKey('account.id'))
    debit = db.Column(db.Integer, default=0)
    credit = db.Column(db.Integer, default=0)


    def __init__(self, **kwargs):
        self.id = str(uuid.uuid4())
        super(JournalEntry, self).__init__(**kwargs)

    def to_dict(self):
        return {
            "id": self.id,
            "account_name": self.account.name,
            "debit": self.debit,
            "credit": self.credit,
        }