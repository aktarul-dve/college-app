import React, { useState } from 'react';
import Sidbar from '../Deshborad/Sidbar';

import SeeGanralNotice from '../Deshborad/SeeGanralNotice';
import GanaralNoticeCreate from '../Deshborad/GanarelNoticeCreate';
import SeeMainNotice from '../Deshborad/SeeMainNotice';
import MainNoticeCreate from '../Deshborad/CreateNewNotice';
import SeeAbout_Us from '../Deshborad/SeeAbout_Us';
import CreateAbout_Us from '../Deshborad/CreateAbout_Us'
import SeePrancipla from '../Deshborad/SeePrancipla';
import CreatePancipla from '../Deshborad/CreatePancipla';
import SeeAlbume from '../Deshborad/SeeAlbume';
import CreatAlbume from '../Deshborad/CreateAlbume';
import SeeNews from '../Deshborad/SeeNews';
import CreateNews from '../Deshborad/CreateNews';
import Teachers from '../Deshborad/Teachers'
import Students from '../Deshborad/Students'
import CreateTeachers from '../Deshborad/CreateTeachers'
import CreateStudents from '../Deshborad/CreateStudents';
import Slider from '../Deshborad/Slider';
import Home from '../pages/Home';
import Admin_Dasborad from './Admin_Dasborad';

function Dashboard() {
  const [component, setComponent] = useState("Admin_Dasborad");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-70 bg-slate-300 overflow-y-auto h-full">
        <Sidbar setComponent={setComponent} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {component === "Ganaral Notice See All" ? (
          <SeeGanralNotice />
        ) : component === "Ganarel Notice Create" ? (
          <GanaralNoticeCreate />
        ) : component === "See Main Notice" ? (
          <SeeMainNotice />
        ) : component === "Main Notice Create" ? (
          <MainNoticeCreate />
        ) : component === "See About_us" ? (
          <SeeAbout_Us />
        ) : component === "CreatAbout_us" ? (
          <CreateAbout_Us />
        ) : component === "See Prencipla" ? (
          <SeePrancipla />
        ) : component === "CreatePancipla" ? (
          <CreatePancipla />
        ) : component === "SeeAlbume" ? (
          <SeeAlbume />
        ) : component === "CreatAlbume" ? (
          <CreatAlbume />
        ) : component === "SeeNews" ? (
          <SeeNews />
        ) : component === "CreateNews" ? (
          <CreateNews />
        ) : component === "Teachers" ? (
          <Teachers />
        ) : component === "Students" ? (
          <Students />
        ) : component === "CreateTeachers" ? (
          <CreateTeachers />
        ) : component === "CreateStudents" ? (
          <CreateStudents />
        ) : component === "Slider" ? (
          <Slider />
        ) : (
          <Admin_Dasborad />
        )}
      </div>
    </div>
  );
}




export default Dashboard;
