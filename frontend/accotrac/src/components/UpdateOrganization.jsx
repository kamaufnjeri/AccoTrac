import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true;

const UpdateOrganization = () => {
  const { setCompany, company } = useContext(UserContext);
  const [data, setData] = useState({}); // Initializing data with an empty object

  const currencies = ['Kshs', 'Naira'];
  const countries = ['Kenya', 'Nigeria'];

  useEffect(() => {
    // Check if company is defined before updating data
    if (company !== undefined) {
      setData(company);
    }
  }, [company]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      const response = await axios.put(`http://localhost:5000/company/${company.id}`, data);
      if (response.status === 200) {
        toast.success("Success updating company information");
        setData(response.data.response);
        setCompany(response.data.response);
        console.log('company',company);
      } else {
        console.log(response.data);
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response.data) {
        toast.error("Error updating company: " + error.response.data.message);
      } else {
        toast.error("Error updating: " + error);
      }
    }
  };

  return (
    <div>
      <h2>Organization details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="organizationName">Organization Name</label>
          <input
            type="text"
            className="form-control"
            id="OrgganizationName"
            value={data.name || ''}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="organizationEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="organizationEmail"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select
            className="form-control"
            id="currency"
            value={data.currency || ''}
            onChange={(e) => setData({ ...data, currency: e.target.value })}
          >
            <option value="">Select currency</option>

            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select
            className="form-control"
            id="country"
            value={data.country || ''}
            onChange={(e) => setData({ ...data, country: e.target.value })}
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateOrganization;
