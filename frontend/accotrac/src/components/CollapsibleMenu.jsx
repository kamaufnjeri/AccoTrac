import React, { useState, useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Collapse from 'react-bootstrap/Collapse';
import { UserContext } from './UserContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true;

function CollapsibleMenu() {
  // navbar to be displayed when user is on a smaller screen
  const navigate = useNavigate();
  const { setCompany, setUser, user, company } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  // fuction to logout a user
  const logoutUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout');
      console.log(response.data);
      if (response.status === 200) {
        toast.success(`${response.data.message} ${response.data.userEmail}`);
        setUser(null);
        setCompany(null);
        console.log(user);
        console.log(company);
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
    }
  };

  // to open or close Navbar
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Navbar.Brand>
        {company && (
          <Link to='/dashboard' style={{ color: 'white' }}>{company.name}</Link>
        )}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />
      <Collapse in={isOpen} id="basic-navbar-nav">
        <Nav className="ms-auto">
          {user ? (
            <>
              <Link to="/home" className="nav-link" style={{ color: 'white' }}>Home</Link>
              <Link to="/about" className="nav-link" style={{ color: 'white' }}>About Us</Link>
              <Link to="/contact" className="nav-link" style={{ color: 'white' }}>Contact Us</Link>
              <Link to="/dashboard" className="nav-link" style={{ color: 'white' }}>Dashboard</Link>
              <Link to="/addaccount" className="nav-link" style={{ color: 'white' }}>Add Account</Link>
              <Link to="/chartsofaccount" className="nav-link" style={{ color: 'white' }}>Charts of Account</Link>
              <Link to="/generaljournal" className="nav-link" style={{ color: 'white' }}>Add Journal</Link>
              <Link to="/journals" className="nav-link" style={{ color: 'white' }}>View Journals</Link>
              <Link to="/trialbalance" className="nav-link" style={{ color: 'white' }}>Trial Balance</Link>
              <Link to="/profitloss" className="nav-link" style={{ color: 'white' }}>Profit/Loss</Link>
              <Link to="/balancesheet" className="nav-link" style={{ color: 'white' }}>Balance Sheet</Link>
              <Link to="/myprofile" className="nav-link" style={{ color: 'white' }}>My Profile</Link>
              <Link to="/companyprofile" className="nav-link" style={{ color: 'white' }}>Organization Profile</Link>
              <Link onClick={logoutUser} className="nav-link" style={{ color: 'white' }}>Sign Out</Link>
            </>
          ) : (
            <>
              <Link to="/home" className="nav-link" style={{ color: 'white' }}>Home</Link>
              <Link to="/about" className="nav-link" style={{ color: 'white' }}>About Us</Link>
              <Link to="/contact" className="nav-link" style={{ color: 'white' }}>Contact Us</Link>
              <Link to="/login" className="nav-link" style={{ color: 'white' }}>Sign In</Link>
              <Link to="/signup" className="nav-link" style={{ color: 'white' }}>Get Started</Link>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default CollapsibleMenu;
