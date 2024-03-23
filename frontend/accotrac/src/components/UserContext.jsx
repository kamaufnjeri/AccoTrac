import React, { createContext, useState, useEffect } from 'react';
import RequestHandler from '../methods/HandleApiRequests';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [company, setCompany] = useState();
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await RequestHandler.handleGetRequest('/protected');
        setUser(response.response);
        setCompany(response.response.selected_company);
        setIsLoading(false); // Set loading state to false on success
      } catch (error) {
        setError(error); // Handle any errors
        setIsLoading(false); // Set loading state to false on error
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, error, company, setCompany }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
