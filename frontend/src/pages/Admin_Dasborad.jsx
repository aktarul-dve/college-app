import React from 'react';

const Admin_Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Students</h2>
          <p className="text-2xl">1200</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Teachers</h2>
          <p className="text-2xl">75</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Courses</h2>
          <p className="text-2xl">25</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Pending Admissions</h2>
          <p className="text-2xl">8</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white shadow rounded-lg mt-6 p-4">
        <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>New admission: Rahim Hossain (BSc in CSE)</li>
          <li>Notice: Midterm exams start from Nov 10</li>
          <li>New course added: Machine Learning</li>
        </ul>
      </div>
    </div>
  );
};

export default Admin_Dashboard;
