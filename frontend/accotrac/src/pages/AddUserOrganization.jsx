import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddUserOrganization() {
  const [data, setData] = useState({
    company_name: '',
  });
  const navigate = useNavigate();

  const handleChange = (event, key) => {
    setData({ ...data, [key]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/createcompany", data);
      console.log(response);
      if (response.status === 201 && response.data) {
       
        toast.success(response.data.message);
        navigate("/dashboard");
      }
      else if (response.data) {
        toast.error(response.data.message);
      }
      else {
        throw new Error(response);
      }
    } catch (error) {
      console.log("Error response:", error.response);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unexpected error creating company: " + error);
      }
    }
  };

  return (
    <div className="user-profile">
      <h2>Add Company</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="organization">Organization name:</label>
          <input
            type="text"
            id="organization"
            name="company_name"
            value={data.company_name}
            onChange={(e) => handleChange(e, 'company_name')}
          />
        </div>
       
        <button type="submit" className="save-button">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddUserOrganization;
