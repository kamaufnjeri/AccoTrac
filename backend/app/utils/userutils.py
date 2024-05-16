from app.models.user import User
from app.models.account import db
from ..models.user_company import UserCompanyAssociation
from .companyutils import create_new_company
from typing import Tuple, Union


"""create a user"""
def register_user(firstname: str, lastname:str, user_email:str, password:str, company_name:str) -> Tuple[Union[str, User], int]:
    """returns new user or error with appropriate status code"""
    try:
        user_exist = User.query.filter_by(email=user_email).first()
        if user_exist:
            raise ValueError('User already exists')
        user = User(firstname=firstname, lastname=lastname, email=user_email, valid_email=False)
        user.set_password(password)
        db.session.add(user)
        
        resp_item, comp_code = create_new_company(company_name=company_name,
                                           company_email=None,
                                           company_country=None,
                                           company_currency=None,
                                           user_id=user.id)
        if comp_code == 201:
            user.selected_company_id = resp_item.id
            print(resp_item.to_dict())
            newuser = user.to_dict(user.is_authenticated)
            return newuser, 201
        else:
            raise ValueError(resp_item)
    except Exception as e:
        db.session.rollback()
        return (str(e), 400)

def verify_user_email(user: User) -> Tuple[str, int]:
    """verify user email"""
    user.valid_email = True
    db.session.commit()
    return "Email verification successful", 200

def get_user(user_email:str, password:str = None) -> Tuple[Union[str, User], int]:
    """returns user if exist or error with appropriate status code"""
    try:
        user = User.query.filter_by(email=user_email).first()
        if not user:
            raise ValueError(f'User {user_email} does not exists')
        if password:
            valid_password = user.check_password(password)
            if not valid_password:
                raise ValueError('Wrong password')
        return user, 200
    except Exception as e:
        return (str(e), 400)

def get_user_by_company_association(user_id:str, company_id:str) -> Tuple[Union[str, User], int]:
    """returns user if exist or error with appropriate status code"""
    try:
        user = UserCompanyAssociation.query.filter_by(user_id=user_id, company_id=company_id).first()
        if not user:
            raise ValueError('User does not exists')
        else:
            return user, 200
    except Exception as e:
        return (str(e), 400)

def update_userinfo(user: User, data: dict) -> Tuple[Union[str, User], int]:
    """updates user information
    Returns user or error with updated information and appropriate status code
    """
    try:
        password = data.get('password', None)
        print(password)
        if password:
            user.set_password(password)
            db.session.commit()
            return (user, 200)
        else:
            if not all(key in data for key in ['firstname', 'lastname', 'email']):
                raise ValueError('Fields firstname, lastname and email are required') 
            user_email = User.query.filter_by(email=data.get('email')).first()
            if user_email and user_email.id != user.id:
                raise ValueError(f"User with email {data.get('email')} already exists")
            
            user.firstname = data.get('firstname')
            user.lastname = data.get('lastname')
            user.email = data.get('email')
            db.session.commit()
            return (user, 200)
        
    except ValueError as e:
        db.session.rollback()
        return (str(e), 400)
    except Exception as e:
        db.session.rollback()
        return (str(e), 500)

def delete_userinfo(admin_user_id: str, user_id:str) -> Tuple[str, int]:
    """admin delete a user, admin deletes themselves"""
    try:
        user = UserCompanyAssociation.query.filter_by(user_id=user_id).first()
        if not user:
            return 'user not found', 400
        if not user.is_admin:
            user = User.query.filter_by(id=user_id).first()
            if user.admin_id != admin_user_id:
                return 'You are not allowed to delete this user', 404
            # get all accounts associated to that user
            accounts = user.accounts
            # re-assign that user accounts to the admin(admin id)
            for account in accounts:
                account.user_id = admin_user_id
            db.session.commit()
            # user is not admin delete only the user,
        # delete the admin and all companies and accounts associated to with him
        db.session.delete(user)
        db.session.commit()
        return 'user  deleted successfully', 200
    except Exception as error:
        db.session.rollback()
        return str(error), 400
    
