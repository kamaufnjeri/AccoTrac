import React, { useState, useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Collapse from 'react-bootstrap/Collapse';
import { UserContext } from './UserContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseUrl from '../utils/settings';
import './collapsible-menu.css';

axios.defaults.withCredentials = true;

function CollapsibleMenu() {
  const navigate = useNavigate();
  const { setCompany, setUser, user, company } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const logoutUser = async () => {
    try {
      const response = await axios.post(`${baseUrl}/logout`);
      if (response.status === 200) {
        toast.success(`${response.data.message} ${response.data.userEmail}`);
        setUser(null);
        setCompany(null);
        navigate('/home');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error('Error logging out: ' + error.response.data.message);
      } else {
        toast.error('Error logging out: ' + error);
      }
      console.log(error);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="collapsible-menu">
      <button className="btn btn-outline-primary btn-open-menu" onClick={toggleMenu}> ||| </button>
      <Navbar
        bg="primary"
        expand="lg"
        variant="dark"
        className={`collapsed-menu ${isOpen ? 'active' : ''}`}
      >
        <Collapse in={isOpen} id="basic-navbar-nav">
          <Nav className="" style={{ color: 'red' }}>
            {user ? (
              <>
              <Link to="/home" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About Us</Link>
              <Link to="/contact" className="nav-link">Contact Us</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/addaccount" className="nav-link">Add Account</Link>
              <Link to="/chartsofaccount" className="nav-link">Charts of Account</Link>
              <Link to="/generaljournal" className="nav-link">Add Journal</Link>
              <Link to="/journals" className="nav-link">View Journals</Link>
              <Link to="/trialbalance" className="nav-link">Trial Balance</Link>
              <Link to="/profitloss" className="nav-link">Profit/Loss</Link>
              <Link to="/balancesheet" className="nav-link">Balance Sheet</Link>
              <Link to="/myprofile" className="nav-link">My Profile</Link>
              <Link to="/companyprofile" className="nav-link">Organization Profile</Link>
              <Link onClick={logoutUser} className="nav-link">Sign Out</Link>
              </>
            ) : (
              <>
              <Link to="/home" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About Us</Link>
              <Link to="/contact" className="nav-link">Contact Us</Link>
              <Link to="/login" className="nav-link">Sign In</Link>
              <Link to="/signup" className="nav-link">Get Started</Link>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CollapsibleMenu;
