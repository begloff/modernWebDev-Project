import React, { useState, useEffect } from "react";
import "./RollingText.css"; // Ensure you have a CSS file to style the rolling text

const RollingText = ({ phrases }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 5000); // Change interval time as needed (5 seconds in this example)

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="rolling-text">
      {phrases.map((phrase, idx) => (
        <p
          key={idx}
          className={idx === index ? "active" : ""}
          style={{ color: "#259c4f", fontSize: "20px", fontWeight: "bold" }}
        >
          {phrase}
        </p>
      ))}
    </div>
  );
};

export default RollingText;
