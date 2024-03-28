from app import app, db, send_email
from app.utils.companyutils import create_new_company, get_company_by_user_id, update_companyinfo, get_company
from app.utils.userutils import register_user, get_user, update_userinfo, delete_userinfo, get_user_by_company_association, verify_user_email
from flask import request, jsonify, Blueprint
from app.utils.apputils import create_token, get_data_from_token
from flask_login import current_user, login_user, logout_user, login_required
from typing import Tuple, Union
from app.models import User


user_bp = Blueprint('user_bp', __name__)
@user_bp.route('/', methods=['GET', 'POST'], strict_slashes=False)
def home():
    return('<h1> AccoTrac Coming soon</h1>')

@user_bp.route('/user', methods=['GET', 'POST'], strict_slashes=False)
def create_user() -> Union[jsonify, Tuple[dict, int]]:
    """POST: Returns a json with a new user created or error message
    GET: Returns register page
    """
    if request.method == 'POST':
        if not request.content_type == 'application/json':
            message = {'message': 'Json object was expected'}
            return jsonify(message), 400
        if current_user and current_user.is_authenticated:
            message = {"message": "You need to be logged out for you to register a user"}
            return jsonify(message), 400
        # register a user
        data = request.get_json()
        required_fields = ["firstname", "lastname", "email", "password", "company_name"]
        if not data:
            message = {
                'message': 'Missing Required fields',
                "required_Fields" : required_fields
                }
            return jsonify(message), 404
        for field in required_fields:
            if field not in data:
                message = {'message': f'{field} is Required'}
                return jsonify(message), 404
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        email = data.get('email')
        password = data.get('password')
        company_name = data.get('company_name')
        result, code = register_user(firstname, lastname, email, password, company_name)
        if code != 201:
            message = {"message": result}
            return jsonify(message), code
        token, message, code = create_token(email=email)
        if code != 201:
            message = {"message": message}
            return jsonify(message), code
        url = 'http://localhost:3000/user/verifyemail/' + token
        try:
            resp_msg, status = send_email('[AccoTrac] Verify Your Email',
                sender=app.config['ADMINS'],
                recipients=[email],
                text_body=f"""
                Dear {firstname},
                Click on the Link below to verify your email
                {url}
                Sincerely,
                The Accotrac Team
                """)
            if status == True:
                message = {"message": "Check your email for a link to verify your email",
                        "result": result}
                print(code)
                db.session.commit()
                return jsonify(message), code
            else:
                raise ValueError(resp_msg)
        except Exception as e:
            db.session.rollback()
            print(str(e))
            return jsonify({"message": str(e)}), 400
    elif request.method == 'GET':
        if current_user.is_authenticated:
            # user is logged in retrieve user info
            user, code = get_user(current_user.email)
            return jsonify(user.to_dict()), code
        # user not logged in should register
        message = {'message': 'Signup page coming soon'}
        return jsonify(message), 200

@user_bp.route('/user/verifyemail/<string:token>', methods=['GET'], strict_slashes=False)
def verify_email(token:str):
    if request.method == 'GET':
        data, message, code = get_data_from_token(token)
        if not data:
            message = {'message': message}
            return jsonify(message), code
        user, code = get_user(user_email=data.get('email'))
        if code != 200:
            error = user
            message = {'message': error}
            return jsonify(message), code
        message, code = verify_user_email(user)
        if code == 200:
            response = {
                "message": message,
                "user": user.to_dict(user.is_authenticated)
            }
            return jsonify(response), code
        message = {"message" : message}
        return jsonify(message), code


