import axios from "axios";
import React, { useEffect, useState } from "react";

function Teachers() {
  const API_URL = "https://college-app-3.onrender.com/api/ganarelNotice/getTeacher";
  const [teachers, setTeachers] = useState([]);
   const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log(response.data);
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching Teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

 const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this Teachers?");
    if (!confirmed) return;
    setLoadingId(id); // ✅ লোডিং শুধু ওই ইমেজে দেখানো হবে

    try {
      const response = await fetch(
        `https://college-app-3.onrender.com/api/ganarelNotice/deleteTeacher/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Teacher deleted successfully!");
        setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher._id !== id));
      } else {
        alert("Failed to delete the Teacher.");
      }
    } catch (error) {
      console.error("Error deleting Teacher:", error);
      alert("An error occurred while deleting the Teacher.");
    } finally {
      setLoadingId(null); // ✅ লোডিং রিসেট
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Teachers</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">SL No</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Designation</th>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Photo</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={teacher._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{teacher.name}</td>
              <td className="border border-gray-300 px-4 py-2">{teacher.designation}</td>
              <td className="border border-gray-300 px-4 py-2">{teacher.department}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={teacher.photo.url}
                  alt={teacher.name}
                  className="w-12 h-12 rounded-full mx-auto"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDelete(teacher._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  disabled={loadingId === teacher._id}
                >
                   {loadingId === teacher._id ? (
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
                    Deleting...
                  </div>
                ) : (
                  "DELETE"
                )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teachers;
