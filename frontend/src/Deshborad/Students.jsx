import React, { useState } from "react";

function Students() {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", fatherName: "Richard Doe" },
    { id: 2, name: "Jane Smith", fatherName: "Robert Smith" },
    { id: 3, name: "Alice Johnson", fatherName: "Michael Johnson" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleDelete = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  const handleUpdate = (id) => {
    const updatedName = prompt("Enter new name:");
    const updatedFatherName = prompt("Enter new father's name:");
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? { ...student, name: updatedName, fatherName: updatedFatherName }
          : student
      )
    );
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery) ||
      student.fatherName.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Students Information</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or father's name"
          value={searchQuery}
          onChange={handleSearch}
          className="block w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Students Table */}
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">SL No</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Father's Name</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{student.name}</td>
              <td className="border border-gray-300 px-4 py-2">{student.fatherName}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleUpdate(student.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredStudents.length === 0 && (
            <tr>
              <td
                colSpan="4"
                className="border border-gray-300 px-4 py-2 text-center text-gray-500"
              >
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
