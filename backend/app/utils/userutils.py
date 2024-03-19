from app.models.user import User
from app.models.account import db
from flask_login import current_user, login_user
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

def get_user(user_email:str, password:str) -> Tuple[Union[str, User], int]:
    """returns user if exist or error with appropriate status code"""
    try:
        user = User.query.filter_by(email=user_email).first()
        if not user:
            raise ValueError('does not exists')
        valid_password = user.check_password(password)
        if not valid_password:
            raise ValueError('Wrong password')
        login_user(user)
        return current_user, 200
    except Exception as e:
        db.session.rollback()
        return (str(e), 400)