@user_bp.route('/login', methods=['GET', 'POST'], strict_slashes=False)
def login()-> Union[jsonify, Tuple[dict, int]]:
    """Creates a session for a user if they exist and their
    credentials match
    POST: Returns dict with current user authentication status
    GET: Returns Login page
    """
    if request.method == 'POST':
        if not request.content_type == 'application/json':
            message = {'message': 'Json object was expected'}
            return jsonify(message), 400
        if current_user.is_authenticated:
            message = {"message": f"{current_user.firstname} You are already Logged in"}
            return jsonify(message), 400
        data = request.get_json()
        if not data:
            message = {
                'message': 'Missing Some Fields',
                "required_Fields" : "email, password"
            }
            return jsonify(message), 400
        email = data.get('email')
        if not email:
            message = {'message': 'email is Required'}
            return jsonify(message), 400
        password = data.get('password')

        if not password:
            message = {'message': 'password is Required'}
            return jsonify(message), 400
        user, code = get_user(user_email=email, password=password)
        if code != 200:
            # means there was an error
            error = user
            message = {'message': error}
            return jsonify(message), code
        if user.valid_email == True:
            login_user(user)
            message = {'message': 'Logged in Successfully',
                    'is_authenticated': f'{user.is_authenticated}',
                        'user': user.to_dict(user.is_authenticated)}
            return jsonify(message), code
        else:
            token, message, token_code= create_token(email=email)
            if token_code != 201:
                message = {"message": message}
                return jsonify(message), code
            url = 'http://localhost:3000/user/verifyemail/' + token
            resp_msg, status = send_email('[AccoTrac] Verify Your Email',
                sender=app.config['ADMINS'],
                recipients=[email],
                text_body=f"""
                Dear {user.firstname},
                Click on the Link below to verify your email
                {url}
                Sincerely,
                The Accotrac Team
                """)
            if status == True:
                message = {"message": "Check your email for a link to verify your email",
                        "user": user.to_dict(user.is_authenticated)}
                return jsonify(message), 400
            else:
                raise ValueError(resp_msg)
            return jsonify(message), 400
    elif request.method == 'GET':
        message = {"Message": "Login Page coming soon"}
        return (jsonify(message), 200)

@user_bp.route('/logout', methods=['POST'], strict_slashes=False)
def logout() -> Union[jsonify, Tuple[dict, int]]:
    """Destroys the Session of current logged in user
    Returns status of current login user
    """
    if not current_user.is_authenticated:
        message = {"message": "Not logged in"}
        return jsonify(message), 400
    userEmail = current_user.email
    logout_user()
    message = {'message': 'Logged out Successfully',
               'is_authenticated': f'{current_user.is_authenticated}',
               'userEmail': f'{userEmail}'}
    return jsonify(message), 200

@user_bp.route('/user/<id>', methods=['GET', 'PUT'], strict_slashes=False)
@login_required
def update_user(id:str) -> Union[jsonify, Tuple[dict, int]]:
    """updates user information
    PUT: Returns username and updated information
    GET: Returns update page
    """
    if request.method == 'PUT':
        if current_user.id == id:
            get_user_resp, get_code = get_user(user_email=current_user.email)
            data = request.get_json()
            if not data:
                message = {'message': 'provide information to update'}
                return jsonify(message), 400
            if get_code == 200:
                resp, code = update_userinfo(get_user_resp, data)
                if code == 200:
                    return jsonify(resp.to_dict(current_user.is_authenticated)), code
                message = {'message': resp}
                return jsonify(message), code
            message = {'message': get_user_resp}
        else:
            message = {'message': 'You are not allowed to update this user information'}
            return jsonify(message), 401
    elif request.method == 'GET':
        message = {"Message": "Update Page coming soon"}
        return jsonify(message), 200

@user_bp.route('/forgotpassword', methods=['POST'], strict_slashes=False)
def forgot_password():
    """route to send email to reset password"""
    if request.method == 'POST':
        if not request.content_type == 'application/json':
            message = {"message": "expected json object"}
            return jsonify(message), 400
        data = request.get_json()
        if not data:
            message = {
                'message': 'Missing Some Fields',
                "required_Fields" : "user_email"
            }
            return jsonify(message), 400
        user_email = data.get('email')
        if not user_email:
            message = {
                'message': 'Missing Some Fields',
                "required_Fields" : "user_email is required"
            }
            return jsonify(message), 400
        user, code = get_user(user_email)
        if code != 200:
            message = {
                'message': 'User does not exist'
            }
            return jsonify(message), 400
        token, message, code = create_token(user_email=user.email)
        url = url = 'http://localhost:3000/user/resetpassword/' + token
        send_email('[AccoTrac] Reset Your Password',
                    sender=app.config['ADMINS'],
               recipients=[user.email],
               text_body=f"""
               Dear {user.firstname},
               To reset your password click on the following link:
               {url}
               If you have not requested a password reset simply ignore this message.
               Sincerely,
               The Accotrac Team
               """)
        message = {'message': 'Check your email for link to reset password'}
        return jsonify(message), code

