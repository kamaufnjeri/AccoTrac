import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

function NewPassword() {
  return (
    <div><>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>New Password</title>
    <link rel="shortcut icon" href="assets/images/logo.jpg" />
    <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="assets/css/fontawsom-all.min.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
    <Header/>
    <div className="container-fluid ">
      <div className="container ">
        <div className="row cdvfdfd">
          <div className="col-lg-10 col-md-12 login-box">
            <div className="row">
              <div className="col-lg-6 col-md-6 log-det">
                <div className="small-logo">
                  <i className="fab fa-asymmetrik" /> New Password
                </div>
                <div className="text-box-cont">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-lock" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter New Password"
                      aria-label="Enter New Password"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <div className="text-box-cont">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-lock" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm New Password"
                      aria-label="Confirm New Password"
                      aria-describedby="basic-addon1"
                    />
                    </div>
                  </div>
                  <div className="input-group center">
                    <button className="btn btn-danger btn-round">
                      RESET PASSWORD
                    </button>
                  </div>
                  <div className="row">
                    <p className="forget-p">
                      To go back{" "}
                      <span>
                        <a className="signup" href="/home">
                          Click Here!
                        </a>
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
                    <a href="#"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  <Footer/>
  </div>
  )
}

export default NewPassword