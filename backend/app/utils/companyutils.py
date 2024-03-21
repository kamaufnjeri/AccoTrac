from app.models.user import User
from app.models.company import Company
from app.models.account import Account, db
from ..models.user_company import UserCompanyAssociation
from typing import Tuple, Union, List


chart_of_accounts = {
    'assets': {
        'cash': ['Cash'],
        'bank': ['Bank'],
        'accounts_receivable': [],
        'inventory': ['Inventory']
    },
    'liabilities': {
        'accounts_payable': [],
        'loans_payable': [],
    },
    'capital': {
        'capital': ['Capital']
    },
    'Revenue': {
        'sales_revenue': ['Sales Revenue']
    },
    'Expenses': {
        'cost_of_goods_sold': ['Cost of Goods Sold']
    },
    'Contract': {
        'sales_returns': ['Sales Returns'],
        'purchase_returns': ['Purchase returns']
    }
}


"""trial method to create a user, company and accounts"""
def create_new_company(company_name: str, company_email: str, company_country:str, company_currency:str, user_id: str) -> Tuple[str, int]:
    try:
        company_exist = Company.query.filter_by(
            email=company_email
        ).first()
        if company_exist:
            raise ValueError('Company already exists')
        company = Company(name=company_name,
                          email=company_email,
                          country=company_country,
                          currency=company_currency)
        db.session.add(company)
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
        return f"Successfully created {company_name} company", 201
    except Exception as e:
        db.session.rollback()
        return str(e), 400

def get_company(company_id: str) -> Union[Company, None]:
    """returns a company or none"""
    company = Company.query.filter_by(id=company_id).first()
    return company

def get_company_by_user_id(user_id:str) -> Tuple[Union[List, None], int]:
    """Return a list of companies associated with user_id
    or None"""
    companies = UserCompanyAssociation.query.filter_by(user_id=user_id).all()
    new_companies = [company.company.to_dict() for company in companies]
    return new_companies

def update_companyinfo(company: Company, user:User, data: dict) -> Tuple[Union[str, Company], int]:
    """updates company information
    Returns company or error with updated information and appropriate status code
    """
    try:
        # make sure its the admin who created the company updating the company info
        current_company = UserCompanyAssociation.query.filter_by(company_id=company.id, user_id=user.id).first()
        if current_company and current_company.user_id == user.id:
            for key, value in data.items():
                if key != 'id':
                    setattr(company, key, value)
            db.session.commit()
            return (company, 200)
        else:
            return ('you are not allowed to update this company info', 401)
    except Exception as e:
        db.session.rollback()
        return (str(e), 400)

def delete_company(company_id:str, user:User):
    """delete a company"""
    try:
        # company = get_company(company_id)
        company = UserCompanyAssociation.query.filter_by(company_id=company_id).first()
        if not company:
            return 'company not found', 400
        if company.user_id != user.id:
            return 'You are not allowed to delete this company', 404
        db.session.delete(company)
        db.session.commit()
        return 'company  deleted successfully', 200
    except Exception as error:
        db.session.rollback()
        return str(error), 400