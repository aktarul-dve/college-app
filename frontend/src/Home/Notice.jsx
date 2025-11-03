import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimatedTitle from "../components/AnimatedTitle";
import { Link } from "react-router-dom";

function Notice() {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10; // প্রতি পেজে ১০টা notice

  useEffect(() => {
    axios
      .get("https://college-app-3.onrender.com/api/ganarelNotice/getAllMainNotice")
      .then((response) => setNotices(response.data))
      .catch((error) => console.error("Error fetching notices:", error));
  }, []);

  // বর্তমান পেজের ডেটা নির্ধারণ
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  const totalPages = Math.ceil(notices.length / noticesPerPage);

  const downloadImage = (notice) => {
    const link = document.createElement("a");
    link.href = notice.photo.url;
    link.download = `${notice.notic_datils || "notice"}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="px-4 py-6 bg-gray-100 text-gray-800">
      <AnimatedTitle />

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">SL No</th>
              <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentNotices.map((notice, index) => (
              <tr key={notice._id} className="bg-white hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {(currentPage - 1) * noticesPerPage + (index + 1)}
                </td>
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

        {/* Pagination Buttons */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notice;
