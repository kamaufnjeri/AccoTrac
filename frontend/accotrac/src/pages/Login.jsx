import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UpperHeader from '../components/UpperHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { UserContext } from '../components/UserContext';
import axios from 'axios';

axios.defaults.withCredentials = true;
const Login = () => {
  // initialize variables to be used for login user
  const navigate = useNavigate();
  const { setUser, setCompany } = useContext(UserContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data) {
      try {
        // post the data to login user
        const response = await axios.post('http://localhost:5000/login', data);
        if (response && response.status === 200 && response.data) {
          const user = response.data.user;
          // set user and company componets on successfull login
          setUser(user);
          setCompany(user.selected_company);
          toast.success(`${response.data.message} ${user.email}`)
          navigate('/dashboard');
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Unknown error: ', error);
        }
        console.log(error);
      }
    }
    
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>AccoTrac</title>
      <link rel="shortcut icon" href="assets/images/logo.jpg" />
      <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="assets/css/fontawsom-all.min.css" />
      <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
      <Header />
      <div className="container-fluid ">
        <div className="slid-containerww bg-primary">
          <UpperHeader />
        </div>
        <div className="container ">
          <div className="row cdvfdfd">
            <div className="col-lg-10 col-md-12 login-box">
              <div className="row">
                <div className="col-lg-6 col-md-6 log-det">
                  <div className="small-logo">
                    <i className="fab fa-asymmetrik" />{" "}
                    <Link to="/home" style={{ color: "#007bff" }}>
                      AccoTrac
                    </Link>
                  </div>
                  <p className="dfmn">
                    Track, Manage, Thrive. Simplified finances for your business!
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="text-box-cont">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-user" />
                          </span>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          aria-label="Email Address"
                          aria-describedby="basic-addon1"
                          value={data.email}
                          onChange={(e) => setData({ ...data, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-lock" />
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="basic-addon1"
                          value={data.password}
                          onChange={(e) => setData({ ...data, password: e.target.value })}
                          required
                        />
                      </div>
                      <div className="input-group center">
                        <button className="btn btn-danger btn-round">SIGN IN</button>
                      </div>
                      <div className="row">
                        <p className="forget-p">
                          Don't have an account?{" "}
                          <span>
                            <Link className="signup" to="/signup">
                              Sign Up!
                            </Link>
                          </span>
                        </p>
                      </div>
                    </div>
                  </form>
                  <div className="forgot-password">
                    <p>
                      Forgot Password?
                      <Link to="/forgotpassword" className="forgot-link">
                        Click Here
                      </Link>
                    </p>
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
                      <Link href="#"></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
