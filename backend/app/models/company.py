from app import db
from base import Base, user_company_association


class Company(db.Model, Base):
    name = db.Column(db.String(128), nullable=False, unique=True)
    users = db.relationship('User', secondary=user_company_association, backref='companies')

    def get_user_role(self, user_id):
        """Get user role in a company"""
        association = user_company_association.query.filter_by(
            user_id=user_id,
            company_id=self.id
        ).first()
        return association.role if association else None
