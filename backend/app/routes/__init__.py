from app import app
from app.utils.accountsutils import create_user_company
from flask import request, jsonify

@app.route('/createcompany', methods=['POST'])
def create_company():
    data = request.get_json()
    message, code = create_user_company(data['company_name'], data['user_email'], data['user_name'])
    
    return jsonify({ "message": message}), code
