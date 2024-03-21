import React, { useState } from 'react';
/**
 * 
 * @returns  <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-phone" />
                          </span>
                        </div>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Phone Number"
                          aria-label="Phone Number"
                          aria-describedby="basic-addon1"
                        />
                      </div>
 */
const GeneralJournal = () => {
  const [entries, setEntries] = useState([
    { account_id: '', debit: '', credit: '' },
    { account_id: '', debit: '', credit: '' }
  ]);
  const [data, setData] = useState({
    "date": '',
    "description": '',
    "entries": entries
  })

  const addRow = () => {
    setEntries([...entries, { account_id: '', debit: '', credit: '' }]);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  }
  
  const handleChange = (index, key, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [key]: value
    };
    setEntries(updatedEntries);
  };

  const renderRow = (entry, index) => {

    return (
      <div key={index}>
        <select
          value={entry.account_id}
          onChange={(e) => handleChange(index, 'account_id', e.target.value)}
          required
        >
          <option value="">Select an account</option>
          {/* Add your options here */}
        </select>
        <input
          type="number"
          value={entry.debit}
          onChange={(e) => handleChange(index, 'debit', e.target.value)}
          placeholder="Debit"
        />
        <input
          type="number"
          value={entry.credit}
          onChange={(e) => handleChange(index, 'credit', e.target.value)}
          placeholder="Credit"
        />
      </div>
    );
  };
  return (
    <div>
      <h3>General Journal</h3>
      <form>
        <div>
          <span>Date</span>
          <input type='date'
          value={data.date}
          onChange={(e) => {
            setData({...data, date: e.target.value})
          }}
          required
          />
        </div>
        <div>
          <span>Description</span>
          <textarea type='text'
          value={data.description}
          onChange={(e) => {
            setData({...data, description: e.target.value})
          }}
          required
          ></textarea>
        </div>
        <div>
          <h4>Account</h4>
          <h4>Debit</h4>
          <h4>Credit</h4>
        </div>
        <div>
          <div>
        {entries.map((entry, index) => renderRow(entry, index))}
          </div>
            <button onClick={(e) => {
            e.preventDefault();
            addRow()
          }}>Add Row</button>
        </div>
        <div>
          <h4>Total</h4>
          <p></p>
          <p></p>
        </div>
        <div>
          <h4>Difference</h4>
          <p></p>
        </div>
        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  )
}

export default GeneralJournal;

