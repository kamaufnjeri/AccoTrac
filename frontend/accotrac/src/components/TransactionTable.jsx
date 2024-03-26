import React, { useState, useEffect } from 'react';

const TransactionTable = ({ transactions, company }) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [filterDate, setFilterDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [periodInfo, setPeriodInfo] = useState(`As at ${currentDate}`);

  // Function to handle date filter change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
    setPeriodInfo(`For ${selectedDate}`);
    // Filter transactions based on the selected date
    const filteredTransactions = transactions.filter(transaction => transaction.date === selectedDate);
    // Update state with filtered transactions
    setFilteredTransactions(filteredTransactions);
  };

  useEffect(() => {
    // Initialize filteredTransactions with the initial transactions prop when the component mounts
    setFilteredTransactions(transactions);
  }, [transactions]); // This effect runs only when the transactions prop changes

  return (
    <div className="transaction-table-container">
      {company && (
        <div>
          <div className="header">
            <h2 className='m-0'>{company.name}</h2>
            <h2 className='m-0'>Journal entries</h2>
            <h2 className='m-0'>{periodInfo}</h2>
          </div>
          <div className="filter-container row">
            <label htmlFor="filterDate" className="col-auto col-form-label">Filter by date:</label>
            <div className="col-auto">
              <input 
                type="date" 
                id="filterDate" 
                value={filterDate} 
                onChange={handleDateChange} 
                className="form-control"
              />
            </div>
          </div>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Account Name</th>
                <th>Debit ({company.currency})</th>
                <th>Credit ({company.currency})</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions && filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  transaction.entries.map((entry, entryIndex) => (
                    <tr key={`${index}-${entryIndex}`}>
                      {entryIndex === 0 ? <td rowSpan={transaction.entries.length}>{transaction.date}</td> : null}
                      {entryIndex === 0 ? <td rowSpan={transaction.entries.length}>{transaction.description}</td> : null}
                      <td>{entry.account_name}</td>
                      <td>{entry.debit}</td>
                      <td>{entry.credit}</td>
                    </tr>
                  ))
                ))
              ) : (
                <tr>
                  <td colSpan="5">No journal entries for this date</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
