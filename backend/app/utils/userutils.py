from app.models.user import User
from app.models.account import db
from flask_login import login_user
from typing import Tuple, Union


"""create a user"""
def register_user(firstname: str, lastname:str, email:str, password:str) -> Tuple[Union[str, User], int]:
    """returns new user or error with appropriate status code"""
    try:
        user_exist = User.query.filter_by(email=email).first()
        if user_exist:
            raise ValueError('User already exists')
        user = User(firstname=firstname, lastname=lastname, email=email)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()
        newuser = user.to_dict()
        login_user(user)
        return newuser, 201
    
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
            raise ValueError('User does not exists')
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
 