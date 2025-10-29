import React, { useState } from 'react';
import axios from 'axios';

function SeeGanralNotice() {
  const [ganarelNotice, setNotice] = useState(""); // Notice স্টেট রাখার জন্য
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
      setLoading(true);
  
    // ডেটা JSON অবজেক্ট হিসেবে প্রস্তুত করুন
    const payload = { ganarelNotice };
  
    try {
      const { data } = await axios.post('https://college-app-3.onrender.com/api/ganarelNotice/ganarelN', payload, {
        headers: {
          "Content-Type": "application/json", // JSON হিসেবে পাঠান
        },
      });
      console.log(data);
      setNotice("");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // ব্যাকএন্ড থেকে আসা মেসেজ দেখান
        alert(error.response.data.message); // ইউজারকে মেসেজ দেখানো
      } else {
        console.error("Notice পোস্ট করতে সমস্যা হয়েছে:", error);
        alert("Notice পোস্ট করতে সমস্যা হয়েছে।");
      }
    }
    finally {
      setLoading(false); // 🟢 রিকোয়েস্ট শেষ হলে loading false করো
    }
  };
  
  

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Ganarel Notice Create</h1>

      <form onSubmit={handleSubmit} >

      {/* Notice Text Area */}
      <textarea
        value={ganarelNotice} // State value bind করা
        onChange={(e) => setNotice(e.target.value)} // State আপডেট করা
        className="w-full h-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Write your notice here..."
      ></textarea>
      {/* Buttons */}
      <div className="flex items-center justify-center mt-4">
        <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
                Posting...
              </div>
            ) : (
              "Post"
            )}
        </button>
      </div>

      </form>

    </div>
  );
}

export default SeeGanralNotice;
