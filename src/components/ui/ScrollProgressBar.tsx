"use client";

import { useState, useEffect } from "react";

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el    = document.documentElement;
      const scrolled = el.scrollTop;
      const total    = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999,
        background: "rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          height: "100%",
          background: "linear-gradient(90deg, #f6c7b2, #e8926f)",
          width: `${progress}%`,
          borderRadius: "0 2px 2px 0",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;