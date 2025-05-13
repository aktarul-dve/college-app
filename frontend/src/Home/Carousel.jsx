import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel CSS
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import axios from "axios";

function Carousel() {
  const [images, setImages] = useState([]);
  const API_URL = "https://college-app-3.onrender.com/api/ganarelNotice/getSlider";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(API_URL);
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <ResponsiveCarousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        transitionTime={800}
        showStatus={false}
        showArrows={true}
        swipeable
        emulateTouch
        dynamicHeight={false}
      >
        {images.length > 0 ? (
          images.map((img, index) => (
            <div key={index} className="relative h-64 md:h-96 overflow-hidden rounded-xl shadow-lg">
              <img
                src={img.photo.url}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white text-sm md:text-lg p-2 md:p-4 backdrop-blur-sm">
                Slide {index + 1}
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-lg">Loading...</p>
          </div>
        )}
      </ResponsiveCarousel>
    </div>
  </div>
  
  );
}

export default Carousel;
