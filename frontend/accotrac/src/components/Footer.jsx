import React from 'react'

function Footer() {
  return (
    <div>
    <footer>
      <div className="inner">
        <div className="container">
          <div className="row">
            <div className="col-md-3 foot-about">
              <h4>About US</h4>
              <p>
                AccoTrac is a web-based accounting software built for small and
                medium businesses. It simplifies finances by offering an
                affordable and user-friendly way to manage accounts, track
                transactions, and generate reports. By using AccoTrac, businesses
                can save time, gain financial clarity, and make better decisions
                for growth.
              </p>
            </div>
            <div className="col-md-3 foot-post">
              <h4 />
            </div>
            <div className="col-md-3 foot-news">
              <h4>News Letter</h4>
              <p>
                AccoTrac Newsletter: Simplify Your Finances and Fuel Growth (March
                15, 2024): Conquer Tax Season with AccoTrac's Streamlined
                Reporting Tools!{" "}
              </p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control mb-0"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-primary" id="basic-addon2">
                    <i className="bi text-white bi-send" />
                  </span>
                </div>
              </div>
              <ul>
                <li>
                  <i className="bi bi-facebook" />
                </li>
                <li>
                  <i className="bi bi-twitter" />
                </li>
                <li>
                  <i className="bi bi-instagram" />
                </li>
                <li>
                  <i className="bi bi-linkedin" />
                </li>
                <li>
                  <i className="bi bi-pinterest" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div className="copy">
      <div className="container">
        <a href="#">
          2024 © All Rights Reserved | Designed and Developed by ALX Webstack
          Project Team
        </a>
        <span>
          <a href="">
            <i className="fab fa-github" />
          </a>
          <a href="">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="https://in.pinterest.com/prabnr/pins/">
            <i className="fab fa-pinterest-p" />
          </a>
          <a href="https://twitter.com/prabinraja89">
            <i className="fab fa-twitter" />
          </a>
          <a href="https://www.facebook.com/freewebtemplatesbysmarteye">
            <i className="fab fa-facebook-f" />
          </a>
        </span>
      </div>
    </div>
    </div>
  )
}

export default Footer