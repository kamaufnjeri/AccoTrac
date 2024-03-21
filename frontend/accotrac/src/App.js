import React, { useEffect, useState } from 'react'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Forgotpassword from './pages/Forgotpassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddUserOrganization from './pages/AddUserOrganization'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios'
import UserDashBoard from './pages/UserDashBoard'


function App() {
  return (
    <div>
      
    <Header />
    <ToastContainer />
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='mydashboard' element={<UserDashBoard/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/forgotpassword' element={<Forgotpassword/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/addorganization' element={<AddUserOrganization/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  )
}

export default App