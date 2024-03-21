from app import app, db
from app.utils.companyutils import create_new_company, get_company_by_user_id
from app.utils.userutils import register_user, get_user, update_userinfo
from flask import request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from typing import Tuple, Union
from app.models import User


@app.route('/', methods=['GET', 'POST'], strict_slashes=False)
def home():
    return('<h1> AccoTrac Coming soon</h1>')

@app.route('/createuser', methods=['GET', 'POST'], strict_slashes=False)
def create_user() -> Union[jsonify, Tuple[dict, int]]:
    """POST: Returns a json with a new user created or error message
    GET: Returns register page
    """
    if request.method == 'POST':
        data = request.get_json()
        message = {
                'Error': 'Missing Some Fields',
                "required_Fields" : "firstname, lastname, email, password"
                }
        if not data:
            return jsonify(message), 404
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        email = data.get('email')
        password = data.get('password')
        if not firstname or not lastname or not email or not password :
            return jsonify(message), 404
        result, code = register_user(firstname, lastname, email, password)
        
        return jsonify({'result': result}), code

    if request.method == 'GET':
        message = {'message': 'Signup page coming soon'}
        return jsonify(message), 200

@app.route('/login', methods=['GET', 'POST'], strict_slashes=False)
def login()-> Union[jsonify, Tuple[dict, int]]:
    """Creates a session for a user if they exist and their
    credentials match
    POST: Returns dict with current user authentication status
    GET: Returns Login page
    """
    if request.method == 'POST':
        if current_user.is_authenticated:
            message = {"message": f"{current_user.firstname} Already logged in"}
            return jsonify(message), 200
        data = request.get_json()
        message = {
                'Error': 'Missing Some Fields',
                "required_Fields" : "email, password"
            }
        if not data:
            return jsonify(message), 404
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify(message), 404
        user, code = get_user(user_email=email, password=password)
        if code != 200:
            # means there was an error
            error = user
            message = {'error': error}
            return jsonify(message), code
        print(user)
        message = {"result": user}
        return jsonify(message), code
    
    elif request.method == 'GET':
        message = {"Message": "Login Page coming soon"}
        return (jsonify(message), 200)

@app.route('/logout', methods=['POST'], strict_slashes=False)
def logout() -> Union[jsonify, Tuple[dict, int]]:
    """Destroys the Session of current logged in user
    Returns status of current login user
    """
    logout_user()
    message = {'Logged in': f'{current_user.is_authenticated}'}
    return jsonify(message), 200


@app.route('/updateuser/<id>', methods=['GET', 'PUT'], strict_slashes=False)
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

@app.route('/createcompany', methods=['GET', 'POST'], strict_slashes=False)
@login_required
def create_company():
    if request.method == 'POST':
        data = request.get_json()
        company_name = data.get('company_name')
        user_id = current_user.id
        if not company_name:
            message = {'message': 'company_name is required'}
            return jsonify(message), 400
        message, code, company = create_new_company(company_name, user_id)

        if company:

            return jsonify({ "message": message, "response": company.to_dict()}), code
        return jsonify({ "message": message}), code
    elif request.method == 'GET':
        # get companies associated with current user
        companies = get_company_by_user_id(current_user.id)
        # message = {"Message": "Create company Page coming soon"}
        message = {"Message": companies}
        return jsonify(message), 200
    

@app.route('/protected', methods=['GET'])
def protected():
    if current_user.is_authenticated:
        return jsonify({"message": "User is authenticated", "response": current_user.to_dict()}), 200
    
    return jsonify({"message": "User not authenticated"}), 401

@app.route('/<string:company_id>/select_organization')
def add_selected_organization(company_id):
    try:
        user = User.query.filter_by(id=current_user.id).first()
        user.selected_company_id = company_id
        db.session.commit()
        return jsonify({"message": "Selected arganization added sussefully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500
    
@app.route('/getcurrentuser', methods=['GET'])
def get_current_user():
    if current_user.is_authenticated:
        return jsonify({"message": "User is authenticated", "response": current_user.to_dict()})
    return jsonify({"message": "User is not authenticated"})