import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from './UserContext';

const LowerHeader = () => {
  const { company, setCompany } = useContext(UserContext);

  return (
    <div className="container">
    <div className="row ">
      <div className="slid-containerww ">
        <div id="menu" className="col-lg-12 d-none d-lg-block ">
          <ul className="float-end mul fs-7 text-white d-inline-block">
          <li className="float-md-start p-4">
              <Link className="text-white fw-bold" to="/dashboard">
                Company {company?.name}
              </Link>
            </li>
          <li className="dropdown float-md-start p-4">
              <Link
                className="text-white fw-bold dropdown-toggle"
                to="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Accounts
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/purchasejournal">
                    Add Account
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/salesjournal">
                    Charts of Accounts
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
                Stocks
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/purchasejournal">
                    Add Item
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/salesjournal">
                    View Stock Entries
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
                  <Link className="dropdown-item" to="/generaljournal">
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
