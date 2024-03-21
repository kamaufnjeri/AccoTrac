import React, { useState } from 'react';

function UserProfile() {
  const [userData, setUserData] = useState({
    name: '',
    organization: '',
    address: '',
    email: '',
  });

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('User data:', userData);
    // Implement logic to submit or save user data
  };

  return (
    <div className="user-profile">
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="organization">Organization:</label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={userData.organization}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={userData.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="save-button"><a href= "/dashboard" style={{color: "#fff"}}>
          Save
          </a>
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
