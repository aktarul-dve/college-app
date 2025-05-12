import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { CiMenuBurger } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import logo from '../assets/logo.jpg';
import { useAuth } from '../context/auth';


function Sidbar({ setComponent }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const [auth] = useAuth();


  const handleComponents=(value) =>{
    setComponent(value);
  }


  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transform transition-transform duration-300 z-30 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:relative sm:w-64`}
      >


        <Sidebar className="h-full bg-ban_bg"> 
          <div className="flex items-center justify-between p-4">
            {/* User Profile */}
            <div className="text-center">
              <img
                className="w-16 h-16 rounded-full"
                src={logo}
                alt="User"
              />
              <p className="font-semibold mt-2">{auth?.user?.name}</p>
            </div>
            
          </div>
          <Menu className="bg-yellow-50 text-black">
            <SubMenu  label="Ganarel Notice ">
              <MenuItem  className="text-black" onClick={()=>handleComponents("Ganaral Notice See All")}>See </MenuItem>
              <MenuItem className="text-black" onClick={()=>handleComponents("Ganarel Notice Create")}>Ganarel Notice Create  </MenuItem>
            </SubMenu>
            <SubMenu label="Main Notice ">
              <MenuItem  className="text-black" onClick={()=>handleComponents("See Main Notice")} >See All</MenuItem>
              <MenuItem className="text-black" onClick={()=>handleComponents("Main Notice Create")}>Notice Create </MenuItem>
            </SubMenu>
            <SubMenu label="About Us ">
              <MenuItem className="text-black" onClick={()=>handleComponents("See About_us")}>See About Us</MenuItem>
              <MenuItem className="text-black" onClick={()=>handleComponents("CreatAbout_us")}>Create About Us </MenuItem>
            </SubMenu>
            <SubMenu label="Prancipal ">
              <MenuItem className="text-black" onClick={()=>handleComponents("See Prencipla")}>See Prancipal</MenuItem>
              <MenuItem className="text-black" onClick={()=>handleComponents("CreatePancipla")}>Create Prancipal </MenuItem>
            </SubMenu>
            <SubMenu label="Albume ">
              <MenuItem className="text-black" onClick={()=>handleComponents("SeeAlbume")}>See Albume</MenuItem>
              <MenuItem className="text-black" onClick={()=>handleComponents("CreatAlbume")}>Create Albume </MenuItem>
            </SubMenu>
            <SubMenu label="News ">
              <MenuItem className="text-black" onClick={()=>handleComponents("SeeNews")}>See News</MenuItem>
              <MenuItem className="text-black" onClick={()=>handleComponents("CreateNews")}>Create News </MenuItem>
            </SubMenu>

            <SubMenu label="Teachers" >
            <MenuItem className="text-black" onClick={()=>handleComponents("Teachers")}>See Teachers</MenuItem>
            <MenuItem className="text-black" onClick={()=>handleComponents("CreateTeachers")}>Create Teachers</MenuItem>

            </SubMenu>

            <SubMenu label="Students" >
            <MenuItem className="text-black" onClick={()=>handleComponents("Students")}>See Students</MenuItem>
            <MenuItem className="text-black" onClick={()=>handleComponents("CreateStudents")}>Create Students</MenuItem>

            </SubMenu>

            <MenuItem className="text-black"  onClick={()=>handleComponents("Slider")}>Slider</MenuItem>

            
           

            {/* Logout Button */}
            <MenuItem className="text-red-500" onClick={() => alert("Logged out!")}>
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>

      {/* Background Overlay for Small Screens */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </>
  );
}

export default Sidbar;
