import axios from "axios";
import React, { useState } from "react";

function CreatePrincipal() {
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [name, setName] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !photo) {
      alert("Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", photo);

    try {
      const response = await axios.post("https://college-app-3.onrender.com/api/ganarelNotice/CreatPancipal", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data); // ✅ চেক করার জন্য লগ

      if (response.status === 201) {
        alert("Principal created successfully!");
        setName("");
        setPhoto(null);
        setPhotoPreview("");
      } else {
        alert("Failed to create principal.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting data.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Principal
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Photo Upload */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Upload Photo
            </label>
            {photoPreview && (
              <div className="flex justify-center mb-4">
                <img
                  src={photoPreview}
                  alt="Photo Preview"
                  className="w-24 h-24 object-cover rounded-full shadow-md"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Principal Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter principal's name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePrincipal;
