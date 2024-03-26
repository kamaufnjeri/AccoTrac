from app.models import Account, Company, User


class ReportControllers:
    def get_trial_balance(self, company_id, user_id):
        try:
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
            if not accounts:
                raise ValueError('No accounts found')
            trial_balance_accounts = []
            
            total_debits = sum(account.debit_total for account in accounts)
            total_credits = sum(account.credit_total for account in accounts)
            for account in accounts:
                new_dict = {
                    'debit': account.debit_total,
                    'credit': account.credit_total,
                    'name': account.name
                }
                balance = account.debit_total - account.credit_total
                
                new_dict['balance'] = balance
                trial_balance_accounts.append(new_dict)
            total_balance = sum(account['balance'] for account in trial_balance_accounts)
            trial_balance_accounts.append(
                {
                    'total_debits': total_debits,
                    'total_credits': total_credits,
                    'total_balance': total_balance
                }
            )
            return trial_balance_accounts, 200

        except ValueError as e:
            return str(e), 400
        except Exception as e:
            return str(e), 500
    
    def get_profit(self, accounts):
        profit_loss = []
        net_profit = 0
        for account in accounts:
            account_profit_loss = {}
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
            profit_loss.append(account_profit_loss)
        return profit_loss, net_profit
        
    def get_profit_loss(self, company_id, user_id):
        try:
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
            if not accounts:
                raise ValueError('No accounts found')
            
            profit_loss_list, net_profit = self.get_profit(accounts)
            
            return profit_loss_list, 200
        except ValueError as e:
            return str(e), 400
        except Exception as e:
            return str(e), 500

            
    def get_balance_sheet(self, company_id, user_id):
        try:
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
            if not accounts:
                raise ValueError('No accounts found')
            profit_list, net_profit = self.get_profit(accounts)

            balance_sheet = []
            for account in accounts:
                account_balance_sheet = {}
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
               
                balance_sheet.append(account_balance_sheet)
            balance_sheet.append({
                "name": 'Profit',
                "category": 'capital',
                "sub_category": "capital",
                "balance": net_profit
            })
           
            return balance_sheet, 200

        except ValueError as e:
            return str(e), 400
        except Exception as e:
            return str(e), 500