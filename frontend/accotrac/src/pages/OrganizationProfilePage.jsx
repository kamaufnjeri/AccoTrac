import React, { useEffect } from 'react'
import UpperHeader from '../components/UpperHeader'
import LowerHeader from '../components/LowerHeader'
import { useNavigate } from 'react-router-dom'
import UpdateOrganization from '../components/UpdateOrganization'
import Footer from '../components/Footer'
import Header from '../components/Header'
import fetchProtectedData from '../utils/protected';


const OrganizationProfilePage = () => {
    const navigate = useNavigate();

    // useEfect to ensure that user is authenticated to access this page
    useEffect(() => {
      fetchProtectedData();
    }, [navigate]);

  return (
    <div><>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Organization Profile</title>
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
   <UpperHeader />
    </div>
    <div className="slid-containerww bg-primary">
     <LowerHeader/>
    </div>
    <div className="container-fluid vh-100 d-flex flex-column overflow-scroll">
      <div class="container">
        <UpdateOrganization/>
      </div>
    </div>
    <Footer/>
  </>
  </div>
  )
}

export default OrganizationProfilePage
