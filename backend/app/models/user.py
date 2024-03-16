from app import db
from base import Base, user_company_association


class User(db.Model, Base):
    __tablename__ = 'users'

    username = db.Column(db.String(64), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    companies = db.relationship('Company', secondary=user_company_association, backref='users')

    def get_role_for_company(self, company_id):
        """get role of user for a specific company"""
        association = user_company_association.query.filter_by(
            user_id=self.id,
            company_id=company_id
        ).first()
        return association.role if association else None
    
    def set_user_role(self, user_id, is_admin=False):
        """get the association from database to see if it exists"""   
        association = user_company_association.query.filter_by(
            user_id=user_id,
            company_id=self.id
        ).first()

        if association:
            """if association is present then update"""
            association.is_admin = is_admin
        else:
            """if it does not exist then we create a new one"""
            association = user_company_association.insert().values(
                user_id=user_id,
                company_id=self.id,
                is_admin=is_admin
            )
        db.session.execute(association)
        db.session.commit()
