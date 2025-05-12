import React, { useState, useEffect } from "react";
import axios from "axios";

function SeePrancipla() {
  const [photoData, setPhoto] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPhoto, setUpdatedPhoto] = useState(null);

  const getPrancipla = async () => {
    try {
      const { data } = await axios.get("/api/ganarelNotice/GetPancipal", {
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

  const handleUpdate = () => {
    setUpdatedName(photoData.name);
    setIsModalOpen(true);
  };

  const updatePrincipal = async () => {
    try {
      const formData = new FormData();
      formData.append("name", updatedName);
      if (updatedPhoto) {
        formData.append("photo", updatedPhoto);
      }

      await axios.put(`/api/ganarelNotice/updatePancipal/${photoData._id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Principal updated successfully!");
      setIsModalOpen(false);
      getPrancipla();
    } catch (error) {
      console.error("Error updating principal:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Principal</h1>

      {/* Image Section */}
      <div className="flex items-center justify-center mb-4">
        {photoData?.photo ? (
          <img src={photoData.photo.url} alt="Principal" className="w-32 h-32 rounded-full" />
        ) : (
          <p>Loading image...</p>
        )}
      </div>

      {/* Name Section */}
      <div className="flex items-center justify-center mb-4">
        <p className="text-lg font-semibold">{photoData.name || "Loading name..."}</p>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-between max-w-sm mx-auto">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => alert("Delete button clicked")}
        >
          Delete
        </button>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Update Principal</h2>

            {/* Name Input */}
            <input
              type="text"
              className="border p-2 w-full mb-2"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              placeholder="Enter new name"
            />

            {/* Photo Upload */}
            <input
              type="file"
              className="border p-2 w-full mb-2"
              onChange={(e) => setUpdatedPhoto(e.target.files[0])}
            />

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={updatePrincipal}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeePrancipla;
