import React, { useState } from "react";
import axios from "axios";

function CreateNewNotice() {
  const [selectedDate, setSelectedDate] = useState("");
  const [noticeContent, setNoticeContent] = useState(""); // Textarea state
  const [photo, setPhoto] = useState(""); // Photo state
  const [photoPreview, setPhotoPreview] = useState(""); // Photo preview

  // ফটো প্রিভিউ হ্যান্ডলার
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  // সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("date", selectedDate);
    formData.append("notic_datils", noticeContent);
    formData.append("photo", photo);

    try {
      const { data } = await axios.post(
        "https://college-app-3.onrender.com/api/ganarelNotice/mainNotice",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      alert("Notice created successfully!");

      // Reset the form
      setSelectedDate("");
      setNoticeContent("");
      setPhoto("");
      setPhotoPreview("");
    } catch (error) {
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-xl font-semibold mb-6">Create New Notice</h1>
        <form onSubmit={handleSubmit}>
          {/* তারিখ ইনপুট */}
          <div className="mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* টেক্সট এরিয়া */}
          <div className="mb-4">
            <textarea
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              className="w-full h-40 p-2 border rounded-md resize-none"
              placeholder="Write your notice here..."
            ></textarea>
          </div>

          {/* ফটো আপলোড */}
          <div className="flex items-center mb-4">
            {photoPreview && (
              <img
                src={photoPreview}
                alt="photo preview"
                className="w-20 h-20 object-cover mr-4"
              />
            )}
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewNotice;
