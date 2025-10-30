import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SeeAbout_Us() {
  const [about, setAbout] = useState('');
  const [showModal, setShowModal] = useState(false); // মডাল স্টেট
  const [updatedNotice, setUpdatedNotice] = useState(''); // আপডেট হওয়া নোটিস
  const [loading, setLoading] = useState(false); // 🟢 নতুন state

  const getNotice = async () => {
    try {
      const { data } = await axios.get("https://college-app-3.onrender.com/api/ganarelNotice/getAboutUs", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAbout(data);
    } catch (error) {
      console.error("Error fetching notice:", error);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    if (!about[0]?._id) {
      console.error("No valid ID found!");
      return;
    }
  
    try {
      const response = await axios.put(
        `https://college-app-3.onrender.com/api/ganarelNotice/updateAboutUs/${about[0]._id}`, // এখানে ID যুক্ত করা হয়েছে
        { about_us: updatedNotice }, // নতুন ডাটা পাঠানো হচ্ছে
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log('Update successful:', response.data);
      setShowModal(false); // মডাল বন্ধ করুন
      getNotice(); // নতুন ডাটা রিফ্রেশ করুন
    } catch (error) {
      console.error("Error updating notice:", error);
    }finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notice?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://college-app-3.onrender.com/api/ganarelNotice/deleteAboutUs/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      alert("Notice deleted successfully!");
      getNotice(); // নোটিস রিফ্রেশ করুন
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };


  useEffect(() => {
    getNotice();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      {about.length > 0 ? <p>{about[0]?.about_us}</p> : <p>Loading...</p>}

      {/* Buttons */}
      <div className="flex justify-between">
      <button
  type="button"
  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
  onClick={() => {
    setUpdatedNotice(about[0]?.about_us || ""); // ডাটা সেট করুন
    setShowModal(true); // মডাল ওপেন করুন
  }}
>
  Update
</button>

        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={ () => handleDelete(about[0]?._id)}
          disabled={loading} //
        >
         {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Deleteing...
              </div>
            ) : (
              "DELETE"
            )}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Update Notice</h2>
            <textarea
              value={updatedNotice}
              onChange={(e) => setUpdatedNotice(e.target.value)}
              className="w-full p-2 border rounded"
              rows="5"
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                onClick={() => setShowModal(false)} // মডাল বন্ধ করুন
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={handleUpdate}
                disabled={loading} //
              >
               {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Saving...
              </div>
            ) : (
              "Save"
            )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeeAbout_Us;
