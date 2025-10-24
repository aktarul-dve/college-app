import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal"; // Modal import করা হয়েছে

// Modal এর জন্য root element সেট করতে হবে
Modal.setAppElement("#root");

function Slider() {
  const [images, setImages] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("https://college-app-3.onrender.com/api/ganarelNotice/getSlider");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const openUpdateModal = (image) => {
    setSelectedImage(image);
    setNewUrl(image.url);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const handleUpdate = async () => {
    if (!selectedImage) return;
    try {
      await axios.put(`/api/ganarelNotice/updateSlider/${selectedImage.id}`, {
        url: newUrl,
      });
      fetchImages();
      closeModal();
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/ganarelNotice/deleteSlider/${id}`);
      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Slider Photo</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.slice(0, showAll ? images.length : 4).map((image) => (
          <div key={image.id} className="relative p-2 border rounded-lg shadow-lg">
            <img src={image.photo.url} alt={`album ${image.id}`} className="w-full h-48 object-cover rounded-lg" />
            <div className="flex justify-between mt-2">
              <button
                onClick={() => openUpdateModal(image)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(image._id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-6 py-2 rounded"
        >
          {showAll ? "Show Less" : "See All"}
        </button>
      </div>

      {/* Update Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20" overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Update Image</h2>
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className="border p-2 w-full"
        />
        <div className="flex justify-end mt-4">
          <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
            Cancel
          </button>
          <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
            Update
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Slider;
