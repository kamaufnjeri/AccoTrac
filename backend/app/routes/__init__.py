from app import app, send_email
from app.utils.companyutils import create_new_company, get_company, get_company_by_user_id, update_companyinfo, delete_company
from app.utils.userutils import register_user, get_user, update_userinfo, delete_userinfo, get_user_by_company_association, verify_user_email
from app.utils.apputils import create_token, get_data_from_token
from flask import request, jsonify, url_for
from flask_login import current_user, login_user, logout_user, login_required

from typing import Tuple, Union


@app.route('/', methods=['GET', 'POST'], strict_slashes=False)
def home():
    return('<h1> AccoTrac Coming soon</h1>')

@app.route('/user', methods=['GET', 'POST'], strict_slashes=False)
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
        if not data:
            message = {
                'message': 'Missing Required fields',
                "required_Fields" : "firstname, lastname, email, password"
                }
            return jsonify(message), 404
        firstname = data.get('firstname')
        if not firstname:
            message = {'message': 'firstname is Required'}
            return jsonify(message), 404
        lastname = data.get('lastname')
        if not lastname:
            message = {'message': 'lastname is Required'}
            return jsonify(message), 404
        email = data.get('email')
        if not email:
            message = {'message': 'email is Required'}
            return jsonify(message), 404
        password = data.get('password')
        if not password:
            message = {'message': 'password is Required'}
            return jsonify(message), 404
        result, code = register_user(firstname, lastname, email, password)
        if code != 200:
            message = {"message": result}
            return jsonify(message), code
        token, message, code = create_token(email=email)
        if code != 200:
            message = {"message": message}
            return jsonify(message), code
        url = request.url_root[:-1] + url_for('verify_email', token=token)
        send_email('[AccoTrac] Verify Your Email',
               sender=app.config['ADMINS'],
               recipients=[email],
               text_body=f"""
               Dear {firstname},
               Click on the Link below to verify your email

               {url}

               Sincerely,
               The Accotrac Team
               """)
        message = {"message": "Check your email for a link to verify your email",
                   "result": result}
        return jsonify(message), code

    elif request.method == 'GET':
        if current_user.is_authenticated:
            # user is logged in retrieve user info
            user, code = get_user(current_user.email)
            return jsonify(user.to_dict()), code
        # user not logged in should register
        message = {'message': 'Signup page coming soon'}
        return jsonify(message), 200

@app.route('/user/verify_email/<token>', methods=['GET'], strict_slashes=False)
def verify_email(token:str):
    print(token)
    if request.method == 'GET':
        data, message, code = get_data_from_token(token)
        if not data:
            message = {'message': message}
            return jsonify(message), code
        user, code = get_user(user_email=data.get('email'))
        if not user:
            error = user
            message = {'message': message}
            return jsonify(error), code
        message, code = verify_user_email(user)
        message = {"message" : message}
        return jsonify(message), code

@app.route('/user/<id>', methods=['GET', 'PUT'], strict_slashes=False)
@login_required
def update_user(id:str) -> Union[jsonify, Tuple[dict, int]]:
    """updates user information
    PUT: Returns username and updated information
    GET: Returns update page
    """
    if request.method == 'PUT':
        if current_user.id == id:
            user, code = get_user(user_email=current_user.email)
            data = request.get_json()
            if not data:
                message = {'message': 'provide information to update'}
                return jsonify(message), 400
            user, code = update_userinfo(user, data)
            return jsonify(user.to_dict()), code
        else:
            message = {'message': 'You are not allowed to update this user information'}
            return jsonify(message), 401
    elif request.method == 'GET':
        message = {"Message": "Update Page coming soon"}
        return jsonify(message), 200

@app.route('/user/<admin_id>', methods=['DELETE'], strict_slashes=False)
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

@app.route('/login', methods=['GET', 'POST'], strict_slashes=False)
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
            message = {"Message": f"{current_user.firstname} You are already Logged in"}
            return jsonify(message), 200
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
        if isinstance(user, str):
            # means there was an error
            error = user
            message = {'message': 'Something went wrong',
                       'Error': error}
            return jsonify(message), code
        login_user(user)
        message = {'message': 'Logged in Successfully',
                   'is_authenticated': f'{user.is_authenticated}',
                    'user': user.to_dict()}
        return jsonify(message), code
    elif request.method == 'GET':
        message = {"Message": "Login Page coming soon"}
        return (jsonify(message), 200)

@app.route('/logout', methods=['POST'], strict_slashes=False)
def logout() -> Union[jsonify, Tuple[dict, int]]:
    """Destroys the Session of current logged in user
    Returns status of current login user
    """
    if not current_user.is_authenticated:
        message = {"Message": "Not logged in"}
        return jsonify(message), 400
    userFirstName = current_user.firstname
    logout_user()
    message = {'message': 'Logged out Successfully',
               'is_authenticated': f'{current_user.is_authenticated}',
               'userFirstName': f'{userFirstName}'}
    return jsonify(message), 200


@app.route('/company', methods=['GET', 'POST'], strict_slashes=False)
@login_required
def create_company():
    if request.method == 'POST':
        if not request.content_type == 'application/json':
            message = {'message': 'Json object was expected'}
            return jsonify(message), 400
        data = request.get_json()
        if not data:
            message = {
                'message': 'Missing Some Fields',
                "required_Fields" : "company_name, company_email, company_country, company_currency"
            }
            return jsonify(message), 400
        user_id = current_user.id
        company_name = data.get('company_name')
        if not company_name:
            message = {'message': 'company_name is required'}
            return jsonify(message), 400
        company_email = data.get('company_email')
        if not company_email:
            message = {'message': 'company_email is required'}
            return jsonify(message), 400
        company_country = data.get('company_country')
        if not company_country:
            message = {'message': 'company_country is required'}
            return jsonify(message), 400
        company_currency = data.get('company_currency')
        if not company_currency:
            message = {'message': 'company_currency is required'}
            return jsonify(message), 400
        message, code = create_new_company(company_name=company_name,
                                           company_email=company_email,
                                           company_country=company_country,
                                           company_currency=company_currency,
                                           user_id=user_id)
        return jsonify({ "Message": message}), code
    elif request.method == 'GET':
        # get companies associated with current user
        companies = get_company_by_user_id(current_user.id)
        message = {"Message": "Here is a list of your companies",
                   "companies": companies}
        return jsonify(message), 200
    else:
        message = {"Message": "only admins can create a company"}
        return jsonify(message), 404

