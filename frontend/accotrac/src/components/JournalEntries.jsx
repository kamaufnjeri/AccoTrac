import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import TransactionTable from './TransactionTable';
import { UserContext } from './UserContext';

axios.defaults.withCredentials = true;
const JournalEntries = () => {
    // manage the data needed for listing all entries/transactions/double entries
    const [transactions, setTransactions] = useState();
    const { company } = useContext(UserContext);

    // using usefeect to fetch all the journal entries/transactions
    useEffect(() => {
        const fetchTransactions = async() => {
            try {
                const response = await axios.get('http://localhost:5000/alltransactions')
                console.log(response)
                setTransactions(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTransactions();
    }, [setTransactions])
    
  return (
    <div className='container m-3'>
        <TransactionTable transactions={transactions} company={company}/>
    </div>
  )
}

export default JournalEntries
