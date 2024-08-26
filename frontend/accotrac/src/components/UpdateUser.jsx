import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../utils/settings';

axios.defaults.withCredentials = true;

const UpdateUser = () => {
  const { user, setUser, setCompany } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);

  // State for password change and visibility toggle
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Separate states for each password field visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (user !== undefined) {
      setData(user);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${baseUrl}/user/${user.id}`, data);
      if (response.status === 200) {
        toast.success("Success updating user information");
        setData(response.data);
        setUser(response.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        toast.error("Error updating user: " + error.response.data.message);
      } else {
        toast.error("Error updating: " + error);
      }
      setData(user);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/user/${data.id}`);
      if (response.status === 200) {
        toast.success("Success deleting User");
        setUser(null);
        setCompany(null);
        navigate('/home');
      } else {
        throw new Error(response.data.response);
      }
    } catch (error) {
      console.error('Error deleting User:', error);
      if (error.response && error.response.data) {
        toast.error('Error deleting User: ' + error.response.data.response);
      } else {
        toast.error('Error deleting User: ' + error);
      }
    }
    handleClose();
  };

  // Function to handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      const response = await axios.put(`${baseUrl}/user/${user.id}/change-password`, {
        oldPassword,
        newPassword,
      });
      if (response.status === 200) {
        toast.success("Password updated successfully");
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error("Error changing password: " + error.response.data.message);
      } else {
        toast.error("Error changing password: " + error);
      }
    }
  };

  return (
    <div className="container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete user {data.email}?</Modal.Body>
        <Modal.Body>
          Warning! The company and transactions related to this user will be deleted.
          This action cannot be undone.
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

      <div className="row">
        <div className="col-md-6">
          <h2>User Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={data.firstname}
                onChange={(e) => setData({ ...data, firstname: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={data.lastname}
                onChange={(e) => setData({ ...data, lastname: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary mr-4">Submit</button>
            <Button variant="danger" onClick={handleShow}>
              Delete user
            </Button>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label htmlFor="oldPassword">Current Password</label>
              <div className="input-group">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  className="form-control"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-group">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Change Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
