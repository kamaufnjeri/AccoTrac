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
