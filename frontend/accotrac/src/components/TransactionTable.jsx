import React from 'react';

const TransactionTable = ({ transactions }) => {
  return (
    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Account Name</th>
          <th>Debit</th>
          <th>Credit</th>
        </tr>
      </thead>
      <tbody>
        {transactions && transactions.map((transaction, index) => (
          transaction.entries.map((entry, entryIndex) => (
            <tr key={`${index}-${entryIndex}`}>
              {entryIndex === 0 ? <td rowSpan={transaction.entries.length}>{transaction.date}</td> : null}
              {entryIndex === 0 ? <td rowSpan={transaction.entries.length}>{transaction.description}</td> : null}
              <td>{entry.account_name}</td>
              <td>{entry.debit}</td>
              <td>{entry.credit}</td>
              
            </tr>
          ))
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
