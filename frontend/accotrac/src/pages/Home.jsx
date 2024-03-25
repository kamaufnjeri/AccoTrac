import React from 'react'
import { Link } from 'react-router-dom'
import MenuItems from '../components/MenuItems'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <>
      <meta charSet="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />
  <title>AccoTrac</title>
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
  <div className="slid-container">
    <div className="inner-lay">
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
      <div className="slidcont py-5">
        <div className="container pt-4">
          <div className="row">
            <div className="col-md-7 align-self-center pe-5">
              <h1 className="text-white dfr fw-bold fs-1">
                Track, Manage, Thrive. Simplified finances For your business!
              </h1>
              <p className="slogan">
                AccoTrac is your one stop shop For managing your finances and
                making your accounts healthy.
              </p>
              <div className=" d-inline-block pt-4">
                <Link to="/signup">
               
                <button className="btn btn-light shadow-md p-3 px-5 fs-7 fw-bold">
                Get started
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="service-section big-padding">
  <div className="container">
    <div className="section-title row">
      <h2>Features</h2>
      <p>
        Below are the key Features of AccoTrac {" "}
      </p>
    </div>
    <div className="row">
      <div className="col-md-4 mb-3">
        <div className="row">
          <div className="col-2 align-self-center pe-0">
            <i className="bi fs-1 text-primary bi-currency-dollar" />
          </div>
          <div className="col-10">
            <h4 className="fs-6 fw-bold mt-3">Account Tracking</h4>
            <p>/*You can write the description here.*/</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="row">
          <div className="col-2 align-self-center pe-0">
            <i className="bi text-primary fs-1  bi-bar-chart-line" />
          </div>
          <div className="col-10">
            <h4 className="fs-6 fw-bold mt-3">Account Planning</h4>
            <p>/*You can write the description here.*/</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="row">
          <div className="col-2 align-self-center pe-0">
            <i className="bi text-primary fs-1 bi-calculator" />
          </div>
          <div className="col-10">
            <h4 className="fs-6 fw-bold mt-3">Taxes &amp; Efficiency</h4>
            <p>/*You can write the description here.*/</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</>
  <div className="service-section big-padding">
    <div className="out-team container-fluid big-padding bg-gray">
      <div className="container">
        <div className="row section-title">
          <h2>Our Team</h2>
          <p>
            Our team is a group of dedicated professionals with expertise in
            project management, UI/UX design, full stack development and
            software engineering
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
              <h4 className="fs-5 mt-3 fw-bolder mb-0">
                Innocent Efe Akpoyibo
              </h4>
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
              AccoTrac is a web-based accounting application designed to
              simplify business finances for small and medium-sized enterprices.
              The application provides an affordable and user-friendly solution
              for managing accounts,recording transactions and generating
              financial reports. With AccoTrac,businesses can streamline their
              accounting processes,gain valuable insight into their financial
              performance and make informed decisions to drive growth and
              success.
            </p>
          </div>
        </div>
      </div>
    </div>
    <>
    <div id="testimonial" className="service bg-gray container-fluid px-4 py-5">
      <div className="container">
        <div className="section-title row mb-3">
          <h2 className="fw-bolder">Testimonial</h2>
          <p>
            Dive into real-world success stories through our user testimonials
          </p>
        </div>
        <div className="row mt-5">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="serv-cove shadow-md rounded bg-white p-3">
              <div className="prf row mb-3">
                <div className="col-3">
                  <img
                    className="rounded-pill"
                    src="assets/images/testimonial/member-01.jpg"
                    alt=""
                  />
                </div>
                <div className="col-9 align-self-center">
                  <h6 className="mb-0 fw-bolder">Eze Jones</h6>
                  <span>Owner - Sweet Serenity Bakery</span>
                </div>
              </div>
              <div className="det text-center">
                <p className="fs-7 fst-italic">
                  "AccoTrac has been a game-changer for my bakery. Before,
                  managing finances was a time-consuming nightmare. Now,
                  everything is so much simpler. Transactions are recorded
                  automatically, reports are generated with a few clicks, and
                  tax season is a breeze. AccoTrac's user-friendly interface
                  makes it easy for even someone with no accounting background
                  like me to stay on top of things. I can finally focus on what
                  I love - baking delicious treats - instead of stressing about
                  numbers."{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="serv-cove shadow-md rounded bg-white p-3">
              <div className="prf row mb-3">
                <div className="col-3">
                  <img
                    className="rounded-pill"
                    src="assets/images/testimonial/member-03.jpg"
                    alt=""
                  />
                </div>
                <div className="col-9 align-self-center">
                  <h6 className="mb-0 fw-bolder">Daniel Lukonga</h6>
                  <span>Marketing Manager</span>
                </div>
              </div>
              <div className="det text-center">
                <p className="fs-7 fst-italic">
                  "As the marketing manager for a growing tech startup,
                  understanding our financial performance is crucial. AccoTrac's
                  insightful dashboards and reports give us a clear view of our
                  spending habits, profitability margins, and key financial
                  metrics. This data empowers us to make data-driven decisions
                  about marketing campaigns, resource allocation, and future
                  investments. AccoTrac has become an essential tool for our
                  financial transparency and strategic planning."{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="serv-cove shadow-md rounded bg-white p-3">
              <div className="prf row mb-3">
                <div className="col-3">
                  <img
                    className="rounded-pill"
                    src="assets/images/testimonial/member-02.jpg"
                    alt=""
                  />
                </div>
                <div className="col-9 align-self-center">
                  <h6 className="mb-0 fw-bolder">Racheal Oladipo</h6>
                  <span>CEO - Rolufunmi Stitches</span>
                </div>
              </div>
              <div className="det text-center">
                <p className="fs-7 fst-italic">
                  "Since launching my fashion design business, AccoTrac has been
                  my trusted financial partner. The software scales perfectly
                  with my growing client base. I can easily manage multiple
                  projects, track invoices and payments, and generate
                  professional reports for my clients. Whenever I've had
                  questions, AccoTrac's customer support team has been
                  incredibly helpful and responsive. Their dedication to user
                  satisfaction gives me peace of mind knowing I have a reliable
                  system in place to support my financial needs as my business
                  expands."{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </>
  </div>
  )
}
export default Home

