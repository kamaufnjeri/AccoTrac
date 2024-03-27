import React from 'react'
import About from './pages/About'
import Contact from './pages/Contact'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import GeneralJournalPage from './pages/GeneralJournalPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DashBoard from './pages/DashBoard'
import UserProvider from './components/UserContext'
import AddAccountPage from './pages/AddAccountPage'
import ChartsOfAccountPage from './pages/ChartsOfAccountPage'
import UserProfilePage from './pages/UserProfilePage'
import TrialBalancePage from './pages/TrialBalancePage'
import ProfitLossPage from './pages/ProfitLossPage'
import BalanceSheetPage from './pages/BalanceSheetPage'
import JournalEntriesPage from './pages/JournalEntriesPage'
import OrganizationProfilePage from './pages/OrganizationProfilePage'
import VerifyEmail from './pages/VerifyEmail'
import ResetPassword from './pages/ResetPassword'

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
      <Route path='/addaccount' element={<AddAccountPage/>}/>
      <Route path='/chartsofaccount' element={<ChartsOfAccountPage/>}/>
      <Route path='/generaljournal' element={<GeneralJournalPage/>}/>
      <Route path='/myprofile' element={<UserProfilePage/>}/>
      <Route path='/companyprofile' element={<OrganizationProfilePage/>}/>
      <Route path='/trialbalance' element={<TrialBalancePage/>}/>
      <Route path='/profitloss' element={<ProfitLossPage/>}/>
      <Route path='/balancesheet' element={<BalanceSheetPage/>}/>
      <Route path='/journals' element={<JournalEntriesPage/>}/>
      <Route path='/user/verifyemail/:token' element={<VerifyEmail/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/user/resetpassword/:token' element={<ResetPassword/>}/>
    </Routes>
    </BrowserRouter>
    </UserProvider>
    </div>
  )
}

export default App