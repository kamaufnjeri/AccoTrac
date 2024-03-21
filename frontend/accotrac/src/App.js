import React from 'react'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Forgotpassword from './pages/Forgotpassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserProfile from './pages/UserProfile'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
    <Header />
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/forgotpassword' element={<Forgotpassword/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path= '/UserProfile' element={<UserProfile/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  )
}

export default App