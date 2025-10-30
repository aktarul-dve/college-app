import axios from "axios";
import React, { useState, useEffect } from "react";

function SeeAlbum() {
  const [showAll, setShowAll] = useState(false);
  const [album, setAlbum] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // ✅ শুধু নির্দিষ্ট ইমেজের জন্য লোডিং
  
  const API_URL = "https://college-app-3.onrender.com/api/ganarelNotice/getAlbume";

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(API_URL);
        setAlbum(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this image?");
    if (!confirmed) return;
    setLoadingId(id); // ✅ লোডিং শুধু ওই ইমেজে দেখানো হবে

    try {
      const response = await fetch(
        `https://college-app-3.onrender.com/api/ganarelNotice/deleteAlbume/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Image deleted successfully!");
        setAlbum((prevAlbum) => prevAlbum.filter((image) => image._id !== id));
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
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Photo Album</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {album.slice(0, showAll ? album.length : 4).map((image) => (
          <div key={image._id} className="relative p-2 border rounded-lg shadow-lg">
            <img
              src={image.photo.url}
              alt={`album ${image._id}`}
              className="w-full h-30 object-cover rounded-lg"
            />
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleDelete(image._id)}
                className={`${
                  loadingId === image._id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                } text-white px-2 py-2 rounded`}
                disabled={loadingId === image._id}
              >
                {loadingId === image._id ? (
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
        ))}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={toggleShowAll}
          className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-6 py-2 rounded"
        >
          {showAll ? "Show Less" : "See All"}
        </button>
      </div>
    </div>
  );
}

export default SeeAlbum;
