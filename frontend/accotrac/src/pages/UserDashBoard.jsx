import React, { useEffect } from 'react'
import UserLowerHeader from '../components/UserLowerHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import UpperHeader from '../components/UpperHeader';
import UserDashBoardBody from '../components/UserDashBoardBody';

const UserDashBoard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchProtectedData();
  }, []);
  const fetchProtectedData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/protected');
      if (response.status !== 200) {
        navigate("/signin");
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
    <div className="slid-containerww bg-primary">
   <UpperHeader/>
    </div>
    <div className="slid-containerww bg-primary">
    <UserLowerHeader logoutUser={logoutUser} />
    </div>
    <div className="container-fluid vh-100 d-flex flex-column">
      <UserDashBoardBody/>
    </div>
  </>
  </div>
)
}

export default UserDashBoard
