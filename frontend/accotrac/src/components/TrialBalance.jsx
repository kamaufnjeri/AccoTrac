import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

axios.defaults.withCredentials = true;

const TrialBalance = () => {
  const [trialBalance, setTrialBalance] = useState([]);
  const [totals, setTotals] = useState({});
  const { company } = useContext(UserContext);
  const currenntDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchTrialBalance = async () => {
      try {
        const response = await axios.get('http://localhost:5000/trialbalance');
        setTrialBalance(response.data.slice(0, -1));
        setTotals(response.data[response.data.length - 1]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrialBalance();
  }, []);

  return (
    company && (
      <div className="container mt-4">
        <h2 className='m-0'>{company.name}</h2>
        <h2 className='m-0'>Trial Balance</h2>
        <h2 className='m-0'>As at {currenntDate}</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Total Debits ({company.currency})</th>
              <th>Total Credits ({company.currency})</th>
              <th>Balance ({company.currency})</th>
            </tr>
          </thead>
          <tbody>
            {trialBalance.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.debit}</td>
                <td>{entry.credit}</td>
                <td>{entry.balance < 0 ? `(${Math.abs(entry.balance)})` : entry.balance}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td><strong>Totals</strong></td>
              <td><strong>{totals.total_debits}</strong></td>
              <td><strong>{totals.total_credits}</strong></td>
              <td><strong>{totals.total_balance}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  );
};

export default TrialBalance;
