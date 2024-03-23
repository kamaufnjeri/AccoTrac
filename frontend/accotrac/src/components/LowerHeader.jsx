import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const LowerHeader = () => {
  const { company } = useContext(UserContext);

  return (
    <div className="container">
    <div className="row ">
      <div className="slid-containerww ">
        <div id="menu" className="col-lg-12 d-none d-lg-block ">
          <ul className="float-end mul fs-7 text-white d-inline-block">
          <li className="float-md-start p-4">
              <Link className="text-white fw-bold" to="/dashboard">
                Organization {company?.name}
              </Link>
            </li>
              <li className="float-md-start p-4">
                <Link className="text-white fw-bold" to="/addaccount">
                  Add account
                </Link>
              </li>
            <li className='float-md-start p-4'>
                  <Link className="text-white fw-bold" to="/chartsofaccount">
                    Charts of Accounts
                  </Link>
                </li>
                <li className='float-md-start p-4'>
                  <Link className="text-white fw-bold" to="/generaljournal">
                   Add Journal
                  </Link>
                </li>
                <li className='float-md-start p-4'>
                  <Link className="text-white fw-bold" to="/journals">
                    View journals
                  </Link>
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
                  <Link className="dropdown-item" to="/addorganization">
                    Add organization
                  </Link>
                  <Link className="dropdown-item" to="/userprofile">
                    Change organization
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
