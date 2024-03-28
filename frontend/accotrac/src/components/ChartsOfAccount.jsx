import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


axios.defaults.withCredentials = true;
const ChartsOfAccount = () => {
    // useState to manage accounts and selected account id for deletion
    const [accounts, setAccounts] = useState();
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [name, setName] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (name, id) => {
        setName(name);
        setSelectedAccountId(id);
        setShow(true);
    }
  

    // styles for modal
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

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
            const response = await axios.delete(`http://localhost:5000/${selectedAccountId}/deleteaccount`);

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
        handleClose();
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
            <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete account {name} ID {selectedAccountId}?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleDelete(selectedAccountId, name)}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
            </div>
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
                                <button className="btn btn-sm btn-danger" onClickCapture={() => handleShow(account.name, account.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ChartsOfAccount;
