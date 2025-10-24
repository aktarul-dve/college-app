import React, { useState } from "react";

function CreateTeachers() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
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
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("department", department);
    formData.append("photo", photo);

    try {
      const response = await fetch("https://college-app-3.onrender.com/teachers", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Teacher added successfully!");
        setName("");
        setDesignation("");
        setDepartment("");
        setPhoto(null);
        setPhotoPreview("");
      } else {
        alert("Failed to add teacher!");
      }
    } catch (error) {
      console.error("Error adding teacher:", error);
      alert("An error occurred while adding the teacher.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Teacher</h1>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter the name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Designation */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Designation
          </label>
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="block w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Designation</option>
            <option value="Professor">Professor</option>
            <option value="Assistant Professor">Assistant Professor</option>
          </select>
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="block w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
          </select>
        </div>

        {/* Photo Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Photo
          </label>
          {photoPreview && (
            <div className="mb-2">
              <img
                src={photoPreview}
                alt="Preview"
                className="w-24 h-24 rounded-full mx-auto"
              />
            </div>
          )}
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
            required
          />
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
            {isSubmitting ? "Submitting..." : "Upload Now"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTeachers;
