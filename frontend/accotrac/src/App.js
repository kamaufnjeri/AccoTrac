import React, { useEffect, useState } from 'react'
import About from './pages/About'
import Contact from './pages/Contact'
import Forgotpassword from './pages/Forgotpassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddUserOrganization from './pages/AddUserOrganization'
import GeneralJournalPage from './pages/GeneralJournalPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import UserProvider from './components/UserContext'

function App() {
  return (
    <div>
      <UserProvider>
    <ToastContainer />
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
      <Route path='/addorganization' element={<AddUserOrganization/>}/>
      <Route path='/generaljournal' element={<GeneralJournalPage/>}/>
      <Route path='/forgotpassword' element={<Forgotpassword/>}/>
    </Routes>
    </BrowserRouter>
    </UserProvider>
    </div>
  )
}

export default App