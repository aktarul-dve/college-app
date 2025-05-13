import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimatedTitle from "../components/AnimatedTitle";
import { Link } from "react-router-dom";


function Notice() {
  const [notices, setNotices] = useState([]);
  

  // API থেকে ডাটা লোড করা
  useEffect(() => {
    axios
      .get("https://college-app-3.onrender.com/api/ganarelNotice/getAllMainNotice")
      .then((response) => setNotices(response.data))
      .catch((error) => console.error("Error fetching notices:", error));
  }, []);

  
  const downloadImage = (notice) => {
    const link = document.createElement('a');
    link.href = notice.photo.url;
    link.download = `${notice.notic_datils || 'notice'}.jpg`; // ফাইল নাম কাস্টম করা
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <div className="px-4 py-6 bg-gray-100 text-gray-800">
       <AnimatedTitle />

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice._id}>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(notice.date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{notice.notic_datils}</td>
              <td className="border border-gray-300 px-4 py-2">

                 <div className="flex flex-col items-center justify-center space-y-2">
                   
                    
                   <Link
                    to="/notice_view"
                    state={{ notice }}
                      className="text-blue-500 hover:text-blue-700"
                       >
                      View
                   </Link>

                   <button
                    onClick={() => downloadImage(notice)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded"
                     >
                      Download Now
                     </button>

                  </div>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Notice;
