import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true;
const ChartsOfAccount = () => {
    // useState to manage accounts and selected account id for deletion
    const [accounts, setAccounts] = useState();
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    // using useEffect to fetch all accounts from the backend
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
    }, []);

    // fuction to handle delete of an account by id
    const handleDelete = async (id, name) => {
        try {
            console.log(id);
            setSelectedAccountId(id); 
            const response = await axios.delete(`http://localhost:5000/${id}/deleteaccount`);

            if (response.status === 200) {
                toast.success("Success deleting account " + name);
                setAccounts(accounts.filter(account => account.id !== id));
            }
            else {
                throw new Error(response.data.response);
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            if (error.response && error.response.data) {
                toast.error('Error deleting account: ' + error.response.data.response);
            }
            else {
                toast.error('Error deleting account: ' + error);
            }
        }
    };

    // format name for category and sub category
    const formatName = (name) => {
        // first letter in a word with a capital and '_' with space
        return name
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="container mt-5">
            <h2>Charts of Account</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Sub Category</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts && accounts.map(account => (
                        <tr key={account.id}>
                            <td>{account.name}</td>
                            <td>{formatName(account.category)}</td>
                            <td>{formatName(account.sub_category)}</td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(account.id, account.name)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ChartsOfAccount;
