import React, { useState } from "react";

function SeeAlbum() {
  const images = [
    {
      id: 1,
      url: "https://ems-files.softbd.xyz/thakurgaongovtcollege/images/institute_img/principal.png",
    },
    {
      id: 2,
      url: "https://ems-files.softbd.xyz/thakurgaongovtcollege/images/institute_img/principal.png",
    },
    {
      id: 3,
      url: "https://ems-files.softbd.xyz/thakurgaongovtcollege/images/institute_img/principal.png",
    },
    {
      id: 5,
      url: "https://ems-files.softbd.xyz/thakurgaongovtcollege/images/institute_img/principal.png",
    },
    {
      id: 6,
      url: "https://ems-files.softbd.xyz/thakurgaongovtcollege/images/institute_img/principal.png",
    },
    {
      id: 7,
      url: "https://ems-files.softbd.xyz/thakurgaongovtcollege/images/institute_img/principal.png",
    },
    {
      id: 8,
      url: "https://ems-files.softbd.xyz/thakurgaongovtcollege/images/institute_img/principal.png",
    },
    {
      id: 9,
      url: "https://ems-files.softbd.xyz/thakurgaongovtcollege/images/institute_img/principal.png",
    },
  ];

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  // API call to delete an image
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this image?");
    if (!confirmed) return;

    try {
      const response = await fetch(`https://your-api-endpoint.com/images/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Image deleted successfully!");
        // You can update the local state here to remove the deleted image
      } else {
        alert("Failed to delete the image.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("An error occurred while deleting the image.");
    }
  };

  // API call to update an image
  const handleUpdate = async (id) => {
    const newUrl = prompt("Enter the new URL for this image:");
    if (!newUrl) return;

    try {
      const response = await fetch(`https://your-api-endpoint.com/images/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newUrl }),
      });

      if (response.ok) {
        alert("Image updated successfully!");
        // You can update the local state here to reflect the updated image
      } else {
        alert("Failed to update the image.");
      }
    } catch (error) {
      console.error("Error updating image:", error);
      alert("An error occurred while updating the image.");
    }
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Photo Album</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Display first 4 images or all images based on showAll state */}
        {images.slice(0, showAll ? images.length : 4).map((image) => (
          <div key={image.id} className="relative p-2 border rounded-lg shadow-lg">
            <img
              src={image.url}
              alt={`album ${image.id}`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleUpdate(image.id)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(image.id)}
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

export default SeeAlbum;
