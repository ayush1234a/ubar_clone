import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CaptainSignup() {

   const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})
  
    const submitHandler = (e)=>{
      e.preventDefault();
      setUserData({
        fullName:{
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password
      })
      console.log(userData);
  
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
  
    }
  return (
    <div className='p-7 flex flex-col items-center justify-between h-screen'>
    <div>
    <img
        className="w-20 mb-2"
        src="https://imgs.search.brave.com/-Lb1Jpe7XMKo-eq6zHrSZZDns9nOfSkCCV1J-i5-eVs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bmljZXBuZy5jb20v/cG5nL2RldGFpbC8y/MjMtMjIzMzk0NV91/YmVyLWxvZ28tMDEt/dWJlci1sb2dvLWlu/LXdoaXRlLnBuZw"
        alt="Uber"
      />
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
        <div className='flex gap-4 mb-6'>
          <input
            required
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
         
          />
           <input
          required
          className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base'
          type="text"
          placeholder='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
         
        />
        </div>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input
          required
          className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type="email"
          placeholder='Email@example.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
         
        />

        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input
          className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          required
       
          type="password"
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg'>
          Singup
        </button>

        <p className='text-center'>
          Already have a account? <Link to='/captain-login' className='text-blue-600'>Login Hear</Link>
        </p>
      </form>
    </div>
    <div>
    <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
    </div>
  </div>
  )
}

export default CaptainSignup
