import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

axios.defaults.withCredentials = true;

const ProfitLoss = () => {
  const [revenueAccounts, setRevenueAccounts] = useState([]);
  const [expenseAccounts, setExpenseAccounts] = useState([]);
  const [netProfit, setNetProfit] = useState({});
  const { company } = useContext(UserContext);
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchProfitLoss = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profitloss');
        const accounts = response.data;
        
        // Filter revenue and expense accounts
        const revenue = accounts.filter(account => account.category === 'revenue');
        const expenses = accounts.filter(account => account.category === 'expense');
        
        // Calculate net profit
        const totalRevenue = revenue.reduce((acc, curr) => acc + curr.balance, 0);
        const totalExpenses = expenses.reduce((acc, curr) => acc + curr.balance, 0);
        const netProfitAmount = totalRevenue - totalExpenses;

        setRevenueAccounts(revenue);
        setExpenseAccounts(expenses);
        setNetProfit({ name: 'Net Profit', profit: netProfitAmount });
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2"><strong>Revenue</strong></td>
            </tr>
            {revenueAccounts.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.balance}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2"><strong>Expenses</strong></td>
            </tr>
            {expenseAccounts.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.balance}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td><strong>{netProfit.name}</strong></td>
              <td><strong>{netProfit.profit}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  );
};

export default ProfitLoss;
