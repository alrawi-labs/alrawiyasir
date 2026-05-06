"use client";

import { useState } from "react";

interface ContactFormSubmitButtonProps {
  isMobile: boolean;
}

const ContactFormSubmitButton = ({ isMobile }: ContactFormSubmitButtonProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="submit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden"
      style={{
        background: "#f6c7b2",
        color: "#1a1a1a",
        border: "none",
        borderRadius: "50px",
        padding: isMobile ? "16px 36px" : "20px 100px",
        fontWeight: 700,
        fontSize: isMobile ? "16px" : "20px",
        letterSpacing: "1.5px",
        cursor: "pointer",
        transition: "all ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: hovered ? "500px" : "0px",
          height: hovered ? "500px" : "0px",
          background: "white",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.8s cubic-bezier(0.4,0,0.2,1), height 0.8s cubic-bezier(0.4,0,0.2,1)",
          zIndex: 0,
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>Submit</span>
    </button>
  );
};

export default ContactFormSubmitButton;