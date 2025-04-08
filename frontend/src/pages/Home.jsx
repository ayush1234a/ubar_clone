import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1538563188159-070c4db2bc65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ3fHx8ZW58MHx8fHx8)] h-screen pt-8  flex items-between flex-col w-full">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber"  className="w-16 ml-8"  />
             <div className="bg-white pb-7 flex flex-col mt-auto   py-4 px-10" >
                <h2 className="text-[20px] font-semibold ">Get Started with Uber</h2>
                <Link to='/login' className="flex items-center justify-center rounded-lg bg-black text-white py-2 px-4 rounded mt-5">Continue</Link>
             </div> 
        </div>
    </div>
  )
}

export default Home