@app.route('/invite_user', methods=['GET', 'POST'], strict_slashes=False)
@login_required
def invite_user() -> Union[jsonify, Tuple[dict, int]]:
    if request.method == 'POST':
        if not request.content_type == 'application/json':
            message = {'message': 'Json object was expected'}
            return jsonify(message), 400
        if not request.content_type == 'application/json':
            message = {'message': 'Json object was expected'}
            return jsonify(message), 400
        data = request.get_json()
        if not data:
            message = {
                'message': 'Missing Some Fields',
                "required_Fields" : "company_id"
            }
            return jsonify(message), 400
        company_id = data.get('company_id')
        if not company_id:
            message = {
                'message': 'Missing Some Fields',
                "required_Fields" : "company_id"
            }
            return jsonify(message), 400
        user, code = get_user_by_company_association(user_id=current_user.id, company_id=company_id)
        if isinstance(user, str):
            error = user
            message = {"Message": "something went wrong",
                       "Error": error}
            return jsonify(message), code
        if not user.is_admin:
            message = {"Message": "only admins can invite users"}
            return jsonify(message), 404
        admin_id = user.user_id
        token, message, code = create_token(admin_id=admin_id, company_id=company_id)
        url = request.url_root[:-1] + url_for('invite_user_register', token=token)
        message = {'message': message,
                    "token": token,
                    "link": url}
        return jsonify(message), code
    elif request.method == 'GET':
        message = {'message': 'invite_user page coming soon'}
        return jsonify(message), 200

@app.route('/invite_user/register/<token>', methods=['GET', 'POST'], strict_slashes=False)
def invite_user_register(token):
    if request.method == 'GET':
        data, message, code = get_data_from_token(token)
        message = {"Message": message,
                "data": data}
        return jsonify(message), code
    # register user
    # connect user to the company using (company_id in the data)
    # connect user with the admin who invited them (admin_id in the data)

@app.route('/reset_password', methods=['POST'], strict_slashes=False)
def reset_password():
    if request.method == 'POST':
        if not request.content_type == 'application/json':
            message = {"Message": "expected json object"}
            return jsonify(message), 400
        data = request.get_json()
        if not data:
            message = {
                'message': 'Missing Some Fields',
                "required_Fields" : "user_email"
            }
            return jsonify(message), 400
        user_email = data.get('user_email')
        if not user_email:
            message = {
                'message': 'Missing Some Fields',
                "required_Fields" : "user_email is required"
            }
            return jsonify(message), 400
        user, code = get_user(user_email)
        if code != 200:
            message = {
                'message': 'user does not exist'
            }
            return jsonify(message), 400
        token, message, code = create_token(user_email=user.email)
        url = request.url_root[:-1] + url_for('update_password', token=token)
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
        message = {'message': message,
                    "Email": "Check your email for the reset link"}
        return jsonify(message), code

@app.route('/update_password/<token>', methods=['PUT', 'GET'], strict_slashes=False)
def update_password(token:str):
    if request.method == 'PUT':
        if request.content_type != 'application/json':
            message = {'message': "expected json object"}
            return jsonify(message), 400
        required_fields = ["password", "confirm_password"]
        data = request.get_json()
        if not data:
            message = {"Message": "Missing required fields",
                       "Required": required_fields}
            return jsonify(message), 400
        for field in required_fields:
            if field not in data:
                message = {"Message": f"{field} is required"}
                return jsonify(message), 400
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if password != confirm_password:
            message = {"Message": "password must match with confirm_password"}
            return jsonify(message), 400
        token_data, message, code = get_data_from_token(token)
        if not token_data:
            return jsonify(token_data), code
        user_email = token_data.get('user_email')
        if not user_email:
            message = {"Message": "user_email data not found"}
            return jsonify(message), 400
        user, code = get_user(user_email=user_email)
        if code != 200:
            error = user
            message = {"Message": "Something went wrong",
                       "Error": error}
            return jsonify(message), code
        data = {"password":password}
        user, code = update_userinfo(user, data)
        if code != 200:
            error = user
            message = {"Message": "Something went wrong",
                       "Error": error}
            return jsonify(message), code
        message = {"Message": "Password eas updated successfully"}
        return jsonify(message), code
    elif request.method == 'GET':
        message = {"Message": "Change your password page coming up soon"}
        return jsonify(message), 200


@app.route('/company/<company_id>', methods=['PUT'], strict_slashes=False)
@login_required
def update_company(company_id:str) -> Union[jsonify, Tuple[dict, int]]:
    """updates company information
    PUT: Returns company and updated information
    """
    if request.method == 'PUT':
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
            message = {"Message": "Something went wrong",
                       "Error": error}
            return jsonify(message), code
        return jsonify(company.to_dict()), code

@app.route('/company/<company_id>', methods=['DELETE'], strict_slashes=False)
@login_required
def delete_company(company_id:str) -> Union[jsonify, Tuple[dict, int]]:
    if request.method == 'DELETE':
        result, code = delete_company(company_id, current_user)
        message = {"Message": result}
        return jsonify(message), code
