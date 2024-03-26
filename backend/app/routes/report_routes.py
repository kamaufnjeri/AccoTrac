from app.controllers import ReportControllers
from flask import request, jsonify, Blueprint
from flask_login import current_user, login_required


report_bp = Blueprint("report_bp", __name__)
report_controllers = ReportControllers()

@report_bp.route('/trialbalance', methods=['GET'])
@login_required
def get_trialbalance():
    resp, code = report_controllers.get_trial_balance(current_user.selected_company_id, current_user.id)
    print(resp, code)
    return jsonify(resp), code

@report_bp.route('/profitloss', methods=['GET'])
@login_required
def get_trial_balance():
    resp, code = report_controllers.get_profit_loss(current_user.selected_company_id, current_user.id)
    print(resp, code)
    return jsonify(resp), code