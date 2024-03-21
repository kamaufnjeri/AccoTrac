import React from 'react'
import { Link } from 'react-router-dom'

const UpperHeader = () => {
  return (
    <div className="inner">
    <div className="nav-col">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 pt-2 pb-2 align-items-center">
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
            <ul className="float-end mul fs-7 text-white d-inline-block">
              <li className="float-md-start p-4">
                <Link className="text-white fw-bold" to="/home">
                  Home
                </Link>
              </li>
              <li className="float-md-start p-4">
                <Link className="text-white fw-bold" to="/about">
                  About US
                </Link>
              </li>
              <li className="float-md-start p-4">
                <Link className="text-white fw-bold" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="float-md-start p-4">
                <Link className="text-white fw-bold" to="/contact">
                  Contact US
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UpperHeader
