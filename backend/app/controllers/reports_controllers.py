from app.models import Account, Company, User


class ReportControllers:
    def get_trial_balance(self, company_id, user_id):
        """Getting trial balance"""
        try:
            """incase company, user with the specified id doesn't exist raise error"""
            company = Company.query.filter_by(id=company_id).first()
            if not company:
                raise ValueError(f"Company of id {company_id} does not exist")
            user = User.query.filter_by(id=user_id).first()
            if not user:
                raise ValueError(f"User Id {user_id} does not exist")
            """get all accounts elated to the specific company"""
            accounts = Account.query.filter_by(
                company_id=company_id,
                user_id=user_id
            ).all()
            """raise error if acounts list is [] or None"""
            if not accounts:
                raise ValueError('No accounts found')
            trial_balance_accounts = []
            
            """Get all tota debits and credits for the accounts"""
            total_debits = sum(account.debit_total for account in accounts)
            total_credits = sum(account.credit_total for account in accounts)

            """loop through each account to get balance for each account and add to list"""
            for account in accounts:
                new_dict = {
                    'debit': account.debit_total,
                    'credit': account.credit_total,
                    'name': account.name
                }
                balance = account.debit_total - account.credit_total
                
                new_dict['balance'] = balance
                trial_balance_accounts.append(new_dict)
            """get sum of all balances which should be zero"""
            total_balance = sum(account['balance'] for account in trial_balance_accounts)
            trial_balance_accounts.append(
                {
                    'total_debits': total_debits,
                    'total_credits': total_credits,
                    'total_balance': total_balance
                }
            )
            """return a list of all accounts with their balances"""
            return trial_balance_accounts, 200

        except ValueError as e:
            return str(e), 400
        except Exception as e:
            return str(e), 500
    
    def get_profit(self, accounts):
        """getting net profit of a company using the expense and revenue accounts"""
        profit_loss = []
        net_profit = 0

        """loop through the accounts"""
        for account in accounts:
            account_profit_loss = {}
            """get balances for revenue and expense accounts"""
            if account.category == 'revenue':
                balance = account.credit_total - account.debit_total
                account_profit_loss['balance'] = balance
                account_profit_loss['name'] = account.name
                account_profit_loss['category'] = account.category
                account_profit_loss['sub_category'] = account.sub_category
                net_profit += balance
            elif account.category == 'expense':
                balance = account.debit_total - account.credit_total
                account_profit_loss['balance'] = balance
                account_profit_loss['name'] = account.name
                account_profit_loss['category'] = account.category
                account_profit_loss['sub_category'] = account.sub_category
                net_profit -= balance
            else:
                continue
            """append info on expense or revenue account to the list"""
            profit_loss.append(account_profit_loss)
        """return list and net profit"""
        return profit_loss, net_profit
        
    def get_profit_loss(self, company_id, user_id):
        try:
            """check company or user if the exist"""
            company = Company.query.filter_by(id=company_id).first()
            if not company:
                raise ValueError(f"Company of id {company_id} does not exist")
            user = User.query.filter_by(id=user_id).first()
            if not user:
                raise ValueError(f"User Id {user_id} does not exist")
            accounts = Account.query.filter_by(
                company_id=company_id,
                user_id=user_id
            ).all()
            """check if the company has any accounts"""
            if not accounts:
                raise ValueError('No accounts found')
            """get the net profit and accounts related to profit/loss by calling the get_profit function"""
            profit_loss_list, net_profit = self.get_profit(accounts)
            
            return profit_loss_list, 200
        except ValueError as e:
            return str(e), 400
        except Exception as e:
            return str(e), 500

            
    def get_balance_sheet(self, company_id, user_id):
        """getting the trial balance related to a specific company and user"""
        try:
            """check if user or company with the specified id exists"""
            company = Company.query.filter_by(id=company_id).first()
            if not company:
                raise ValueError(f"Company of id {company_id} does not exist")
            user = User.query.filter_by(id=user_id).first()
            if not user:
                raise ValueError(f"User Id {user_id} does not exist")
            accounts = Account.query.filter_by(
                company_id=company_id,
                user_id=user_id
            ).all()
            """check that the company has accounts"""
            if not accounts:
                raise ValueError('No accounts found')
            """call get_profit account to get net_profit"""
            profit_list, net_profit = self.get_profit(accounts)

            """a list that will contain all accounts related to the balance sheet"""
            balance_sheet = []
            for account in accounts:
                account_balance_sheet = {}
                """create a dictionary to contain info on all accounts that are asset, liability or equity"""
                if account.category == "asset":
                    balance = account.debit_total - account.credit_total
                    account_balance_sheet['name'] = account.name
                    account_balance_sheet['category'] = account.category
                    account_balance_sheet['sub_category'] = account.sub_category
                    account_balance_sheet['balance'] = balance
                elif account.category == "capital" or account.category == "liability":
                    balance = account.credit_total - account.debit_total
                    account_balance_sheet['name'] = account.name
                    account_balance_sheet['category'] = account.category
                    account_balance_sheet['sub_category'] = account.sub_category
                    account_balance_sheet['balance'] = balance
                else:
                    continue
                """append to the balance_sheet list"""
                balance_sheet.append(account_balance_sheet)
            """append thhe net profit and its info to the balance sheet"""
            balance_sheet.append({
                "name": 'Profit',
                "category": 'capital',
                "sub_category": "capital",
                "balance": net_profit
            })
            """return the list of the balance sheet accounts"""
            return balance_sheet, 200

        except ValueError as e:
            return str(e), 400
        except Exception as e:
            return str(e), 500
        
    def dashboard_info(self, company: Company, user: User):
        """information to be displayed on the dashboard"""
        try:
            if not company:
                raise ValueError(f'Company does not exist')
            if not user:
                raise ValueError(f'User does not exist')
            accounts = Account.query.filter_by(
                company_id=company.id,
                user_id=user.id
            ).all()
            if not accounts:
                raise ValueError('No accounts found for company')
            """get net_profit using get_profit function"""
            profit_list, net_profit = self.get_profit(accounts)
            total_revenue = 0
            total_expense = 0
            total_accounts_receivable = 0  # Corrected variable name
            total_accounts_payable = 0

            """
            loop through the accounts to get
            total revenue, expense, accounts payable
            and accounts receivable
            """
            for account in accounts:
                if account.sub_category == 'accounts_payable':
                    total_accounts_payable += (account.credit_total - account.debit_total)
                elif account.sub_category == 'accounts_receivable':
                    total_accounts_receivable += (account.debit_total - account.credit_total)
                elif account.sub_category == 'revenue':
                    total_revenue += (account.credit_total - account.debit_total) 
                elif account.sub_category == 'expense':
                    total_expense += (account.debit_total - account.credit_total)
                else:
                    continue
            """return a dictionary with all info needed for the dashboard"""
            dashboard_data = {
                "net_profit": net_profit,
                "total_revenue": total_revenue,
                "total_expense": total_expense,
                "total_accounts_payable": total_accounts_payable,
                "total_accounts_receivable": total_accounts_receivable
            }
            return dashboard_data, 200
        except ValueError as e:
            return str(e), 400
        except Exception as e:
            return str(e), 500