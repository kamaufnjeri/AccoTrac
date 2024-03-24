import React, { useContext, useState } from 'react';
import JournalRow from './JournalRow'; // Import the JournalRow component
import RequestHandler from '../methods/HandleApiRequests';
import { toast } from 'react-toastify';
import axios from 'axios';

axios.defaults.withCredentials = true
const GeneralJournal = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  console.log(currentDate)
  const [entries, setEntries] = useState([]);

  const [data, setData] = useState({
    date: '',
    description: '',
    entries: []
  });

  
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);


  const addRow = (e) => {
    e.preventDefault();
    setEntries([...entries, { account_id: '', debit: '', credit: '' }]);
  };

  const removeRow = (index) => {
    if (entries.length > 2 && index >= 2) {
      const updatedEntries = [...entries];
      updatedEntries.splice(index, 1);
      setEntries(updatedEntries);
      calculateTotals(updatedEntries);
      setData({...data, entries: updatedEntries});
    }
  };

  const handleChange = (index, key, value) => {
    const updatedEntries = [...entries];
    if (key === 'debit') {
      updatedEntries[index] = {
        ...updatedEntries[index],
        debit: value,
        credit: value ? 0 : updatedEntries[index].credit
      };
    } else if (key === 'credit') {
      updatedEntries[index] = {
        ...updatedEntries[index],
        credit: value,
        debit: value ? 0 : updatedEntries[index].debit
      };
    } else if (key === 'account_id') {
      updatedEntries[index] = {
        ...updatedEntries[index],
        account_id: value
      };
    }
  
    setEntries(updatedEntries);
    setData({...data, entries: updatedEntries});
    console.log(data);
    calculateTotals(updatedEntries);
  };
  

  const calculateTotals = (updatedEntries) => {
    let debitTotal = 0;
    let creditTotal = 0;
    updatedEntries.forEach(entry => {
      debitTotal += parseFloat(entry.debit) || 0;
      creditTotal += parseFloat(entry.credit) || 0;
    });
    setTotalDebit(debitTotal);
    setTotalCredit(creditTotal);
  };


  const difference = totalDebit - totalCredit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    setData({...data, entries: entries});
    if (data && difference === 0) {
      try {

        const response = await axios.post('http://localhost:5000/addtransaction', data);
        if (response.status === 201) {
          toast.success(response.data.message);
          setData({
            date: '',
            description: '',
            entries: []
          });
          setEntries([
          ]);
          setTotalCredit(0);
          setTotalDebit(0);
        }
       throw new Error(response.data.response);
      } catch (error) {
        console.log(error)
        if (error.response) {
          toast.error(error.response.data.response);
        }
        toast.error(error);
      }
    } else {
      toast.error("Please fill in all required fields and ensure the debits and credits are equal.");
    }
  };

  return (
    <div className="">
      <h3 className="mb-4 mt-4">General Journal</h3>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="date" className="col-sm-2 col-form-label fw-bold fs-5">Date</label>
          <div className="col-sm-4">
            <input type="date" className="form-control" id="date"
            value={data.date}
            max={currentDate}
            onChange={(e) => setData({...data, date: e.target.value})}
             required/>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="description" className="col-sm-2 col-form-label fw-bold fs-5">Description</label>
          <div className="col-sm-10">
            <textarea className="form-control" id="description" 
            value={data.description}
            onChange={(e) => setData({...data, description: e.target.value})}
            required></textarea>
          </div>
        </div>
        <div className="mb-4">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Account</th>
                <th scope="col">Debit</th>
                <th scope="col">Credit</th>
                <th scope='col'>x</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <JournalRow
                  key={index}
                  entry={entry}
                  index={index}
                  handleChange={handleChange}
                  removeRow={removeRow}
                  
                />
              ))}
            </tbody>
          </table>
          <div>
            <button type="button" onClick={addRow} className="btn btn-primary">Add Row</button>
          </div>
        </div>
        <div className="mb-4">
          <div className="row mb-4">
            <h4 className='col-6'>Total</h4>
            <p className='col-2'>{totalDebit}</p>
            <p className='col-2'>{totalCredit}</p>
          </div>
          <div className="mb-4 row">
            <h4 className='col-8'>Difference</h4>
            <p className='col-4'>{difference}</p>
          </div>
          <div className="d-flex justify-content-lg-end">
            <button type="submit" className="btn btn-success btn-lg">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default GeneralJournal;
