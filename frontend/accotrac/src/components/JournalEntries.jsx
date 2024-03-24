import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TransactionTable from './TransactionTable';

axios.defaults.withCredentials = true;
const JournalEntries = () => {
    const [transactions, setTransactions] = useState();
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
        <TransactionTable transactions={transactions}/>
    </div>
  )
}

export default JournalEntries
