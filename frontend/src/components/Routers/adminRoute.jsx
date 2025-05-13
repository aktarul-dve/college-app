import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../spinner";


export default function AdminRoute(){
    const [ok,setOk] = useState(false);

    const [auth, setAuth] = useAuth();
    console.log("Token",auth.token)

    useEffect (()=>{
        const authCheck = async() =>{
            const res = await axios.get("https://college-app-3.onrender.com/api/auth/admin-auth",{
                headers:{
                    Authorization: `Bearer ${auth?.token}`,
                },
            });

            if (res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            };
           
        };
        if(auth?.token) authCheck();
    }, [auth?.token]);
    return ok? <Outlet/> : <Spinner/>;
}