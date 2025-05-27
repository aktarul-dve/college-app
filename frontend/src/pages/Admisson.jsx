import React, { useState, useEffect } from 'react';
import axios from 'axios';

const educationLevels = [
  "Higher Secondary",
  "Degree (Pass)"
];

const Admission = () => {
  const [selectedLevel, setSelectedLevel] = useState("Higher Secondary");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (level) => {
    setLoading(true);
    try {
      const encodedLevel = encodeURIComponent(level); // space-safe API call
      const res = await axios.get(`https://college-app-3.onrender.com/api/events/level/${encodedLevel}`);
      setEvents(res.data); // Assuming res.data is an array
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setEvents([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents(selectedLevel);
  }, [selectedLevel]);

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {educationLevels.map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-2 rounded ${
              selectedLevel === level
                ? "bg-blue-800 text-white"
                : "bg-green-100 text-black"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Event Table */}
      {/* Event Table */}
<div className="border p-4 rounded bg-white shadow">
  <h2 className="text-2xl font-bold mb-4">ACTIVE EVENTS</h2>
  {loading ? (
    <p>Loading...</p>
  ) : events.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border min-w-[800px]">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">SL. No</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Payment Collection Nature</th>
            <th className="p-2 border">Education Level</th>
            <th className="p-2 border">Session</th>
            <th className="p-2 border">End Date</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event._id}>
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{event.title}</td>
              <td className="p-2 border">{event.nature}</td>
              <td className="p-2 border">{event.educationLevel}</td>
              <td className="p-2 border">{event.session}</td>
              <td className="p-2 border">
                {new Date(event.endDate).toLocaleString()}
              </td>
              <td className="p-2 border">
                <a
                  href={event.actionUrl}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Apply Now
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No active events found for "{selectedLevel}".</p>
  )}
</div>

    </div>
  );
};

export default Admission;
