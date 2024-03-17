from app import db
from app.models import Stock, StockEntries, Account
from .general_transaction_controllers import GeneralTransactionControllers
from datetime import datetime


transaction = GeneralTransactionControllers()


class SalesTransactionControllers:
    def calculate_cogs(self, stock, quantity_sold):
        """
        Calculate the cost of goods sold (COGS) based on sorted stock entries.

        Args:
            sorted_entries (list): List of StockEntries objects sorted by date.
            quantity_sold (int): Quantity of products sold.

        Returns:
            float: Cost of goods sold.

        Raises:
            ValueError: If there's insufficient inventory to sell the specified quantity.
            Exception: For unexpected errors during database operations.
        """
        cogs = 0
        remaining_quantity = quantity_sold
        stock_purchase_entries = stock.get_sorted_purchase_entries()

        if stock.total_quantity < quantity_sold:
            raise ValueError("Insufficient inventory to sell the specified quantity.")
            
        stock.total_quantity -= quantity_sold
            

        for entry in stock_purchase_entries:
            cost_per_unit = entry.price
            quantity_available = entry.quantity

            """choose between the two the minimum"""
            quantity_to_use = min(remaining_quantity, quantity_available)

            cost_from_entry = quantity_to_use * cost_per_unit

            entry.remaining_quantity -= quantity_to_use
            remaining_quantity -= quantity_to_use
            cogs += cost_from_entry

            if remaining_quantity == 0:
                break

        if remaining_quantity > 0:
            raise ValueError("Insufficient inventory to sell the specified quantity.")
            return None
        return cogs



    def create_sales_journal(self, company_id, data):
        """
        Args:
            data (dict): Dictionary containing purchase transaction details including date,
                        description, transaction amounts (entries), and product information.
                        Example:
                        {
                            "date": "2024-03-14",
                            "description": "Sales to customer x",
                            "category": "sales",
                            "entries": [
                                {"account_id": 1, "debit": 1000.0, "credit": 0.0},  # Inventory
                                {"account_id": 2, "debit": 0.0, "credit": 1000.0},  # Accounts Payable
                            ],
                            "stocks": [
                                {"stock_id": 1, "units": 4, "price": 200.0},
                                {"stock_id": 3, "units": 1, "price": 300.0},
                            ]
                        }
        Raises:
            ValueError: If debit and credit totals do not match, 
                        or if there's insufficient stock (informative message),
                        or if product or account is not found.
            Exception: For unexpected errors during database operations.
        """
        try:
            total_sales_price = 0
            total_cost_goods_sold = 0

            # Process products and update stock
            stocks = data.get('stocks', [])
            if data.get("category") != "sales":
                        raise ValueError("The entry is not a sales")
            
            if stocks:
                for stock_data in stocks:
                    stock = Stock.query.get(stock_data.get("stock_id"))
                    if not stock:
                        raise ValueError(f"Stock with ID {stock_data.get('stock_id')} not found.")

                    total_sales_price += stock_data.get("units") * stock_data.get("price")

                    if stock.total_quantity < stock_data.get("units"):
                        raise ValueError(
                            f"Insufficient stock for stock {stock.id} (available: {stock.total_quantity},"
                            f"requested: {stock_data.get('units')})"
                        )
                    
                    if stock_data.get('units') == 0:
                        raise ValueError('The amount of stock to purchase cannot be zero')
                    
                    cogs = self.calculate_cogs(
                        stock, stock_data.get("units")
                    )
                    if not cogs:
                        raise ValueError("Insufficient inventory to sell the specified quantity")
                    total_cost_goods_sold += cogs
                    sales_account_id = data.get('entries')[-1].get('account_id')
                    
                    sales_account = Account.query.filter_by(
                        id=sales_account_id,
                        company_id=company_id
                    ).first()

                    if (not sales_account) or (
                        sales_account.category != "revenue"
                        and sales_account.sub_category != "sales_revenue"
                    ):

                        raise ValueError("The account is not a sales revenue account")
                    
                    stock_entry = StockEntries(
                        stock_id=stock.id,
                        account_id=sales_account.id,
                        quantity=stock_data.get("units"),
                        remaining_quantity=0,
                        price=stock_data.get("price", 0),
                        category=data.get("category"),
                        date=datetime.strptime(data.get("date"), '%Y-%m-%d')
                    )
                    db.session.add(stock_entry)

            credit_totals = sum(entry.get("credit", 0.0) for entry in data.get("entries", []))

            print(total_sales_price, credit_totals, total_cost_goods_sold)

            if credit_totals != total_sales_price:
                raise ValueError("Credit totals do not match calculated sales price.")

            if credit_totals > total_cost_goods_sold:
                sales_message, sales_code, sales_resp = transaction.create_general_journal(company_id, data)
                if sales_code == 201:
                    cog_account = Account.query.filter_by(
                        company_id=company_id,
                        category="expense",
                        sub_category="cost_of_goods_sold"
                    ).first()
                    inventory_account = Account.query.filter_by(
                        company_id=company_id,
                        category="asset",
                        sub_category="inventory"
                    ).first()
                    adjust_message, adjust_code, adjust_resp = transaction.create_general_journal(company_id, {
                        "date": data.get('date'),
                        "description": data.get('description'),
                        "entries": [
                            {"account_id": cog_account.id, "debit": total_cost_goods_sold, "credit": 0},
                            {"account_id": inventory_account.id, "debit": 0, "credit": total_cost_goods_sold}
                        ]
                    })

                    if adjust_code == 201:
                        db.session.commit()
                        return "Success entering sales transactions", sales_code, sales_resp

                    
                    elif adjust_code != 201:
                        raise ValueError(adjust_resp)
                    
                elif sales_code != 201:
                        raise ValueError(sales_resp)
                
            else:
                raise ValueError(
                    f"The sales price is {credit_totals} while the "
                    f"cost of goods being sold is {total_cost_goods_sold}."
                    "The sales is a loss"
                )


        except ValueError as e:
            db.session.rollback()
            return "Error entering sales transaction", 400, str(e)
        except Exception as e:
            db.session.rollback()
            return "Unexpected error entering transaction", 500, str(e)
