import axios from "axios";
import React, { useEffect, useState } from "react";

function SeeNews() {
  const API_URL = "https://college-app-3.onrender.com/api/ganarelNotice/getNews";
  const [newsData, setNewsData] = useState([]);
  const [showAll, setShowAll] = useState(false);
   const [loadingId, setLoadingId] = useState(null);





  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log(response.data)
        setNewsData(response.data); // Update images
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this news?");
    if (!confirmed) return;
   setLoadingId(id);

    try {
      const response = await fetch(`https://college-app-3.onrender.com/api/ganarelNotice/deleteNews/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("News deleted successfully!");
        // Update local state to remove the deleted news
        setNewsData(newsData.filter((news) => news.id !== id));
      } else {
        alert("Failed to delete the news.");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("An error occurred while deleting the news.");
    } finally {
      setLoadingId(null); // ✅ লোডিং রিসেট
    }
  };

  

  const displayedNews = showAll ? newsData : newsData.slice(0, 3);

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">News & Events</h1>

      <div className="grid grid-cols-1  gap-6">
        {displayedNews.map((news) => (
          <div key={news._id} className="flex bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Thumbnail */}
            <img
              src={news.photo?.url}
              alt={news.tital}
              className="w-1/3 h-48 object-cover"
            />

            {/* Content */}
            <div className="w-2/3 flex flex-col justify-between p-4">
              <div>
                <h2 className="text-lg font-bold mb-2">{news.tital}</h2>
                <p className="text-sm text-gray-600 mb-4">
                  {news.description && news.description.length > 60
                    ? `${news.description.substring(0, 60)}...`
                    : news.description || "No description available."}
                </p>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleDelete(news._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  disabled={loadingId === news._id}
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
          </div>

        ))}
      </div>


      {/* "See All" or "Show Less" button */}
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

export default SeeNews;
