import React from 'react'
import MenuItems from '../components/MenuItems'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import CollapsibleMenu from '../components/CollapsibleMenu'

function contact() {
  return (
    <div><>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Contact US</title>
    <link rel="shortcut icon" href="assets/images/fav.png" type="image/x-icon" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <link rel="shortcut icon" href="assets/images/fav.jpg" />
    <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
    />
    <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
    <Header/>
    <div className="slid-containerww bg-primary">
      <div className="inner">
        <div className="nav-col">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 pt-2 pb-2 align-items-center">
                <Link to="/home">
                  <img className="max-230" src="assets/images/logo.png" alt="" />
                </Link>
              </div>
              <div id="menu" className="col-lg-9 d-none d-lg-block">
                <MenuItems/>
              </div>
              <Link
                    data-bs-toggle="collapse"
                    data-bs-target="#menu"
                    className="float-end text-white d-lg-none pt-1 ps-3"
                  >
                  
                    <CollapsibleMenu/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*  ************************* Page Title Starts Here ************************** */}
    <div className="page-nav no-margin row">
      <div className="container">
        <div className="row">
          <h2 className="text-start">Contact Us</h2>
          <ul>
            <li>
              {" "}
              <Link to="/home">
                <i className="bi bi-house-door" /> Home
              </Link>
            </li>
            <li>
              <i className="bi bi-chevron-double-right pe-2" />
              Contact Us
            </li>
          </ul>
        </div>
      </div>
    </div>
    {/*  ************************* Contact Us Starts Here ************************** */}
    <div style={{ marginTop: 0 }} className="row no-margin">
      {/* ******* I can later add something here ********** */}
    </div>
    <div className="row contact-rooo big-padding no-margin">
      <div className="container">
        <div className="row">
          <div style={{ padding: 20 }} className="col-sm-7">
            <h2 className="fs-4 fw-bold">Contact Form</h2> <br />
            <div className="row cont-row">
              <div className="col-sm-3">
                <label>Enter Name<span>:</span></label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  className="form-control input-sm"
                />
              </div>
            </div>
            <div className="row cont-row">
              <div className="col-sm-3">
                <label>Email Address<span>:</span></label>
                
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Email Address"
                  className="form-control input-sm"
                />
              </div>
            </div>
            <div className="row cont-row">
              <div className="col-sm-3">
                <label>Mobile Number<span>:</span></label>
                
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Mobile Number"
                  className="form-control input-sm"
                />
              </div>
            </div>
            <div className="row cont-row">
              <div className="col-sm-3">
                <label>Enter Message<span>:</span></label>
                
              </div>
              <div className="col-sm-8">
                <textarea
                  rows={5}
                  placeholder="Enter Your Message"
                  className="form-control input-sm"
                  defaultValue={""}
                />
              </div>
            </div>
            <div style={{ marginTop: 10 }} className="row">
              <div style={{ paddingTop: 10 }} className="col-sm-3">
                <label />
              </div>
              <div className="col-sm-8">
                <button className="btn btn-primary btn-sm">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*  ************************* Footer Starts Here ************************** */}
    <Footer/>
  </>
  </div>
  )
}

export default contact