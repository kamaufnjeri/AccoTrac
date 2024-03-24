import React, { useContext, useEffect, useState } from 'react';
import GeneralJournal from '../components/GeneralJournal';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import LowerHeader from '../components/LowerHeader';
import UpperHeader from '../components/UpperHeader';

const GeneralJournalPage = () => {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);


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
     <UpperHeader />
      </div>
      <div className="slid-containerww bg-primary">
       <LowerHeader/>
      </div>
      <div className="container col-md-9 vh-100 d-flex flex-column">
        <GeneralJournal/>
      </div>
    </>
    </div>
  );
};

export default GeneralJournalPage;