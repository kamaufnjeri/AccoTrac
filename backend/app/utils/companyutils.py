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
def create_new_company(company_name: str, company_email: str, company_country:str, company_currency:str, user_id: str) -> Tuple[str, int]:
    try:
        if company_email is not None:
            company_exist = Company.query.filter_by(
                email=company_email
            ).first()
            if company_exist:
                raise ValueError('Company already exists')
        company_by_name = Company.query.filter_by(
            name=company_name
        ).first()
        if company_by_name:
            raise ValueError(f'Company {company_name} already exists')
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
        return company, 201
    except Exception as e:
        db.session.rollback()
        return str(e), 400

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

def get_company(company_id: str) -> Union[Company, None]:
    """returns a company or none"""
    company = Company.query.filter_by(id=company_id).first()
    return company

def update_companyinfo(company, user, data: dict) -> Tuple[Union[str, User], int]:
    """updates user information
    Returns user or error with updated information and appropriate status code
    """
    try:
        if not all(key in data for key in ['name']):
            raise ValueError('Field name')

        name_company = Company.query.filter_by(name=data.get('name')).first()
        print(data)
        if company.company_users[0].user_id != user.id:
            print(company.company_users)
            raise ValueError("Can't update this company is not registered under you")
        if name_company and name_company.id != company.id:
            raise ValueError(f"A Company with name {data.get('name')} already exists")
        if data.get('email') != None:
            email_company = Company.query.filter_by(email=data.get('email')).first()
            if email_company and email_company.id != company.id:
                raise ValueError(f"A Company with email {data.get('email')} already exists")
        company.name = data.get('name')
        company.currency = data.get('currency')
        company.country = data.get('country')
        company.email = data.get('email')
        db.session.commit()
        return (company, 200)
    except ValueError as e:
        db.session.rollback()
        return (str(e), 400)
    except Exception as e:
        db.session.rollback()
        return (str(e), 500)

def delete_companyinfo(company_id:str, user:User) -> Tuple[str, int]:
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
