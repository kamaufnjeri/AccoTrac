import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import UpperHeader from '../components/UpperHeader';


const Login = () => {
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (data) {
      try {
        const response = await axios.post('http://localhost:5000/login', data);
        console.log(response)
        if (response.status === 200) {
          if (response.data.result) {
            toast.success("Succcessfull logged in as " + response.data.result.name)
            if (!response.data.result.selected_organizaton) {
              navigate('/mydashboard');
            }
    
            navigate('/dashboard')
          }
          else if (response.data.message) {
            toast.error(response.data.message);
          }
          
        }
        
        else {
          throw new Error(response.data.error)
        }
        // You can perform additional actions here based on the response
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data)
          toast.error('Error Login in: ' + error.response.data.error)

        }
        else {
          toast.error('Error login in: ' + error)
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
      <title>AccoTrac</title>
      <link rel="shortcut icon" href="assets/images/fav.jpg" />
      <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="assets/css/fontawsom-all.min.css" />
      <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
     
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
