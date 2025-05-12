import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Albums() {

  const [album , setAlbum] = useState([]);
  const API_URL = "/api/ganarelNotice/getAlbume";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(API_URL);
        setAlbum(response.data); // Update images
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);



 

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);  // Toggle the showAll state
  };

  const downloadImage = (image) => {
    const link = document.createElement('a');
    link.href = image.photo.url;
    link.download = "Image.jpg"; // ফাইল নাম কাস্টম করা
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Photo Album</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Display first 4 images or all images based on showAll state */}
        {album.slice(0, showAll ? album.length : 4).map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.photo.url}
              alt={`album ${index}`}
              onClick={() => downloadImage(image)}
              className="w-auto h-auto object-contain rounded-lg shadow-lg"
            />
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

export default Albums;
