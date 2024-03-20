from app.models import Company, User
from datetime import datetime
from app import db
from app.utils import TransactionUtils


transaction_utils = TransactionUtils()


"""this class handles all the entries entered by a user for a company"""
class GeneralTransactionControllers:
    def create_general_journal(self, company_id, user_id, data):
        try: 
            transaction_utils.validate_data(data, is_general=True)   
            new_transaction = transaction_utils.create_transaction(data, company_id, user_id)
            db.session.commit()
            return "Transaction successfully entered", 201, new_transaction.to_dict()

        except ValueError as e:
            db.session.rollback()
            return "Error entering transaction", 400, str(e)
        except Exception as e:
            db.session.rollback()
            return "Unexpected error when entering transaction", 500, str(e)
