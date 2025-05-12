import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function register()  {

  const navigate = useNavigate();

  const [name, setName ]= useState("");
  const [email, setEmail ] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const hendelSubmit =async (e) =>{
    e.preventDefault();

   try {

    const res = await axios.post("https://college-app-3.onrender.com/api/auth/register" ,
      {name,email,password,phone,address}
    );
    if(res && res.data.success){
      alert(res.data.message)
      navigate("/login")
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
            <div className='font-semibold text-xl items-center text-center'>
              Cilli<span className='text-blue-500'>Blog</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">Register</h1>
  
           
  
            <div className='mb-4'>
              <input type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)}   className='w-full p-2 border rounded-md' />
            </div>
  
            <div className='mb-4'>
              <input type="email" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)}  className='w-full p-2 border rounded-md' />
            </div>
  
            <div className='mb-4'>
              <input type="number" placeholder='Your Number' value={phone} onChange={(e) => setPhone(e.target.value)}  className='w-full p-2 border rounded-md' />
            </div>
  
            <div className='mb-4'>
              <input type="password" placeholder='Your Password'value={password} onChange={(e) => setPassword(e.target.value)}  className='w-full p-2 border rounded-md' />
            </div>

            <div className='mb-4'>
              <input type="address" placeholder='Your Address' value={address} onChange={(e) => setAddress(e.target.value)}  className='w-full p-2 border rounded-md' />
            </div>
  
            <p className="text-center mb-4">
              Already registered?{" "}
              <Link to="/login" className="text-blue-600">Login Now</Link>
            </p>
  
            <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white">Register</button>
          </form>
        </div>
      </div>
    );
  }

export default register