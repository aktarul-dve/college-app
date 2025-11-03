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
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teachers;
