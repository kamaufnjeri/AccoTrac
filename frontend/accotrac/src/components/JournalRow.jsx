import axios from 'axios';
import React, { useState, useEffect } from 'react';

axios.defaults.withCredentials = true;

const JournalRow = ({ entry, index, handleChange, removeRow }) => {
  const [accounts, setAccounts] = useState();

  // use effect to fetch accounts info/data from the backend
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getallaccounts`);

            if (response.status === 200) {
                setAccounts(response.data.response);
            }
            else {
                throw new Error(response.data.response);
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            if (error.response && error.response.data) {
                console.error('Error deleting account: ' + error.response.data.response);
            }
            else {
                console.error('Error deleting account: ' + error);
            }
        } 
    }
    fetchData();
}, [setAccounts]);

  // Initialize options state with an empty array
  const [options, setOptions] = useState([]);

  // Initialize selectedOption state with an empty string
  const [selectedOption, setSelectedOption] = useState('');

  // Update options state when accounts change
  useEffect(() => {
    if (accounts) {
      const newOptions = accounts.map(account => ({
        name: `${account.name} (bal - ${account.balance})`,
        value: account.id, 
      }));
      setOptions(newOptions);
      setSelectedOption('');
    }
  }, [accounts]);

  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>
        <select
          value={selectedOption}
          onChange={(e) => {
            const selectedAccountId = e.target.value;
            handleChange(index, 'account_id', selectedAccountId);
            console.log(e.target.value)
            setSelectedOption(selectedAccountId);
          }}
          className="form-select"
          required
        >
          <option value="">Choose an account</option>
          {options.map(account => (
            <option key={account.value} value={account.value}>{account.name}</option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          value={entry.debit}
          onChange={(e) => handleChange(index, 'debit', e.target.value)}
          className="form-control"
          placeholder="Debit"
        />
      </td>
      <td>
        <input
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          value={entry.credit}
          onChange={(e) => handleChange(index, 'credit', e.target.value)}
          className="form-control"
          placeholder="Credit"
        />
      </td>
      <td>
        <button type="button" onClick={() => removeRow(index)} className="btn btn-outline-danger btn-sm">X</button>
      </td>
    </tr>
  );
};

export default JournalRow;
