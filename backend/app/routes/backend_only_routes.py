from app.controllers import GeneralTransactionControllers, StockEntriesControllers, StockControllers
from app.controllers import PurchaseTransactionControllers, SalesTransactionControllers
from flask import request, jsonify, Blueprint
from flask_login import login_required, current_user


backend_only_bp = Blueprint("backend_only_bp", __name__)
general_transaction_controllers = GeneralTransactionControllers()
purchase_transacton_controllers = PurchaseTransactionControllers()
sales_transaction_controllers = SalesTransactionControllers()
stock_controllers = StockControllers()
stock_entries_controllers = StockEntriesControllers()


@backend_only_bp.route('/api/addpurchase', methods=['POST'])
@login_required
def add_purchase_transaction():
    data = request.get_json()
    if not data:
        return "", 204
    else:
        user_id = current_user.id
        company_id = current_user.selected_company_id
        message, code, response_item = purchase_transacton_controllers.create_purchase_journal(company_id, user_id, data)
        return jsonify({"message": message, "response": response_item}), code
    
@backend_only_bp.route('/api/addsales', methods=['POST'])
@login_required
def add_sales_transaction():
    data = request.get_json()
    if not data:
        return "", 204
    else:
        user_id = current_user.id
        company_id = current_user.selected_company_id
        message, code, response_item = sales_transaction_controllers.create_sales_journal(company_id, user_id, data)
        return jsonify({"message": message, "response": response_item}), code
    
    
@backend_only_bp.route('/api/purchasereturn', methods=['POST'])
@login_required
def purchase_return_transaction(company_id, user_id):
    data = request.get_json()
    if not data:
        return "", 204
    else:
        user_id = current_user.id
        company_id = current_user.selected_company_id
        message, code, response_item = purchase_transacton_controllers.purchase_return_journal(company_id, user_id, data)
        return jsonify({"message": message, "response": response_item}), code
    
    
@backend_only_bp.route('/api/salesreturn', methods=['POST'])
@login_required
def sales_return_transaction():
    data = request.get_json()
    if not data:
        return "", 204
    else:
        user_id = current_user.id
        company_id = current_user.selected_company_id
        message, code, response_item = sales_transaction_controllers.sales_return_journal(company_id, user_id, data)
        return jsonify({"message": message, "response": response_item}), code
    

@backend_only_bp.route('/api/addstock', methods=['POST'])
@login_required
def create_stock():
    data = request.get_json()
    if not data:
        return "", 204
    else:
        user_id = current_user.id
        company_id = current_user.selected_company_id
        message, code, response_item = stock_controllers.create_stock(company_id, user_id, data)
        return jsonify({"message": message, "response": response_item}), code
    

@backend_only_bp.route('/api/stock/<string:stock_id>', methods=['PUT'])
@login_required
def update_stock(stock_id):
    data = request.get_json()
    if not data:
        return "", 204
    else:
        company_id = current_user.selected_company_id
        message, code, response_item = stock_controllers.update_stock(company_id, stock_id, data)
        return jsonify({"message": message, "response": response_item}), code
    

@backend_only_bp.route('/api/stock/<string:stock_id>', methods=['DELETE'])
@login_required
def delete_stock(stock_id):
    data = request.get_json()
    if not data:
        return "", 204
    else:
        company_id = current_user.selected_company_id
        message, code, response_item = stock_controllers.delete_stock(company_id, stock_id, data)
        return jsonify({"message": message, "response": response_item}), code

@backend_only_bp.route('/api/stock/<string:stock_id>', methods=['GET'])
@login_required
def get_stock(stock_id):
    company_id = current_user.selected_company_id
    message, code, response_item = stock_controllers.get_stock(company_id, stock_id)
    return jsonify({"message": message, "response": response_item}), code
  
@backend_only_bp.route('/api/stock', methods=['GET'])
@login_required
def get_all_stocks():
    company_id = current_user.selected_company_id
    message, code, response_item = stock_controllers.get_all_stocks(company_id)
    return jsonify({"message": message, "response": response_item}), code
    
    
@backend_only_bp.route('/api/stockentries', methods=['GET'])
@login_required
def get_all_stock_entries():
    data = request.get_json()
    print(data)
    if not data:
        return "", 204
    else:
        company_id = current_user.selected_company_id
        message, code, response_item = stock_entries_controllers.get_entries_by_category(company_id, data.get('category'))
        return jsonify({"message": message, "response": response_item}), code
    