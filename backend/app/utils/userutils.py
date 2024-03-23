from app.models.user import User
from app.models import Account, Company
from app.models.account import db
from flask_login import login_user
from .companyutils import chart_of_accounts
from typing import Tuple, Union


"""create a user"""
def register_user(firstname: str, lastname:str, email:str, password:str, company_name: str) -> Tuple[Union[str, User], int]:
    """returns new user or error with appropriate status code"""
    try:
        user_exist = User.query.filter_by(email=email).first()
        company_exist = Company.query.filter_by(
            name=company_name
        ).first()
        if user_exist:
            raise ValueError(f'User {email} already exists')
        if company_exist:
            raise ValueError(f'Company {company_name} already exists')
        
        user = User(firstname=firstname, lastname=lastname, email=email)
        user.set_password(password)
        company = Company(name=company_name)
        db.session.add(user)
        db.session.add(company)
        user.selected_company_id = company.id
        company.set_user_role(user.id, is_admin=True)
        
        for category, subcategories in chart_of_accounts.items():
            for subcategory, accounts in subcategories.items():
                for account in accounts:
                    account = Account(
                        user_id=user.id,
                        company_id=company.id,
                        name=account,
                        category=category,
                        sub_category=subcategory
                    )
                    db.session.add(account)
        db.session.commit()
        login_user(user)
        print(user.to_dict())
        return user.to_dict(), 201
    
    except ValueError as e:

        db.session.rollback()
        return (str(e), 400)
    except Exception as e:
        db.session.rollback()
        return (str(e), 500)

def get_user(user_email:str, password:str = None) -> Tuple[Union[str, User], int]:
    """returns user if exist or error with appropriate status code"""
    try:
        user = User.query.filter_by(email=user_email).first()
        if not user:
            raise ValueError(f'User {user_email} does not exist')
        if password:
            valid_password = user.check_password(password)
            if not valid_password:
                raise ValueError('Wrong password')
            login_user(user)
            return user.to_dict(), 200
        
    except ValueError as e:
        return (str(e), 400)
    
    except Exception as e:
        return (str(e), 500)

def update_userinfo(user: User, data: dict) -> Tuple[Union[str, User], int]:
    """updates user information
    Returns user or error with updated information and appropriate status code
    """
    try:
        for key, value in data.items():
            if key != 'id':
                if key == 'password':
                    user.set_password(value)
                else:
                    setattr(user, key, value)
        db.session.commit()
        return (user, 200)
    except Exception as e:
        db.session.rollback()
        return (str(e), 400)
 