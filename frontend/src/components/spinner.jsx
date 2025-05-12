import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Spinner() {
    const [ count , setCount] = useState(5);
    const navigate = useNavigate();

    useEffect (()=> {
        const intarval = setInterval(()=>{
            setCount ((prevValue) => -- prevValue);
        },1000);
        count === 0 && navigate("/login");
        return ()=> clearInterval(intarval);
    },[count,navigate])
  return (
    <>
    <div className="d-flex flex-col justify-content-center">
        <h1 className="text-center" >Redirectin to you in {count} second</h1>
    <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
    </div>
    </div>

    </>
  )
}

export default Spinner