@user_bp.route('/resetpassword/<token>', methods=['PUT', 'GET'], strict_slashes=False)
def reset_password(token:str):
    """route to reset password"""
    if request.method == 'PUT':
        if request.content_type != 'application/json':
            message = {'message': "expected json object"}
            return jsonify(message), 400
        required_fields = ["password", "confirm_password"]
        data = request.get_json()
        if not data:
            message = {"message": "Missing required fields",
                       "Required": required_fields}
            return jsonify(message), 400
        for field in required_fields:
            if field not in data:
                message = {"message": f"{field} is required"}
                return jsonify(message), 400
        password = data.get('password')
       
        confirm_password = data.get('confirm_password')
        if password != confirm_password:
            message = {"message": "password must match with confirm password"}
            return jsonify(message), 400
        token_data, message, code = get_data_from_token(token)
        print(token_data)

        if not token_data:
            return jsonify(token_data), code
        user_email = token_data.get('user_email')
        if not user_email:
            message = {"message": "user_email data not found"}
            return jsonify(message), 400
        user, code = get_user(user_email=user_email)
        if code != 200:
            error = user
            message = {"message": error,
                       "Error": error}
            return jsonify(message), code
        data = {"password": password}
        user, code = update_userinfo(user, data)
        if code != 200:
            error = user
            message = {"message": error,
                       "Error": error}
            return jsonify(message), code
        else:
            message = {"message": "Password updated successfully"}
            print(user)
            return jsonify(message), code
    elif request.method == 'GET':
        message = {"message": "Change your password page coming up soon"}
        return jsonify(message), 200

@user_bp.route('/company/<company_id>', methods=['PUT'], strict_slashes=False)
@login_required
def update_company(company_id:str) -> Union[jsonify, Tuple[dict, int]]:
    """updates company information
    PUT: Returns company and updated information
    """
    if request.method == 'PUT' and current_user.is_authenticated:
        data = request.get_json()
        if not data:
            message = {"Message": "Provide fields to be updated"}
            return jsonify(message), 400
        company = get_company(company_id)
        if not company:
            message = {"Message": "Company does not exist"}
            return jsonify(message), 400
        company, code = update_companyinfo(company=company, user=current_user, data=data)
        if isinstance(company, str):
            # means its an error
            error = company
            message = {"message": error}
            return jsonify(message), code
        return jsonify({"response": company.to_dict()}), code

@user_bp.route('/<string:user_id>/getcompanies', methods=['GET'])
def get_companies_by_user_id(user_id):
    message, code, company_names = get_company_by_user_id(user_id=user_id)
    return jsonify({"message": message, "response": company_names}), code



@user_bp.route('/protected', methods=['GET'])
def protected():
    """route to confirm a user is authenticated"""
    if current_user.is_authenticated:
        user = current_user.to_dict(current_user.is_authenticated)
        return jsonify({"message": "User is authenticated", "response": user}), 200
    
    return jsonify({"message": "User not authenticated", "response": current_user.is_authenticated}), 401

@user_bp.route('/<string:company_id>/select_organization', methods=['PUT'])
@login_required
def add_selected_organization(company_id):
    try:
        user = User.query.filter_by(id=current_user.id).first()
        user.selected_company_id = company_id
        db.session.commit()
        return jsonify({"message": "Selected arganization added sussefully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500
    
@user_bp.route('/user/<admin_id>', methods=['DELETE'], strict_slashes=False)
@login_required
def delete_user(admin_id:str) -> Union[jsonify, Tuple[dict, int]]:
    """admin can delete users who he invited"""
    if request.method == 'DELETE':
        if request.content_type == 'application/json':
            data = request.get_json()
            if not data:
                message = {"Message": "Missing Required fields",
                       "Required": "user_id"}
                return jsonify(message), 400
            user_id = data.get(user_id)
            if not user_id:
                message = {"Message": "You did not provide user_id"}
                return jsonify(message), 400
        else:
            user_id = admin_id
            result, code = delete_userinfo(admin_user_id=admin_id, user_id=user_id)
            message = {"Message": result}
            return jsonify(message), code