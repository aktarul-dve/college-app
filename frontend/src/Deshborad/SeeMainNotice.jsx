import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SeeMainNotice() {
  // State variables
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states for update
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [isReadMoreModalOpen, setIsReadMoreModalOpen] = useState(false);
  const [selectedReadMoreNotice, setSelectedReadMoreNotice] = useState(null);

  const handleReadMore = (notice) => {
    setSelectedReadMoreNotice(notice);
    setIsReadMoreModalOpen(true);
  };


  const closeReadMoreModal = () => {
    setIsReadMoreModalOpen(false);
    setSelectedReadMoreNotice(null);
  };

  // Fetch notices on component mount
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('https://college-app-3.onrender.com/api/ganarelNotice/getAllMainNotice');
        setNotices(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch notices');
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  // Open modal for update
  const handleUpdate = (notice) => {
    setSelectedNotice(notice);
    setUpdatedDetails(notice.notic_datils);
    setUpdatedDate(notice.date);
    setImagePreview(notice.photo?.url || '');
    setUpdatedImage(null);
    setIsModalOpen(true);
  };

  // Handle image change for update
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Submit the updated notice
  const handleModalSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('notic_datils', updatedDetails);
      formData.append('date', updatedDate);
      if (updatedImage) {
        formData.append('photo', updatedImage);
      }

      const response = await axios.put(
        `https://college-app-3.onrender.com/api/ganarelNotice/maniNoticeupdate/${selectedNotice._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setNotices((prev) =>
        prev.map((n) =>
          n._id === selectedNotice._id
            ? { ...n, notic_datils: updatedDetails, date: updatedDate, photo: response.data.photo }
            : n
        )
      );

      // Reset modal states
      setIsModalOpen(false);
      setUpdatedDetails('');
      setUpdatedDate('');
      setUpdatedImage(null);
      setImagePreview('');
      alert('Notice updated successfully');
    } catch (err) {
      console.error('Failed to update notice:', err);
      alert('Failed to update notice');
    }
  };

  // Delete a notice
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this notice?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://college-app-3.onrender.com/api/ganarelNotice/maniNoticedelete/${id}`);
      setNotices((prevNotices) => prevNotices.filter((notice) => notice._id !== id));
      alert('Notice deleted successfully');
    } catch (err) {
      console.error('Failed to delete notice:', err);
      alert('Failed to delete notice');
    }
  };

  // Render loading or error states
  if (loading) return <p className="text-center text-gray-800">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="px-4 py-6 bg-gray-100 text-gray-800">
      <h1 className="text-center text-2xl font-bold mb-4">Notices</h1>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {notices.slice().reverse().map((notice) => (
            <tr key={notice._id}>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(notice.date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{notice.notic_datils}</td>
              <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                <button  onClick={() => handleReadMore(notice)} className="text-blue-500 hover:text-blue-700">
                  Read More
                </button>
                <button
                  onClick={() => handleUpdate(notice)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(notice._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Notice</h2>

            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded mb-4"
              value={updatedDetails}
              onChange={(e) => setUpdatedDetails(e.target.value)}
              placeholder="Enter updated title"
            />

            <input
              type="date"
              className="w-full border border-gray-300 p-2 rounded mb-4"
              value={updatedDate}
              onChange={(e) => setUpdatedDate(e.target.value)}
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Selected preview"
                  className="mt-4 w-32 h-32 object-cover rounded"
                />
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


{isReadMoreModalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Notice Details</h2>
      
      {selectedReadMoreNotice && (
        <>
          <h3 className="text-lg font-semibold mb-4">{selectedReadMoreNotice.notic_datils}</h3>
          {selectedReadMoreNotice.photo?.url && (
            <img
              src={selectedReadMoreNotice.photo.url}
              alt="Notice"
              className="w-full h-auto rounded mb-4"
            />
          )}
          <p className="text-gray-600 mb-4">
            Date: {new Date(selectedReadMoreNotice.date).toLocaleDateString()}
          </p>
        </>
      )}
      
      <button
        onClick={closeReadMoreModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default SeeMainNotice;
