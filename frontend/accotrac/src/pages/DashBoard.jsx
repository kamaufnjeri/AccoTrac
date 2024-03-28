import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UpperHeader from '../components/UpperHeader';
import LowerHeader from '../components/LowerHeader';
import DashBoardBody from '../components/DashBoardBody';
import Footer from '../components/Footer';
import Header from '../components/Header';

axios.defaults.withCredentials = true

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProtectedData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/protected');
          if (response.status !== 200) {
            navigate("/");
          }
          // Handle the response as needed
        } catch (error) {
          if (error.response && error.response.data) {
            console.error('Error fetching protected data:', error.response.data);
    
          } else {
            console.error('Error fetching protected data:', error.message);
          }
          navigate('/');
        }
      };
  fetchProtectedData();
}, [navigate]);

  const logoutUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout');
      console.log(response.data);
      if (response.status === 200) {
        toast.success('Successfully logged out');
        navigate('/login'); // Redirect to login page after logout
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error('Error logging out: ' + error.response.data.error);
      } else {
        toast.error('Error logging out: ' + error.message);
      }
    }
  };

  return (
    <div><>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>Dashboard</title>
      <link rel="shortcut icon" href="assets/images/fav.png" type="image/x-icon" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <link rel="shortcut icon" href="assets/images/fav.jpg" />
      <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
      />
      <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
      <Header/>
      <div className="slid-containerww bg-primary">
     <UpperHeader />
      </div>
      <div className="slid-containerww bg-primary">
       <LowerHeader/>
      </div>
      <div className="container vh-100 d-flex flex-column overflow-scroll">
        <DashBoardBody/>
      </div>
      <Footer/>
    </>
    </div>
  )
}

export default Dashboard