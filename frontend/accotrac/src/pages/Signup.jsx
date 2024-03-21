import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data)
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
                          onChange={(e) => setData({...data, firstname: e.target.value})}
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
                          onChange={(e) => setData({...data, lastname: e.target.value})}
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
                          onChange={(e) => setData({...data, email: e.target.value})}
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
                          onChange={(e) => setData({...data, password: e.target.value})}
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
    </>
  );
};

export default Signup;
