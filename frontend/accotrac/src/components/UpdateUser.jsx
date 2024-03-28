import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import axios from 'axios';
import { toast } from 'react-toastify';


axios.defaults.withCredentials = true;
const UpdateUser = () => {
  // initialize data or get data needed for updating user info
    const { user, setUser } = useContext(UserContext);
    const [data, setData] = useState({});

    // using use Effect to set data depending on the user from UserContext
    useEffect(() => {
        if (user !== undefined) {
            setData(user);
        }
    }, [user])

    // submitting date on user that has been input for changing
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:5000/user/${user.id}`, data);
          console.log(response)
          if (response.status === 200) {
            toast.success("Success updating user information");
            setData(response.data);
            setUser(response.data);
            console.log('user',user);
          } else {
            console.log(response.data);
            throw new Error(response.data.message)
          }
        } catch (error) {
          console.log(error)
          if (error.response.data) {
            toast.error("Error updating user: " + error.response.data.message);
          }
          else {
            toast.error("Error updating: " + error);
          }
          setData(user);
        }
      };
  return (
    <div>
      <h2>User details</h2>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
            type="text"
            class="form-control"
            id="firstName"
            value={data.firstname}
            onChange={(e) => setData({...data, firstname: e.target.value})}
            />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
            type="text"
            class="form-control"
            id="lastName"
            value={data.lastname}
            onChange={(e) => setData({...data, lastname: e.target.value})}
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
            type="email"
            class="form-control"
            id="email"
            value={data.email}
            onChange={(e) => setData({...data, email: e.target.value})}
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default UpdateUser
