from app.models import Company, Account, User
from app import db
from flask_login import current_user
from app.utils import AccountsUtils


class AccountControllers:
    def create_account(self, company_id, user_id, data):
        """create a new account item"""
        try:
            name = data.get("name")
            category = data.get("category")
            sub_category = data.get("sub_category")

            if not name or not category or not sub_category:
                raise ValueError("The necessary fields required to create account not found")
            resp_item, code = AccountsUtils.add_account(
                category=category,
                sub_category=sub_category,
                name=name,
                user_id=user_id,
                company_id=company_id
            )

            return resp_item, code
        except ValueError as e:
            return str(e), 400
       
    def get_all_accounts(self, company_id):
        """Getting all accounts of a company and user"""
        try:
            company = Company.query.filter_by(id=company_id).first()

            if not company:
                raise ValueError(f"The company ID {company_id} doesn't exist")
            
            accounts = Account.query.filter_by(company_id=company_id).all()

            if not accounts:
                raise ValueError(f"No accounts found associated to company ID {company_id}")

            accounts_list = [account.to_dict() for account in accounts]

            return accounts_list, 200
        except ValueError as e:
            return str(e), 400
        except Exception as e:
            return str(e), 500
        
    def update_account(self, company_id, account_id, data):
        """Updating accounts info"""
        try:
            company = Company.query.filter_by(id=company_id).first()
            account = Account.query.filter_by(id=account_id).first()
            if not company:
                raise ValueError(f"The company ID {company_id} doesn't exist")

            if not account:
                raise ValueError(f"The account ID {account_id} doesn't exist")

            if account.journal_entries and (account.debit_total != 0 or account.credit_total == 0):
                if data.get("category") is not None or data.get("sub_category") is not None:
                    raise ValueError("Cannot update category and subcategory because entries have been made to the account")
            AccountsUtils.validate_data(
                category=data.get('category'),
                sub_category=data.get('sub_category'),
                company_id=company_id,
                user_id=current_user.id
            )
            account.name = data.get("name")
            if data.get("category") is not None:
                account.category = data.get("category")
            if data.get("sub_category") is not None:
                account.sub_category = data.get("sub_category")
            
            db.session.commit()
            return account.to_dict(), 201

        except ValueError as e:
            db.session.rollback
            return str(e), 400
        except Exception as e:
            db.session.rollback()
            return str(e), 500


    def delete_account(self, company_id, account_id):
        """deleting an account if no journal entries to it have been made"""
        try:
            company = Company.query.filter_by(id=company_id).first()
            account = Account.query.filter_by(id=account_id).first()
            if not company:
                raise ValueError(f"The company ID {company_id} doesn't exist")

            if not account:
                raise ValueError(f"The account ID {account_id} doesn't exist")

            if account.debit_total == 0 and account.credit_total == 0 and not account.journal_entries:
                db.session.delete(account)
                db.session.commit()
                return account.to_dict(), 200
            raise ValueError(f"Cannot delete account ID {account_id} since transactions have been entered to the account")

        except ValueError as e:
            return str(e), 400
        except Exception as e:
            db.session.rollback()
            return str(e), 500


    def get_account(self, company_id, account_id):
        try:
            """gettig info about an individual account"""
            company = Company.query.filter_by(id=company_id).first()
            account = Account.query.filter_by(id=account_id).first()
            if not company:
                raise ValueError(f"The company ID {company_id} doesn't exist")

            if not account:
                raise ValueError(f"The account ID {account_id} doesn't exist")

            return account.to_dict(), 200
        
        except ValueError as e:
            return str(e), 400

        except Exception as e:
            return str(e), 500
