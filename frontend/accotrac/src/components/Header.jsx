import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <div className="hed-top bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-none d-lg-block">
              <ul className="text-dark fw-bold fs-8">
                <li className="float-start p-3">
                  <i className="bi bi-envelope" />   AccoTrac@outlook.com
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <ul className="text-dark float-end">
                <li className="float-start p-3">
                  <i className="bi bi-facebook" />
                  <a href="https://www.facebook.com/accotrac">
                  </a>
                </li>
                <li className="float-start p-3">
                  <i className="bi bi-twitter" />
                  <a href="https://www.twitter.com/accotrac"></a>
                </li>
                <li className="float-start p-3">
                  <i className="bi bi-linkedin" />
                  <a href="https://www.linkedin.com/accotrac">
                  </a>
                </li>
                <li className="float-start pt-2 ms-4">
                  <button className="btn fs-8 fw-bold btn-lights">
                    <a href="/contact">Get A Quote</a>
                  </button>
                </li>
                <li>
               
                </li>
              </ul>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header