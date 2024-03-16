from datetime import datetime
import uuid
from app import db


"""Base class from which all other classes inherit from"""
class Base:
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


"""relationship many-to-many between user and company"""
user_company_association = db.Table(
    'user_company_association',
    db.Column('user_id', db.String(36), db.ForeignKey('users.id'), primary_key=True),
    db.Column('company_id', db.String(36), db.ForeignKey('companies.id'), primary_key=True),
    db.Column('role', db.String(20), nullable=False)
)