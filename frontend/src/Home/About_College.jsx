import axios from 'axios';
import React, { useState, useEffect } from 'react';

function About_College() {
  const [showFullText, setShowFullText] = useState(false);
  const [about_us, setAboutText] = useState(""); 
 const [photoData, setPhoto] = useState("");

  // Function to toggle the state
  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const fetchAboutUs = async () => {
    try {
      const { data } = await axios.get("https://college-app-3.onrender.com/api/ganarelNotice/getAboutUs", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setAboutText(data[0]?.about_us || "No content available");
    } catch (error) {
      console.error("Error fetching About Us data:", error);
    }
  };

 

  const getPrancipla = async () => {
    try {
      const { data } = await axios.get("https://college-app-3.onrender.com/api/ganarelNotice/GetPancipal", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data)
      if (Array.isArray(data) && data.length > 0) {
        setPhoto(data[0]); // ✅ যদি data অ্যারে হয়, তাহলে প্রথম আইটেম সেট করো
      } else {
        setPhoto(data); // ✅ যদি সরাসরি অবজেক্ট হয়
      }
    } catch (error) {
      console.error("Error fetching Photo:", error);
    }
  };


  useEffect(() => {
  
    fetchAboutUs();
    getPrancipla();
  }, []);

  return (
    <div className="px-4 py-6 bg-gray-100 text-gray-800">
      <h1 className="font-solaiman text-2xl font-bold text-center mb-4">
        নেকমরদ সরকারি কলেজ
      </h1>

      {/* গ্রিড লেআউট */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* টেক্সট কন্টেন্ট */}
        <div className="lg:col-span-2">
          {showFullText ? (
            <p>{about_us}</p>
          ) : (
            <p>{about_us.slice(0, 200)}...</p> // ২০০ অক্ষরের পর "..." দেখাবে
          )}

          {/* "Read More" or "Show Less" Button */}
          <div className="text-center mt-4">
            <button
              onClick={toggleText}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              {showFullText ? 'Show Less' : 'Read More'}
            </button>
          </div>
        </div>

        {/* ইমেজ কন্টেন্ট */}
        <div className="text-center">
        <div className="flex items-center justify-center mb-4">
        {photoData?.photo ? (
          <img src={photoData.photo.url} alt="Principal" className="w-32 h-32 " />
        ) : (
          <p>Loading image...</p>
        )}
      </div>

      {/* Name Section */}
      <div className="flex items-center justify-center mb-4">
        <p className="text-lg font-semibold">{photoData.name || "Loading name..."}</p>
      </div>
        </div>
      </div>
    </div>
  );
}

export default About_College;
