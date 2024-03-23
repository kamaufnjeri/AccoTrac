from app.controllers import GeneralTransactionControllers
from flask import request, jsonify, Blueprint
from flask_login import current_user, login_required


transaction_bp = Blueprint("transaction_bp", __name__)
general_transaction_controllers = GeneralTransactionControllers()

@transaction_bp.route('/addtransaction', methods=['POST'])
@login_required
def add_general_transaction():
    data = request.get_json()

    if not data:
        return "", 204
    else:
        message, code, response_item = general_transaction_controllers.create_general_journal(current_user.selected_company_id, current_user.id, data)
        return jsonify({"message": message, "response": response_item}), code

