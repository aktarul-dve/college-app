import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SeeGanralNotice() {
  const [notice, setNotice] = useState([]);
  const [showModal, setShowModal] = useState(false); // মডাল কন্ট্রোল করার জন্য স্টেট
  const [updatedNotice, setUpdatedNotice] = useState(""); // আপডেটের জন্য ফর্মের ডেটা

  // নোটিস লোড করা
  const getNotice = async () => {
    try {
      const { data } = await axios.get("/api/ganarelNotice/getGnNotice", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setNotice(data);
    } catch (error) {
      console.error("Error fetching notice:", error);
    }
  };

  // নোটিস আপডেট করা
  const handleUpdate = async () => {
    if (!updatedNotice.trim()) {
      alert("Notice cannot be empty.");
      return;
    }

    try {
      const noticeId = notice[0]._id; // Assuming you update the first notice
      await axios.put(`/api/ganarelNotice/update/${noticeId}`, 
        { ganarelNotice: updatedNotice }, 
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Notice updated successfully!");
      setShowModal(false); // মডাল বন্ধ করুন
      getNotice(); // নোটিস রিফ্রেশ করুন
    } catch (error) {
      console.error("Error updating notice:", error);
    }
  };

  // নোটিস ডিলেট করা
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notice?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/ganarelNotice/delete/${id}`, {
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
      {notice.length > 0 ? <p>{notice[0].ganarelNotice}</p> : <p>Loading...</p>}

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-lime-500 text-white rounded border border-gray-400 hover:bg-red-600"
          onClick={() => {
            setUpdatedNotice(notice[0]?.ganarelNotice); // প্রাথমিক ডেটা সেট করুন
            setShowModal(true); // মডাল ওপেন করুন
          }}
        >
          UPDATE
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded border border-gray-400 hover:bg-green-600"
          onClick={() => handleDelete(notice[0]._id)} // ডিলেট ফাংশন কল করুন
        >
          DELETE
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-10 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg" style={{ width: "50%", height: "70%" }}>
            <h2 className="text-xl font-bold mb-4">Update Notice</h2>
            <textarea
              value={updatedNotice}
              onChange={(e) => setUpdatedNotice(e.target.value)}
              className="w-full p-2 border rounded" style={{ height: "60%" }}
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
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SeeGanralNotice;
