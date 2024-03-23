import React from 'react';
import { Link } from 'react-router-dom';
import MenuItems from './MenuItems';


const UpperHeader = () => {
  return (
    <div className="inner">
      <div className="nav-col">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 d-flex align-items-center">
              <Link to="/home">
                <img className="max-230" src="assets/images/logo.png" alt="" />
              </Link>
              <Link
                data-bs-toggle="collapse"
                data-bs-target="#menu"
                className="float-end text-white d-lg-none pt-1 ps-3"
              >
                <i className="bi pt-1 fs-1 cp bi-list" />
              </Link>
            </div>
            <div id="menu" className="col-lg-9 d-none d-lg-block">
              <MenuItems/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperHeader;
