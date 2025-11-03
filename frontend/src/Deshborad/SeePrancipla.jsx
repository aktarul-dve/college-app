import React, { useState, useEffect } from "react";
import axios from "axios";

function SeePrancipla() {
  const [photoData, setPhoto] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const getPrancipla = async () => {
    try {
      const { data } = await axios.get("https://college-app-3.onrender.com/api/ganarelNotice/GetPancipal", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (Array.isArray(data) && data.length > 0) {
        setPhoto(data[0]);
      } else {
        setPhoto(data);
      }
    } catch (error) {
      console.error("Error fetching Photo:", error);
    }
  };

  useEffect(() => {
    getPrancipla();
  }, []);

  

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this image?");
    if (!confirmed) return;
    setLoadingId(id); // ✅ লোডিং শুধু ওই ইমেজে দেখানো হবে

    try {
      const response = await fetch(
        `https://college-app-3.onrender.com/api/ganarelNotice/updatePancipal/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Image deleted successfully!");
        setPhoto((prevAlbum) => prevAlbum.filter((photoData) => photoData._id !== id));
      } else {
        alert("Failed to delete the image.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("An error occurred while deleting the image.");
    } finally {
      setLoadingId(null); // ✅ লোডিং রিসেট
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Principal</h1>
      <div className="text-center">
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md">
            {photoData?.photo ? (
              <>
                <img
                  src={photoData.photo.url}
                  alt="Principal"
                  className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover mb-3"
                />
                <p className="text-lg font-semibold text-gray-800">{photoData.name || "Loading name..."}</p>
                <p className="text-sm text-gray-600">{photoData.designation || "Loading designation..."}</p>
              </>
            ) : (
              <p>Loading image...</p>
            )}
          </div>
        </div>

      {/* Buttons Section */}
      <div className="flex justify-end max-w-sm mx-auto">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
           onClick={() => handleDelete(photoData._id)}
           disabled={loadingId === photoData._id}
        >
            {loadingId === photoData._id ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    Deleting...
                  </div>
                ) : (
                  "DELETE"
                )}
        </button>
      </div>
    </div>
  );
}

export default SeePrancipla;
