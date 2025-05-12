import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Academic from "./pages/Academic";
import Deprtment from "./pages/Deprtment";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/register"
import Login from "./pages/login"
import UserDashboard from "./pages/user/Dasborad"
import About_College from "./Home/About_College";
import Notice from "./Home/Notice";

import GanarelNoticeCreate from "./Deshborad/GanarelNoticeCreate";
import UpdateGanaralNotice from "./Deshborad/UpdateGanaralNotice";
import { AuthProvider } from "./context/auth";
import PrivateRoute from "./components/Routers/privat";
import AdminRoute from "./components/Routers/adminRoute";
import Notice_View from "./pages/Notice_View";
import News_Events from "./pages/News_Events";

function Layout() {
  const location = useLocation();
  const [hideBanner, setHideBanner] = useState(false);
  const hideBannerNavbarFooter = location.pathname === "/dashboard";

  // Handle scroll event to hide Banner
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHideBanner(true);
      } else {
        setHideBanner(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Dynamic spacing for main content
  const topSpacing = hideBannerNavbarFooter
    ? "pt-0"
    : hideBanner
    ? "pt-[80px]"
    : "pt-[220px]";

  return (
    <div>
      {/* Banner */}
      {!hideBannerNavbarFooter && !hideBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 h-40 transition-all duration-300">
          <Banner />
        </div>
      )}

    

      {/* Navbar */}
      {!hideBannerNavbarFooter && (
        <div
          className={`fixed ${
            hideBanner ? "top-0" : "top-[150px]"
          } left-0 right-0 z-40 transition-all duration-300`}
        >
          <Navbar />
        </div>
      )}

      {/* Main Content */}
      <div className={`mt-0 ${topSpacing}`}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about_us" element={<About_College />} />
          <Route exact path="/deprtment" element={<Deprtment />} />
          <Route exact path="/notice" element={<Notice />} />
          <Route exact path="/academic" element={<Academic />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/notice_view" element={<Notice_View/>} />
          <Route exact path="/news_events" element={<News_Events/>} />
        
          <Route exact path="/dashboard" element={<PrivateRoute/>} >
          <Route exact path="user" element={<UserDashboard/>}/>
          </Route>

          <Route exact path="/dashboard" element={<AdminRoute/>}>
          <Route exact path="admin" element ={<Dashboard/>} />
          </Route>
          
          <Route esact path="/register" element={<Register/>}/>
          <Route esact path="/login" element={<Login/>}/>
          <Route exact  path="/GanarelNoticeCreate" element={<GanarelNoticeCreate />} />
          <Route exact path="/UpdateGanarlNotice" element={<UpdateGanaralNotice/>}/>
        </Routes>
      </div>

      {/* Footer */}
      {!hideBannerNavbarFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
   <AuthProvider>
     <BrowserRouter>
    
    <Layout />
   
     
   </BrowserRouter>
   

   </AuthProvider>
    
    
  );
}

export default App;
