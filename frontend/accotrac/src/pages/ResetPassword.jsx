import React from 'react'

const ResetPassword = () => {
  return (
    <div>
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
                      aria-label="Password"
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
                      placeholder="Confirm New Password"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <div className="input-group center">
                    <button className="btn btn-danger btn-round">
                      RESET PASSWORD
                    </button>
                  </div>
    </div>
  )
}

export default ResetPassword
