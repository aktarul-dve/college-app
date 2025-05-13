import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimatedTitle from "../components/AnimatedTitle";
import { Link } from "react-router-dom";

function Notice() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get("https://college-app-3.onrender.com/api/ganarelNotice/getAllMainNotice")
      .then((response) => setNotices(response.data))
      .catch((error) => console.error("Error fetching notices:", error));
  }, []);

  const downloadImage = (notice) => {
    const link = document.createElement("a");
    link.href = notice.photo.url;
    link.download = `${notice.notic_datils || "notice"}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="px-4 py-6 bg-gray-100 text-gray-800">
      <AnimatedTitle />

      {/* Scrollable table container for mobile */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice._id} className="bg-white hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  {new Date(notice.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">{notice.notic_datils}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Link
                      to="/notice_view"
                      state={{ notice }}
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => downloadImage(notice)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                    >
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Notice;
