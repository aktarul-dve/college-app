import React, { useState } from "react";

function CreateNews() {
  const [photoPreview, setPhotoPreview] = useState("");
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch("https://college-app-3.onrender.com/api/ganarelNotice/creatNews", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("News uploaded successfully!");
        setPhotoPreview("");
        setPhoto(null);
        setTitle("");
        setDescription("");
      } else {
        alert("Failed to upload news!");
      }
    } catch (error) {
      console.error("Error uploading news:", error);
      alert("An error occurred while uploading news.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Create News</h1>

      <form onSubmit={handleSubmit}>
        {/* Photo Preview */}
        {photoPreview && (
           <div className="flex items-center justify-center mb-4">
           <img
             src={photoPreview}
             alt="Preview"
             className="w-24 h-24  border"
           />
         </div>
        )}

        {/* Photo Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-800"
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="block w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-600 text-white px-6 py-2 rounded ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
            }`}
          >
            {isSubmitting ? "Uploading..." : "Upload Now"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNews;
