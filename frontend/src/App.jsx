import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Userlogin from './pages/Userlogin'
import Home from './pages/home'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'

const App = () => {
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
