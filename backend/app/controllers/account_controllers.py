from app.models import Company, Account
from app import db


class AccountControllers:
    def create_account(self, company_id, user_id, data):
        """create a new account item"""
        try:
            company = Company.query.filter_by(id=company_id).first()
            user = User.query.filter_by(id=user_id).first()
            if not user:
                raise Exception(f"User of ID {user_id} doesn't exist")

            if not company:
                raise Exception(f"The company ID {company_id} doesn't exist")
            
            name = data.get("name")
            category = data.get("category")
            sub_category = data.get("sub_category")

            if not name or not category or not sub_category:
                raise Exception("The necessary fields required to create account not found")
            
            new_account = Account(
                name=name,
                category=category,
                user_id=user_id,
                sub_category=sub_category,
                company_id=company_id
            )
            
            db.session.add(new_account)
            db.session.commit()
            return "Success creating account", 201, new_account
        
        except Exception as e:
            db.session.rollback()
            return "Error creating account", 500, str(e)


    def get_all_accounts(self, company_id):
        try:
            company = Company.query.filter_by(id=company_id).first()

            if not company:
                raise Exception(f"The company ID {company_id} doesn't exist")
            
            accounts = Account.query.all()

            if not accounts:
                raise Exception(f"No accounts found associated to company ID {company_id}")

            accounts_list = [account.to_dict() for account in accounts]

            return "Success fetching accounts", 200, accounts_list
        
        except Exception as e:
            return "Error fetching accounts", 500, str(e)
        
    def update_account(self, company_id, account_id, data):
        try:
            company = Company.query.filter_by(id=company_id).first()
            account = Account.query.filter_by(id=account_id).first()
            if not company:
                raise Exception(f"The company ID {company_id} doesn't exist")

            if not account:
                raise Exception(f"The account ID {account_id} doesn't exist")

            if account.journal_entries and (account.debit_total != 0 or account.credit_total == 0):
                if data.get("category") is not None or data.get("sub_category") is not None:
                    raise Exception("Cannot update category and subcategory because entries have been made to the account")
            
            account.name = data.get("name")
            if data.get("category") is not None:
                account.category = data.get("category")
            if data.get("sub_category") is not None:
                account.sub_category = data.get("sub_category")
            
            db.session.commit()
            return "Successfully updated account", 200, account

        except Exception as e:
            db.session.rollback()
            return "Error updating account", 500, str(e)


    def delete_account(self, company_id, account_id):
        try:
            company = Company.query.filter_by(id=company_id).first()
            account = Account.query.filter_by(id=account_id).first()
            if not company:
                raise Exception(f"The company ID {company_id} doesn't exist")

            if not account:
                raise Exception(f"The account ID {account_id} doesn't exist")

            if account.debit_total == 0 and account.credit_total == 0 and not account.journal_entries:
                db.session.delete(account)
                db.session.commit()
                return "Success deleting account", 200, account
            raise Exception(f"Cannot delete account ID {account_id} since transactions have been entered to the account")

        except Exception as e:
            db.session.rollback()
            return "Error deleting account", 500, str(e)


    def get_account(self, company, account_id):
        try:
            company = Company.query.filter_by(id=company_id).first()
            account = Account.query.filter_by(id=account_id).first()
            if not company:
                raise Exception(f"The company ID {company_id} doesn't exist")

            if not account:
                raise Exception(f"The account ID {account_id} doesn't exist")

            return "Success fetching account data", 200, account.to_dict()

        except Exception as e:
            return "Error fetching data for the account", 500, str(e)
