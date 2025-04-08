import React, { useState } from 'react';
import { Link } from 'react-router-dom';



 
  

function CaptainLogin() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const  [captainData, setCaptainData] = useState('')




  const submitHandler = (e)=>{
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password
    })
    console.log(captainData);
    setEmail('');
    setPassword('');
    
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
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input
          required
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          type="email"
          placeholder='Email@example.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder='password'
        />

        <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg'>
          Login
        </button>

        <p className='text-center'>
          join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a captain</Link>
        </p>
      </form>
    </div>
    <div>
      <Link to='/login' className='bg-[#dbe291] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg'>
        Sign in as User
      </Link>
    </div>
  </div>
  );
}


export default CaptainLogin;
