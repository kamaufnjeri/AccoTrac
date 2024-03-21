import React from 'react'

function dashboard() {
  return (
    <div><>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Dashboard</title>
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
                <ul className="float-end mul fs-7 text-white d-inline-block">
                  <li className="float-md-start p-4">
                    <a className="text-white fw-bold" href="/home">
                      Home
                    </a>
                  </li>
                  <li className="float-md-start p-4">
                    <a className="text-white fw-bold" href="/about">
                      About US
                    </a>
                  </li>
                  <li className="float-md-start p-4">
                    <a className="text-white fw-bold" href="/dashboard">
                      Dashboard
                    </a>
                  </li>
                  <li className="float-md-start p-4">
                    <a className="text-white fw-bold" href="/contact">
                      Contact US
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="slid-containerww bg-primary">
      <div className="container">
        <div className="row ">
          <div className="slid-containerww ">
            <div id="menu" className="col-lg-12 d-none d-lg-block ">
              <ul className="float-end mul fs-7 text-white d-inline-block">
              <li className="dropdown float-md-start p-4">
                  <a
                    className="text-white fw-bold dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Profile
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/userprofile">
                        My Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/home">
                        Sign Out
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="float-md-start p-4">
                  <a className="text-white fw-bold" href="/accountledger">
                    Create Account
                  </a>
                </li>
                <li className="dropdown float-md-start p-4">
                  <a
                    className="text-white fw-bold dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Charts of Account
                  </a>
                  <ul className="dropdown-menu">
                  <li className="dropdown-item">
                      Assets
                      <ul className="dropdown-subitem">  
                        <a className="dropdown-item" href='#'>Accounts Receivable</a>
                        <a className="dropdown-item" href='#'>Others</a>
                      </ul>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/salesjournal">
                        Expenses
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Revenue
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Capital
                      </a>
                    </li>
                    <li className="dropdown-item">
                      Liability
                      <ul className="dropdown-subitem">  
                        <a className="dropdown-item" href='#'>Accounts Payable</a>
                        <a className="dropdown-item" href='#'>Others</a>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="float-md-start p-4">
                  <a className="text-white fw-bold" href="/accountledger">
                    Add Stock Item
                  </a>
                </li>
                <li className="dropdown float-md-start p-4">
                  <a
                    className="text-white fw-bold dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Recod Journals
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/purchasejournal">
                        Purchase Journal
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/salesjournal">
                        Sales Journal
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        General Journal
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dropdown float-md-start p-4">
                  <a
                    className="text-white fw-bold dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    View Reports
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Trial Balance
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Profit/Loss
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Balance Sheet
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid vh-100 d-flex flex-column">
        <main className="row flex-grow-1 overflow-auto">
          <div className="col-md-6 p-4">
            <div className="card rounded border shadow-sm">
              <div className="card-header bg-primary text-white fw-bold">
                Financial Summary
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="card rounded border border-primary text-center">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-cart-plus" /> Income
                      </h5>
                      <canvas id="chartjs-pie" width={500} height={200} />
                      <p className="h2 mb-0">$10,000</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card rounded border border-primary text-center">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-cash-coin" /> Expenses
                      </h5>
                      <canvas id="chartjs-pie" width={500} height={200} />
                      <p className="h2 mb-0">$15,000</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card rounded border border-primary text-center">
                    <div className="card-body">
                      <h5 className="card-title">
                        <i className="bi bi-graph-up" /> Net Profit
                      </h5>
                      <canvas id="chartjs-line" width={400} height={200} />
                      <p className="h2 mb-0">$5,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className="col-md-6 p-4">
          <div className="card rounded border shadow-sm">
            <div className="card-header bg-primary text-white fw-bold">
              Accounts Payabla/Receivale
            </div>
            <div className="card-body">
              <p>
                <a href="#">Account Payable</a> |<a href="#">Account Receivable</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </>
  </div>
  )
}

export default dashboard