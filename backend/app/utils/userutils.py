from app.models.user import User
from app.models.account import db
from ..models.user_company import UserCompanyAssociation
from typing import Tuple, Union


"""create a user"""
def register_user(firstname: str, lastname:str, user_email:str, password:str) -> Tuple[Union[str, User], int]:
    """returns new user or error with appropriate status code"""
    try:
        user_exist = User.query.filter_by(email=user_email).first()
        if user_exist:
            raise ValueError('User already exists')
        user = User(firstname=firstname, lastname=lastname, email=user_email)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()
        newuser = user.to_dict()
        return newuser, 200
    except Exception as e:
        db.session.rollback()
        return (str(e), 400)

def get_user(user_email:str, password:str = None) -> Tuple[Union[str, User], int]:
    """returns user if exist or error with appropriate status code"""
    try:
        user = User.query.filter_by(email=user_email).first()
        if not user:
            raise ValueError('User does not exists')
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