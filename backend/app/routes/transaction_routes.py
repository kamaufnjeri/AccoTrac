from app.controllers import GeneralTransactionControllers, PurchaseTransactionControllers, SalesTransactionControllers
from flask import request, jsonify, Blueprint


transaction_bp = Blueprint("transaction_bp", __name__)
general_transaction_controllers = GeneralTransactionControllers()
purchase_transacton_controllers = PurchaseTransactionControllers()
sales_transaction_controllers = SalesTransactionControllers()

@transaction_bp.route('/<string:user_id>/<string:company_id>/addtransaction', methods=['POST'])
def add_general_transaction(company_id, user_id):
    data = request.get_json()

    if not data:
        return "", 204
    else:
        message, code, response_item = general_transaction_controllers.create_general_journal(company_id, user_id, data)
        return jsonify({"message": message, "response": response_item}), code


@transaction_bp.route('/<string:user_id>/<string:company_id>/addpurchase', methods=['POST'])
def add_purchase_transaction(company_id, user_id):
    data = request.get_json()
    if not data:
        return "", 204
    else:
        message, code, response_item = purchase_transacton_controllers.create_purchase_journal(company_id, user_id, data)
        return jsonify({"message": message, "response": response_item}), code
    
@transaction_bp.route('/<string:user_id>/<string:company_id>/addsales', methods=['POST'])
def add_sales_transaction(company_id, user_id):
    data = request.get_json()
    if not data:
        return "", 204
    else:
        message, code, response_item = sales_transaction_controllers.create_sales_journal(company_id, user_id, data)
        return jsonify({"message": message, "response": response_item}), code
    
    
@transaction_bp.route('/<string:user_id>/<string:company_id>/purchasereturn', methods=['POST'])
def purchase_return_transaction(company_id, user_id):
    data = request.get_json()
    if not data:
        return "", 204
    else:
        message, code, response_item = purchase_transacton_controllers.purchase_return_journal(company_id, user_id, data)

        return jsonify({"message": message, "response": response_item}), code
    
    
@transaction_bp.route('/<string:user_id>/<string:company_id>/salesreturn', methods=['POST'])
def sales_return_transaction(company_id, user_id):
    data = request.get_json()
    if not data:
        return "", 204
    else:
        message, code, response_item = sales_transaction_controllers.sales_return_journal(company_id, user_id, data)
        print(message)
        return jsonify({"message": message, "response": response_item}), code
    