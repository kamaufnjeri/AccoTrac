import React from 'react';
import { Link } from 'react-router-dom';

const LowerHeader = ({ logoutUser, companyAccounts}) => {
  return (
    <div className="container">
    <div className="row ">
      <div className="slid-containerww ">
        <div id="menu" className="col-lg-12 d-none d-lg-block ">
          <ul className="float-end mul fs-7 text-white d-inline-block">
          <li className="float-md-start p-4">
              <Link className="text-white fw-bold" to="/mydashboard">
                My dashboard
              </Link>
            </li>
            <li className="float-md-start p-4">
              <Link className="text-white fw-bold" to="/accountledger">
                Create Account
              </Link>
            </li>
            <li className="float-md-start p-4">
              <Link className="text-white fw-bold" to="/accountledger">
                Charts of Account
              </Link>
            </li>
            <li className="float-md-start p-4">
              <Link className="text-white fw-bold" to="/accountledger">
                Add Stock Item
              </Link>
            </li>
            <li className="dropdown float-md-start p-4">
              <Link
                className="text-white fw-bold dropdown-toggle"
                to="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Recod Journals
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/purchasejournal">
                    Purchase Journal
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/salesjournal">
                    Sales Journal
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    General Journal
                  </Link>
                </li>
              </ul>
            </li>
            <li className="dropdown float-md-start p-4">
              <Link
                className="text-white fw-bold dropdown-toggle"
                to="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                View Reports
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="#">
                    Trial Balance
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Profit/Loss
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Balance Sheet
                  </Link>
                </li>
              </ul>
            </li>
            <li className="dropdown float-md-start p-4">
              <Link
                className="text-white fw-bold dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Profile
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/userprofile">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/userprofile">
                    Company Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={logoutUser}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LowerHeader
