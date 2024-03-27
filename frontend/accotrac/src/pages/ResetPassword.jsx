import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true;
function ResetPassword() {
  const { token } = useParams();
  const [data, setData] = useState({
    password: '',
    confirm_password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      const response = await axios.put(`http://localhost:5000/resetpassword/${token}`, data);
      if (response && response.status === 200 && response.data) {
        toast.success(response.data.message);
        setData({
          password: '',
          confirm_password: ''
        })
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Unxepected error: ", error.message);
      }
      console.error(error);
    }
  };


  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-md-12 login-box">
            <div className="row">
              <div className="col-lg-6 col-md-6 log-det">
                <div className="small-logo text-center mb-4">
                  <i className="fab fa-asymmetrik" /> Enter New Password
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="text-box-cont m-2">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter New Password"
                      aria-label="Enter New Password"
                      aria-describedby="basic-addon1"
                      value={data.password}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="text-box-cont m-2">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm New Password"
                      aria-label="Confirm New Password"
                      aria-describedby="basic-addon2"
                      value={data.confirm_password}
                      onChange={(e) => setData({ ...data, confirm_password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="input-group d-flex justify-content-center m-2">
                    <button type="submit" className="btn btn-danger btn-round">
                      RESET PASSWORD
                    </button>
                  </div>
                </form> {/* Move the closing tag here */}
                <div className="row mt-3">
                  <p className="forget-p text-center">
                    To go back{" "}
                    <span>
                      <Link className="signup" to="/login">
                        Click Here!
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
