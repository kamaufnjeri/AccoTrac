import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import UpperHeader from '../components/UpperHeader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext } from '../components/UserContext';

const Signup = () => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    company_name: ""
  });
  const { setUser, setCompany } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (confirmPassword !== data.password) {
      toast.error("The two passwords don't match")
    }

    else {
      try {
        const response = await axios.post('http://localhost:5000/createuser', data);

        if (response.status === 201) {
          if (response.data.result) {
            const user = response.data.result;
            toast.success(`Success creating account ${user.email}`);
            setUser(user);
            setCompany(user.selected_company);
            navigate(`/dashboard`);
          }
          if (response.data.message) {
            toast.error(response.data.message);
          }
        }
        else {
          toast.error(response.data.error);
        }
      } catch (error) {
          console.log("Error response:", error.response);
          if (error.response && error.response.data) {
            toast.error(error.response.data.error);
          } else {
            toast.error("Unexpected error creating company: " + error);
          }
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
      <title>Sign Up</title>
      <link rel="shortcut icon" href="assets/images/fav.jpg" />
      <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="assets/css/fontawsom-all.min.css" />
      <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
      <Header/>
      <div className="slid-containerww bg-primary">
     <UpperHeader />
      </div>
      <div className="container-fluid ">
        <div className="container ">
          <div className="row cdvfdfd">
            <div className="col-lg-10 col-md-12 login-box">
            
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6 col-md-6 log-det">
                    <div className="small-logo" href="/home">
                      <i className="fab fa-asymmetrik" /> AccoTrac
                    </div>
                    <p className="dfmn">
                      Track, Manage, Thrive. Simplified finances for your business!
                    </p>
                    <div className="text-box-cont">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-user" />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          aria-label="First Name"
                          aria-describedby="basic-addon1"
                          value={data.firstname}
                          onChange={(e) => setData({ ...data, firstname: e.target.value })}
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-user" />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          aria-label="Last Name"
                          aria-describedby="basic-addon1"
                          value={data.lastname}
                          onChange={(e) => setData({ ...data, lastname: e.target.value })}
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-building" />
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Organization Name"
                          aria-label="Organization Name"
                          aria-describedby="basic-addon1"
                          value={data.company_name}
                          onChange={(e) => setData({ ...data, company_name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-envelope" />
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
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-lock" />
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          aria-label="Confirm Password"
                          aria-describedby="basic-addon1"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group center">
                        <button type="submit" className="btn btn-danger btn-round">SIGN UP</button>
                      </div>
                      <div className="row">
                        <p className="forget-p">
                          Already have an account?{" "}
                          <span>
                            <Link className="signup" to="/login">
                              Sign In!
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
                        <Link to="#"></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Signup;
