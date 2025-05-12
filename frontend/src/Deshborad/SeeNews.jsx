import React, { useState } from "react";

function SeeNews() {
  const [newsData, setNewsData] = useState([
    { id: 1, thumbnail: "https://via.placeholder.com/150", title: "First News Title", details: "This is a brief detail about the first news.", link: "/news/1" },
    { id: 2, thumbnail: "https://via.placeholder.com/150", title: "Second News Title", details: "This is a brief detail about the second news.", link: "/news/2" },
    { id: 3, thumbnail: "https://via.placeholder.com/150", title: "Third News Title", details: "This is a brief detail about the third news.", link: "/news/3" },
    { id: 4, thumbnail: "https://via.placeholder.com/150", title: "Fourth News Title", details: "This is a brief detail about the fourth news.", link: "/news/4" },
    { id: 5, thumbnail: "https://via.placeholder.com/150", title: "Fifth News Title", details: "This is a brief detail about the fifth news.", link: "/news/5" },
    { id: 6, thumbnail: "https://via.placeholder.com/150", title: "Sixth News Title", details: "This is a brief detail about the sixth news.", link: "/news/6" },
  ]);

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this news?");
    if (!confirmed) return;

    try {
      const response = await fetch(`https://your-api-endpoint.com/news/${id}`, {
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
    }
  };

  const handleUpdate = async (id) => {
    const newTitle = prompt("Enter the new title for this news:");
    if (!newTitle) return;

    try {
      const response = await fetch(`https://your-api-endpoint.com/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });

      if (response.ok) {
        alert("News updated successfully!");
        // Update local state to reflect the updated news
        setNewsData(
          newsData.map((news) =>
            news.id === id ? { ...news, title: newTitle } : news
          )
        );
      } else {
        alert("Failed to update the news.");
      }
    } catch (error) {
      console.error("Error updating news:", error);
      alert("An error occurred while updating the news.");
    }
  };

  const displayedNews = showAll ? newsData : newsData.slice(0, 3);

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">News & Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedNews.map((news) => (
          <div key={news.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Thumbnail */}
            <img src={news.thumbnail} alt={news.title} className="w-full h-48 object-cover" />
            {/* News Content */}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{news.title}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {news.details.length > 60
                  ? `${news.details.substring(0, 60)}...`
                  : news.details}
              </p>
              <a href={news.link} className="text-blue-500 hover:underline font-semibold">
                Read More
              </a>
            </div>
            {/* Update and Delete Buttons */}
            <div className="flex justify-between p-4 border-t">
              <button
                onClick={() => handleUpdate(news.id)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(news.id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
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
