import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true;
function ResetPassword() {
  const navigate = useNavigate()
  // access token from url to use to login user
  const { token } = useParams();
  // initialize data to be input by user as empty
  const [data, setData] = useState({
    password: '',
    confirm_password: ''
  })

  // submit the passwords input by user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://accotrac.joelmuhoho.tech/api/resetpassword/${token}`, data);
      if (response && response.status === 200 && response.data) {
        // on successful reset password
        toast.success(response.data.message);
        setData({
          password: '',
          confirm_password: ''
        })
        navigate('/login');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Unexpected error: ", error.message);
      }
      console.error(error);
    }
  };


  return (
    <div><>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Reset Password</title>
    <link rel="shortcut icon" href="assets/images/logo.jpg" />
    <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="assets/css/fontawsom-all.min.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
    <Header/>

    <div className="container-fluid ">
      <div className="container ">
        <div className="row">
          <div className="col-lg-10 col-md-12 login-box m-0 m-md-4">
            <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-md-6 log-det">
                <div className="small-logo">
                  <i className="fab fa-asymmetrik" /> Reset Password
                </div>
                <div className="text-box-cont">
                  <div className="input-group mb-3">
                    <div>
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
                    <div>
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
                  </div>
                  <div className="input-group center">
                  <button type="submit" className="btn btn-danger btn-round">
                      RESET PASSWORD
                    </button>
                  </div>
                  <div className="row">
                    <p className="forget-p">
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
              <div className="col-lg-6 col-md-6 box-de">
                <div className="inn-cover">
                  <div className="ditk-inf">
                    <div className="small-logo">
                      <i className="fab fa-asymmetrik" /> AccoTrac
                    </div>
                    <p>
                      AccoTrac is your one stop shop for managing your finances
                      and making your accounts healthy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  <Footer/>
  </div>
  );
}

export default ResetPassword;
