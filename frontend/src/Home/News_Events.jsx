import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function News_Events() {

  const [news, setNews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const API_URL = "https://college-app-3.onrender.com/api/ganarelNotice/getNews";


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL);
        setNews(response.data); // Update images
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchNews();
  }, []);

  

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const displayedNews = showAll ? news : news.slice(0, 3); // Display either all news or just the first 4

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">News & Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedNews.map((news) => (
          <div key={news.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Thumbnail */}
            <img src={news.photo.url} alt={news.tital} className="w-auto h-auto object-contain rounded-lg shadow-lg" />
            {/* News Content */}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{news.tital}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {news.description.length > 60 ? `${news.description.substring(0, 60)}...` : news.description}
              </p>
              <Link
                    to="/news_events"
                    state={{ news }}
                      className="text-blue-500 hover:text-blue-700"
                       >
                      Read More
                   </Link>
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
          {showAll ? 'Show Less' : 'See All'}
        </button>
      </div>
    </div>
  );
}

export default News_Events;
