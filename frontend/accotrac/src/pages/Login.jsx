import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>AccoTrac</title>
      <link rel="shortcut icon" href="assets/images/fav.jpg" />
      <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="assets/css/fontawsom-all.min.css" />
      <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
      <div className="container-fluid ">
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
                        placeholder="Email Address"
                        aria-label="Email Address"
                        aria-describedby="basic-addon1"
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
                  <div className="forgot-password">
                    <p>
                      Forgot Password?
                      <Link href="/forgotpassword" className="forgot-link">
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
    </>
  );
};

export default Login;
