import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function AnimatedTitle() {
  const colors = ["text-red-500", "text-blue-500", "text-green-500", "text-yellow-500", "text-purple-500"];
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000); // প্রতি ১ সেকেন্ড পর পর কালার পরিবর্তন হবে
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.h1
      className={`text-center text-2xl font-bold mb-4 transition-colors duration-500 ${colors[colorIndex]}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* নারাচারা করতে একটু পর পর */}
      {["N", "o", "t", "i", "c", "e", "s"].map((char, index) => (
        <motion.span
          key={index}
          className="inline-block text-5xl"
          initial={{ opacity: 0, y: 50 }} // শুরুতে উপরে থাকবে
          animate={{ opacity: 1, y: 0 }} // আসবে নিচে
          transition={{
            duration: 0.4,
            delay: index * 0.1, // একটু পর পর এনিমেশন হবে
            type: "spring",
            stiffness: 100, // নারাচারা স্টাইল
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default AnimatedTitle;
