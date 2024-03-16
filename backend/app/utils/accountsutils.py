from app.models.user import User
from app.models.company import Company
from app.models.account import Account, db


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
    'Contra': {
        'sales_returns': ['Sales Returns'],
        'purchase_returns': ['Purchase returns']
    }
}


"""trial method to create a user, company and accounts"""
def create_user_company(company_name, user_email, username):
    try:
        user_exist = User.query.filter_by(
            email=user_email
        ).first()
        company_exist = Company.query.filter_by(
            name=company_name
        ).first()
        if user_exist or company_exist:
            raise ValueError('User or Company already exists')
        user = User(username=username, email=user_email)
        company = Company(name=company_name)
        db.session.add(user)
        db.session.add(company)
        company.set_user_role(user.id, is_admin=True)
        

        for category, subcategories in chart_of_accounts.items():
            for subcategory, accounts in subcategories.items():
                for account in accounts:
                    account = Account(
                        user_id=user.id,
                        company_id=company.id,
                        name=account,
                        category=category,
                        sub_category=subcategory
                    )
                    db.session.add(account)
        db.session.commit()
        return "Successfully created company", 201
    except Exception as e:
        db.session.rollback()
        print("Unxepcted error", str(e))
        return "Error creating company", 400
