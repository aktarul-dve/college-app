import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../spinner";


export default function PrivateRoute(){
    const [ok,setOk] = useState(false);

    const [auth, setAuth] = useAuth();
    console.log("Token",auth.token)

    useEffect (()=>{
        const authCheck = async() =>{
            const res = await axios.get("/api/auth/user-auth",{
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