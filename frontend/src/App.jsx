import React, { useContext } from 'react'
import {Route, Routes } from 'react-router-dom'
import Userlogin from './pages/Userlogin'
import Home from './pages/home'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import { UserDataContext } from './context/userContext'


const App = () => {

  const ans = useContext(UserDataContext)

  console.log(ans)

  return ( 
    <div>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        </Routes>
    </div>
  )
}

export default App
