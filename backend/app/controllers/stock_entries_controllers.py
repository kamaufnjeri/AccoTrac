from app.models import StockEntry, Company


class StockEntriesControllers:
    def get_entries_by_category(self, company_id, category):
        try:
            company = Company.query.filter_by(id=company_id).first()

            if category not in ["purchase", "sales", "sales return", "purchase return"]:
                raise Exception("Categories for can only be 'purchase', 'sales', 'purchase return' or 'sales return")

            if not company:
                raise Exception(f"Company ID {company_id} doesn't exist")

            stock_entries = StockEntry.query.all()

            if not stock_entries:
                raise Exception(f"Company 1D {company_id} has no stock entries")

            stock_entries_list = [entry.to_dict() for entry in stock_entries if entry.category == category]

            return "Successfully fetched purchase stock entries", 200, stock_entries_list

        except Exception as e:
            return "Error fetching stock entries", 500, str(e)
