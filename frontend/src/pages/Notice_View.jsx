import React from 'react';
import { useLocation } from 'react-router-dom';

const Notice_View = () => {
  const location = useLocation();
  const { notice } = location.state || {}; // যদি ডেটা না থাকে, তাহলে fallback দেয়

  if (!notice) {
    return <div className="p-4 text-red-500">No notice data found.</div>;
  }


  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = notice.photo.url;
    link.download = 'notice_image.jpg'; // এখানে ইচ্ছেমতো নাম দাও
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Notice Details</h2>
      <p><strong>Date:</strong> {new Date(notice.date).toLocaleDateString()}</p>
      <p><strong>Title:</strong> {notice.notic_datils}</p>
       <button
          onClick={downloadImage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
       >
        Download Now
      </button>


      {notice.photo.url && (
        <div className="mt-4">
          <img src={notice.photo.url} alt="Notice" className="w-full rounded-md" />
        </div>
      )}
    </div>
  );
};

export default Notice_View;
