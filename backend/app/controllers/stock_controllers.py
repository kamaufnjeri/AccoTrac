from app.models import Company, Stock
from app import db


class StockControllers:
    def create_stock(self, company_id, data):
        """create a new stock item"""
        company = Company.query.filter_by(id=company_id).first()

        if not company:
            raise Exception(f"The company ID {company_id} doesn't exist")
        
        try:
            quantity = 0
            name = data.get("name")

            if name:
                new_stock = Stock(
                    company_id=company_id,
                    name=name,
                    total_quantity=quantity
                )
                db.session.add(new_stock)
                db.session.commit()

                return "Stock added successful", 201, new_stock.to_dict()
        
        except Exception as e:
            db.session.rollback()
            return "Unexpected error adding stock", 500, str(e)

    def get_all_stocks(self, company_id):
        company = Company.query.filter_by(id=company_id).first()
        print(company)

        if not company:
            raise Exception(f"The company ID {company_id} doesn't exist")
        
        try:
            stocks = Stock.query.all()

            stocks_list = [stock.to_dict() for stock in stocks]

            return "Stock data successfully fetched", 200, stocks_list

        except Exception as e:
            return "Error fetching stocks! Try again later!", 500, str(e)
        
    def update_stock(company_id, stock_id, data):
        pass

    def delete_stock(company_id, stock_id):
        pass

    def get_stock(company_id, stock_id):
        pass
