import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';


axios.defaults.withCredentials = true;
const UpdateUser = () => {
  // initialize data or get data needed for updating user info
    const { user, setUser, setCompany } = useContext(UserContext);
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    // using use Effect to set data depending on the user from UserContext
    useEffect(() => {
        if (user !== undefined) {
            setData(user);
        }
    }, [user])

    // submitting date on user that has been input for changing
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:5000/user/${user.id}`, data);
          console.log(response)
          if (response.status === 200) {
            toast.success("Success updating user information");
            setData(response.data);
            setUser(response.data);
            console.log('user',user);
          } else {
            console.log(response.data);
            throw new Error(response.data.message)
          }
        } catch (error) {
          console.log(error)
          if (error.response.data) {
            toast.error("Error updating user: " + error.response.data.message);
          }
          else {
            toast.error("Error updating: " + error);
          }
          setData(user);
        }
      };
      
    // fuction to handle delete of an account by id
    const handleDelete = async () => {
      try { 
          const response = await axios.delete(`http://localhost:5000/user/${data.id}`);

          if (response.status === 200) {
              toast.success("Success deleting account");
              setUser(null);
              setCompany(null);
              navigate('/home');
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
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete user {data.email}?</Modal.Body>
        <Modal.Body>
          Warning! The company and transactions related to this user will be deleted.
          This action can not be undone
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <h2>User details</h2>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
            type="text"
            class="form-control"
            id="firstName"
            value={data.firstname}
            onChange={(e) => setData({...data, firstname: e.target.value})}
            />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
            type="text"
            class="form-control"
            id="lastName"
            value={data.lastname}
            onChange={(e) => setData({...data, lastname: e.target.value})}
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
            type="email"
            class="form-control"
            id="email"
            value={data.email}
            onChange={(e) => setData({...data, email: e.target.value})}
            />
          </div>
          <button type="submit" class="btn btn-primary mr-4">Submit</button>
          <Button variant="danger" onClick={handleShow}>
            Delete user
          </Button>
        </form>
    </div>
  )
}

export default UpdateUser
