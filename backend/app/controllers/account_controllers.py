from app.models import Company, Stock
from app import db


class AccountControllers:
    def create_account(self, company_id, data):
        """create a new stock item"""
        company = Company.query.filter_by(id=company_id).first()

        if not company:
            raise Exception(f"The company ID {company_id} doesn't exist")
        
        pass

    def get_all_accounts(self, company_id):
        company = Company.query.filter_by(id=company_id).first()

        if not company:
            raise Exception(f"The company ID {company_id} doesn't exist")
        
        pass
        
    def update_account(company_id, account_id, data):
        pass

    def delete_account(company_id, account_id):
        pass

    def get_stock(company_id, account_id):
        pass

    