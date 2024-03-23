from app.models.user import User
from app.models.company import Company
from app.models.account import Account, db
from ..models.user_company import UserCompanyAssociation
from typing import Tuple, Union, List


chart_of_accounts = {
    'asset': {
        'cash': ['Cash'],
        'bank': ['Bank'],
        'accounts_receivable': [],
        'fixed_asset': [],
        'inventory': ['Inventory']
    },
    'liability': {
        'accounts_payable': [],
        'long_term_loans': [],
    },
    'capital': {
        'capital': ['Capital']
    },
    'revenue': {
        'sales_revenue': ['Sales Revenue']
    },
    'expense': {
        'cost_of_goods_sold': ['Cost of Goods Sold']
    }
}



"""trial method to create a user, company and accounts"""
def create_new_company(company_name: str, user_id: str) -> Tuple[str, int]:
    try:
        company_exist = Company.query.filter_by(
            name=company_name
        ).first()
        if company_exist:
            raise ValueError('Company already exists')
        user = User.query.filter_by(id=user_id).first()
        
        company = Company(name=company_name)
        db.session.add(company)
        user.selected_company_id = company.id
        company.set_user_role(user_id, is_admin=True)


        for category, subcategories in chart_of_accounts.items():
            for subcategory, accounts in subcategories.items():
                for account in accounts:
                    account = Account(
                        user_id= user_id,
                        company_id=company.id,
                        name=account,
                        category=category,
                        sub_category=subcategory
                    )
                    db.session.add(account)
        db.session.commit()
        return "Successfully created company", 201, company
    except Exception as e:
        db.session.rollback()
        return str(e), 400, None

def get_company_by_user_id(user_id:str) -> Tuple[Union[List, None], int]:
    """Return a list of companies associated with user_id
    or None"""
    try:

        user = User.query.filter_by(id=user_id).first()
        if not user:
            raise ValueError(f"User Id {user_id} does not exist")
        companies = user.user_companies
        company_list = [company.to_dict() for company in companies]
        return "Success fetching companies", 200, company_list
    except ValueError as e:
        return "Error fetching companies", 400, str(e)
    except Exception as e:
        return "Error fetching companies", 500, str(e)
