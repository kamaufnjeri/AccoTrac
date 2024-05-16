from app.models import  Stock, Account
from datetime import datetime
from app import db
from app.utils import PurchaseUtils, PurchaseReturnUtils


purchase_utils = PurchaseUtils()
purchase_return_utils = PurchaseReturnUtils()


class PurchaseTransactionControllers:
    def create_purchase_journal(self, company_id, user_id, data):
        """
        Entering a purchase transaction.
        """
        try:
            """get total purchase by adding all items price"""
            purchase_utils.validate_purchase(data)
            transaction = purchase_utils.update_stock_and_create_entries(company_id, user_id, data)
            db.session.commit()
            return "Purchase transaction entered successfully", 201, transaction.to_dict()
        except ValueError as e:
            db.session.rollback()
            return "Error entering the purchase transaction", 400, str(e)
        
    def purchase_return_journal(self, company_id, user_id, data):
        try:
            new_transaction = purchase_return_utils.process_purchase_return(company_id, user_id, data)
            db.session.commit()
            return "Purchase return entry successful", 201, new_transaction
        
        except ValueError as ve:
            db.session.rollback()
            return "Error when entering purchase return", 400, str(ve)
        except Exception as e:
            db.session.rollback()
            return "Unexpected error entering purchase return", 500, str(e)
