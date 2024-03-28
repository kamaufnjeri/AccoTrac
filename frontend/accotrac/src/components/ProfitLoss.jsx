import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

axios.defaults.withCredentials = true;

const ProfitLoss = () => {
  // initialize or get data to be used for the profit loss info tobe displayed
  const [revenueAccounts, setRevenueAccounts] = useState([]);
  const [expenseAccounts, setExpenseAccounts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState({ name: "Total Revenue", revenue: 0 });
  const [totalExpenses, setTotalExpenses] = useState({ name: "Total Expenses", expense: 0 });
  const [netProfit, setNetProfit] = useState({ name: 'Net Profit', profit: 0 });
  const [salesAccounts, setSalesAccount] = useState([]);
  const [totalSalesRevenue, setTotalSalesRevenue] = useState({ name: "Total Sales", sales: 0});
  const [totalCogs, setTotalCogs] = useState({ name: "Total cost of goods sold", cogs: 0 });
  const [cogsAccounts, setCogsAccounts] = useState([]);
  const [grossProfit, setGrossProfit] = useState({ name: "Gross Profit", grossProfit: 0 });
  const { company } = useContext(UserContext);
  const currentDate = new Date().toISOString().split('T')[0];

  // use useeffect and axios to fetch profit/loss data from backend
  useEffect(() => {
    const fetchProfitLoss = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profitloss');
        const accounts = response.data;
        
        // Filter revenue and expense accounts
        const revenue = accounts.filter(account => account.category === 'revenue' && account.sub_category === 'revenue');
        const expenses = accounts.filter(account => account.category === 'expense' && account.sub_category === 'expense');
        
        //filter sales revenue accounts
        const salesRevenue = accounts.filter(account => account.category === 'revenue' && account.sub_category === 'sales_revenue');

        // filter cogs accounts
        const cogs = accounts.filter(account => account.category === 'expense' && account.sub_category === 'cost_of_goods_sold');


        // Calculate total revenue
        const totalRevenueAmount = revenue.reduce((acc, curr) => acc + curr.balance, 0);
        setTotalRevenue(prevState => ({ ...prevState, revenue: totalRevenueAmount }));

        // Calculate total expenses
        const totalExpensesAmount = expenses.reduce((acc, curr) => acc + curr.balance, 0);
        setTotalExpenses(prevState => ({ ...prevState, expense: totalExpensesAmount }));

        // total sales
        const totalSales = salesRevenue.reduce((acc, curr) => acc + curr.balance, 0);
        setTotalSalesRevenue(prevState => ({ ...prevState, sales: totalSales}));

        // total cogs
        const totalCogs = cogs.reduce((acc, curr) => acc + curr.balance, 0);
        console.log(totalCogs);
        setTotalCogs(prevState => ({ ...prevState, cogs: totalCogs }));

        const grossProfit = totalSales - totalCogs;
        setGrossProfit(prevState => ({ ...prevState, grossProfit: grossProfit }));

        // Calculate net profit
         const netProfitAmount = grossProfit + totalRevenueAmount - totalExpensesAmount;
         setNetProfit(prevState => ({ ...prevState, profit: netProfitAmount }));

        setCogsAccounts(cogs);
        setSalesAccount(salesRevenue);
        setRevenueAccounts(revenue);
        setExpenseAccounts(expenses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfitLoss();
  }, []);

  return (
    company && (
      <div className="container mt-4">
        <h2 className='m-0'>{company.name}</h2>
        <h2 className='m-0'>Profit/Loss Statement</h2>
        <h2 className='m-0'>As at {currentDate}</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Amount ({company.currency})</th>
              <th>Total Amount ({company.currency})</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td colSpan="2"><strong>Sales</strong></td>
            </tr>
            {salesAccounts.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.balance}</td>
                <td></td>
              </tr>
            ))}
            <tr>
              <td><strong>{totalSalesRevenue.name}</strong></td>
              <td></td>
              <td><strong>{totalSalesRevenue.sales}</strong></td>
            </tr>
            <tr>
              <td colSpan="2"><strong>Cost of goods sold</strong></td>
            </tr>
            {cogsAccounts.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.balance}</td>
                <td></td>
              </tr>
            ))}
            <tr>
              <td><strong>{totalCogs.name}</strong></td>
              <td></td>
              <td><strong>({totalCogs.cogs})</strong></td>
            </tr>
            <tr>
              <td colSpan="3" style={{ borderBottom: '2px solid black' }}></td>
            </tr>
            <tr>
              <td><strong>{grossProfit.name}</strong></td>
              <td></td>
              <td><strong>{grossProfit.grossProfit}</strong></td>
            </tr>
            <tr>
              <td colSpan="2"><strong>Revenue</strong></td>
            </tr>
            {revenueAccounts.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.balance}</td>
                <td></td>
              </tr>
            ))}
            <tr>
              <td><strong>{totalRevenue.name}</strong></td>
              <td></td>
              <td><strong>{totalRevenue.revenue}</strong></td>
            </tr>
            <tr>
              <td colSpan="2"><strong>Expenses</strong></td>
            </tr>
            {expenseAccounts.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.balance}</td>
                <td></td>
              </tr>
            ))}
            <tr>
              <td><strong>{totalExpenses.name}</strong></td>
              <td></td>
              <td><strong>({totalExpenses.expense})</strong></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td><strong>{netProfit.name}</strong></td>
              <td></td>
              <td><strong>{netProfit.profit}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  );
};

export default ProfitLoss;
