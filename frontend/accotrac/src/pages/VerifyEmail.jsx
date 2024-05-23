import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../utils/settings';


axios.defaults.withCredentials = true;
/**
 * VerifyEmail component is responsible for verifying the email address of a user.
 *
 * @return {JSX.Element} The JSX element representing the VerifyEmail component.
 */
const VerifyEmail = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  // get token from the url
  const { token } = useParams();

  // verify email component
  // using useEffect to verify email on the backend
  useEffect(() => {
    /**
     * Verifies the user's email by making an HTTP GET request to the backend API.
     * If the request is successful, sets the message state with the response data message and
     * navigates to the '/login' route after a delay of 1 second.
     * If the request fails, throws an error with the response data message.
     * If there is an error other than a failed request, sets the message state with an error message
     * and logs the error to the console.
     *
     * @return {Promise<void>} - A promise that resolves when the verification is complete.
     */
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/verifyemail/${token}`);
        if (response && response.status === 200 && response.data) {
          setMessage(response.data.message);

          setTimeout(() => {
            navigate('/login');
          }, 1000);
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
   <main className="d-flex flex-column min-vh-100 justify-content-center align-items-center bg-light">
      <div className="mx-auto w-full max-w-md p-4 space-y-6 rounded-lg bg-white shadow-lg">
        <div className="text-center space-y-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h1 className="text-lg font-bold">Verifying Email</h1>
          <p className="text-muted">Please wait while we verify your email address.</p>
          <p>{message}</p>
        </div>
      </div>
    </main>
  );
};

export default VerifyEmail;