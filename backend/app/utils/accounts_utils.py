from app.models import Account, Company, db, User


class AccountsUtils:
    @staticmethod
    def validate_data(category, sub_category, name, user_id, company_id):
        """account to validate accounts being created or updated"""
        valid_sub_categories = {
            "asset": ['bank', 'accounts_receivable', 'cash', 'inventory', 'fixed_asset'],
            "liability": ['accounts_payable', 'long_term_loan'],
            "capital": ['capital'],
            "revenue": ['sales_revenue', 'revenue'],
            "expense": ['cost_of_goods_sold', 'expense']
        }
        
        """get the specific account to see if it exists"""
        account = Account.query.filter_by(
            name=name,
            company_id=company_id,
            user_id=user_id
        ).first()
        
        if account:
             raise ValueError(f"Account {name} already exists")
        """check category if valid"""
        if category not in valid_sub_categories:
            raise ValueError(f"Invalid category: {category}.")
        
        """check sub_category valid depending on the caqtegory"""
        if sub_category not in valid_sub_categories[category]:
            raise ValueError(f"Invalid sub-category for category '{category}': {sub_category}. "
                             f"Valid options are: {', '.join(valid_sub_categories[category])}.")

    @staticmethod
    def validate_user_company(company_id, user_id):
        """check company and user exist depending on the ids"""
        company = Company.query.filter_by(id=company_id).first()
        user = User.query.filter_by(id=user_id).first()
        if not user:
            raise ValueError(f"User of ID {user_id} doesn't exist")

        if not company:
                raise ValueError(f"The company ID {company_id} doesn't exist")
        
    @staticmethod
    def add_account(company_id, user_id, name, category, sub_category):
        """create an account/ledger and add to database for the specific user or company"""
        try:
            AccountsUtils.validate_data(category, sub_category, name, user_id, company_id)
            AccountsUtils.validate_user_company(company_id, user_id)
            new_account = Account(
                user_id=user_id,
                company_id=company_id,
                name=name,
                category=category,
                sub_category=sub_category 
            )
            db.session.add(new_account)
            db.session.commit()
            return  new_account.to_dict(), 201
        except ValueError as e:
            db.session.rollback()
            return str(e), 400
        except Exception as e:
            db.session.rollback()
            return str(e), 500
        
                 
         
