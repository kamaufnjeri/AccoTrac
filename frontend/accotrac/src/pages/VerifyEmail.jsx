import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/verifyemail/${token}`);
        if (response && response.status === 200 && response.data) {
          setMessage(response.data.message);

          setTimeout(() => {
            navigate('/login');
          }, 10000);
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
  }, [navigate, token, setMessage]);
    
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row">
        <div className="col-lg-8">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center mb-4">Email Verification</h2>
              <div className="text-center mb-4">
                {message && <h2 style={{ color: "blue", fontSize: '30px', fontWeight: '700' }}>{message}</h2>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
