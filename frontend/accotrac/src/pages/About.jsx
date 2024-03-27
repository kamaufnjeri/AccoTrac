import React from 'react'
import MenuItems from '../components/MenuItems'
import Header from '../components/Header'
import Footer from '../components/Footer'

function about() {
  return (
    <div><>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>About</title>
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
                <a href="/home">
                  <img className="max-230" src="assets/images/logo.png" alt="" />
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#menu"
                  className="float-end text-white d-lg-none pt-1 ps-3"
                >
                  <i className="bi pt-1 fs-1 cp bi-list" />
                </a>
              </div>
              <div id="menu" className="col-lg-9 d-none d-lg-block">
                <MenuItems/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*  ************************* Page Title Starts Here ************************** */}
    <div className="page-nav no-margin row">
      <div className="container">
        <div className="row">
          <h2 className="text-start">About Us</h2>
          <ul>
            <li>
              {" "}
              <a href="/home">
                <i className="bi bi-house-door" /> Home
              </a>
            </li>
            <li>
              <i className="bi bi-chevron-double-right pe-2" />
              About Us
            </li>
          </ul>
        </div>
      </div>
    </div>
  <div className="service-section big-padding">
  <div className="container">
    <div className="section-title row">
      <h2>Features of AccoTrac</h2>
      <p>
      Below are the key Features of AccoTrac{" "}
      </p>
    </div>
    <div className="row">
      <div className="col-md-4 mb-3">
        <div className="row">
          <div className="col-2 align-self-center pe-0">
            <i className="bi fs-1 text-primary bi-currency-dollar" />
          </div>
          <div className="col-10">
            <h4 className="fs-6 fw-bold mt-3">Double Entry Accouting</h4>
            <p> Our accounting app is built on the foundation of double-entry accounting, a tried-and-tested method for ensuring accurate financial records. With double-entry accounting, every transaction is recorded twice, once as a debit and once as a credit, ensuring that your books always balance. This approach provides a clear and comprehensive view of your financial transactions, making it easier to identify errors and track your financial health with confidence.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="row">
          <div className="col-2 align-self-center pe-0">
            <i className="bi text-primary fs-1  bi-bar-chart-line" />
          </div>
          <div className="col-10">
            <h4 className="fs-6 fw-bold mt-3">Balance Sheet and Trial Balance Tracking</h4>
            <p>This financial app helps you monitor your business's health with automatic features. It tracks your trial balance, summarizing debits and credits for a real-time view of your finances. This helps you identify issues, track trends, and make informed decisions. The app also generates balance sheets to show your assets, liabilities, and equity. This lets you assess your financial stability and make strategic choices to grow your business.</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="row">
          <div className="col-2 align-self-center pe-0">
            <i className="bi text-primary fs-1 bi-calculator" />
          </div>
          <div className="col-10">
            <h4 className="fs-6 fw-bold mt-3">Profit &amp; Loss Statement</h4>
            <p>Gain valuable insights into your business's financial performance with our comprehensive profit and loss statement feature. Our app generates detailed reports that summarize your revenues, expenses, and net income over a specific period, allowing you to analyze your profitability and identify areas for improvement. Whether you're assessing the success of a marketing campaign or evaluating the impact of cost-cutting measures, our profit and loss statements provide the clarity you need to make informed decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    {/*####################### About US Starts Here ###################*/}
    <div className="container-fluid big-padding bg-white about-cover">
      <div className="container">
        <div className="row about-row">
          <div className="col-md-6 no-padding image">
            <img
              className="shadow bg-white p-2"
              src="assets/images/about.jpg"
              alt=""
            />
          </div>
          <div className="col-md-6 detail text-justify ps-4 ">
            <h2>About AccoTrac</h2>
            <p>
              AccoTrac is a web-based accounting application designed to simplify
              business finances for small and medium-sized enterprices. The
              application provides an affordable and user-friendly solution for
              managing accounts,recording transactions and generating financial
              reports. With AccoTrac,businesses can streamline their accounting
              processes,gain valuable insight into their financial performance and
              make informed decisions to drive growth and success.
            </p>
          </div>
        </div>
      </div>
    </div>
    {/*  ************************* Team Starts Here ************************** */}
    <div className="out-team container-fluid big-padding bg-gray">
      <div className="container">
        <div className="row section-title">
          <h2>Our Team</h2>
          <p>
            Our team is a group of dedicated professionals with expertise in
            project management, UI/UX design, full stack development and software
            engineering
          </p>
        </div>
        <div className="team-row row">
          <div className="col-md-3 mb-4">
            <div className="teamc shadow-md text-center bg-white p-2">
              <img src="assets/images/team/1.jpg" alt="" />
              <h4 className="fs-5 mt-3 fw-bolder mb-0">Florence Kamau</h4>
              <span className="fs-8">Backend Developer</span>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="teamc shadow-md text-center bg-white p-2">
              <img src="assets/images/team/2.jpg" alt="" />
              <h4 className="fs-5 mt-3 fw-bolder mb-0">Joel Muhoho</h4>
              <span className="fs-8">Backend Developer</span>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="teamc shadow-md text-center bg-white p-2">
              <img src="assets/images/team/3.jpg" alt="" />
              <h4 className="fs-5 mt-3 fw-bolder mb-0">Innocent Efe Akpoyibo</h4>
              <span className="fs-8">Frontend Developer</span>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="teamc shadow-md text-center bg-white p-2">
              <img src="assets/images/team/4.jpg" alt="" />
              <h4 className="fs-5 mt-3 fw-bolder mb-0">Micheal Olatunbosun</h4>
              <span className="fs-8">Frontend Developer</span>
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

export default about