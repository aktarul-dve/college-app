import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/auth';

function login()  {

  const navigate = useNavigate();
  const [email, setEmail ] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  
  const hendelSubmit =async (e) =>{
    e.preventDefault();

   try {

    const res = await axios.post("https://college-app-3.onrender.com/api/auth/login" ,
      {email,password}
    );
    if(res && res.data.success){
      alert(res.data.message)
      navigate("/")
      setAuth({
        ...auth,
        user: res.data.user,
        token: res.data.token
      });
      localStorage.setItem("auth",JSON.stringify(res.data));
    }else{
      alert(res.data.message)

    }

   } catch (error) {
    console.log(error)
    alert("Samthing went wrong")
    
   }

  }

    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={hendelSubmit}>
            
            <h1 className="text-xl font-semibold mb-6">Login</h1>

            <div className='mb-4'>
              <input type="email" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)}  className='w-full p-2 border rounded-md' />
            </div>

            <div className='mb-4'>
              <input type="password" placeholder='Your Password'value={password} onChange={(e) => setPassword(e.target.value)}  className='w-full p-2 border rounded-md' />
            </div>

            <p className="text-center mb-4">
              Not registered?{" "}
              <Link to="/register" className="text-blue-600">Register Now</Link>
            </p>
  
            <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white">Login</button>
          </form>
        </div>
      </div>
    );
  }

export default login