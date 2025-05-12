import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Ganarl_notice() {
  const [notice, setNotice] = useState("");

  const getNotice = async () => {
    try {
      const { data } = await axios.get("https://college-app-3.onrender.com/api/ganarelNotice/getGnNotice", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      setNotice(data);
    } catch (error) {
      console.error("Error fetching notice:", error);
    }
  };

  // useEffect এর মাধ্যমে API কল করা হবে
  useEffect(() => {
    getNotice();
  }, []); // খালি ডিপেনডেন্সি অ্যারে মানে এটি একবারই চলবে

  return (
    <div>
    {/* Check if notice has data and access the first item's ganarelNotice */}
    {notice.length > 0 ? <p>{notice[0].ganarelNotice}</p> : <p>Loading...</p>}
  </div>
  );
}

export default Ganarl_notice;
