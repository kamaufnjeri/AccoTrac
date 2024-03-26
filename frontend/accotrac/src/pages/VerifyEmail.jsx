import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UpperHeader from '../components/UpperHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import axios from 'axios';
import { UserContext } from '../components/UserContext';

axios.defaults.withCredentials = true;

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { setUser, setCompany } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/verifyemail/${token}`);
        if (response && response.status === 200 && response.data) {
            setMessage(response.data.message);
        
        const user = response.data.user;    
        navigate('/login');
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setMessage(error.response.data.message);
        } else {
          setMessage('Unknown error: ', error.message);
        }
        console.error(error);
      }
    };
    verifyEmail();
  }, [setUser, setCompany, navigate]);
    
  return (
    <>
      <div className="container-fluid">
        <Header />
        <div className="slid-containerww bg-primary">
          <UpperHeader />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card mt-5">
                <div className="card-body">
                  <h2 className="text-center mb-4">Verify Your Email</h2>
                  <div className="text-center mb-4">{message && <p>{message}</p>}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default VerifyEmail;
