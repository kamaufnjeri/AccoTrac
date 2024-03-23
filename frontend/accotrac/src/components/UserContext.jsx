import React, { createContext, useState, useEffect } from 'react';
import RequestHandler from '../methods/HandleApiRequests';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [company, setCompany] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true); 
        const response = await RequestHandler.handleGetRequest('/protected');
        setUser(response.response);
        setCompany(response.response.selected_company);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
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
