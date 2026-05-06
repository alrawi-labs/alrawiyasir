"use client";

import useWidth from "../../../hooks/useWidth";
import images from "../../../constants/images";

const LANGUAGES = [
  {
    native: "العربية",
    name: "Arabic",
    description: "Native language proficiency in reading, writing, and speaking.",
    icon: images.numb01,
  },
  {
    native: "English",
    name: "English",
    description: "Professional proficiency in reading, writing and speaking.",
    icon: images.numb02,
  },
  {
    native: "Türkçe",
    name: "Turkish",
    description: "Full professional proficiency in reading, writing and speaking.",
    icon: images.numb03,
  },
];

const Languages = () => {
  const w        = useWidth();
  const isMobile = w < 768;

  return (
    <div
      style={{
        background: "rgba(245,238,228,0.92)",
        borderRadius: isMobile ? "40px" : "98px",
        padding: isMobile ? "32px 24px" : "48px 60px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
        gap: "0",
        margin: "32px auto",
        position: "relative",
      }}
    >
      {LANGUAGES.map((lang, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: isMobile ? "28px 20px" : "30px 90px",
            borderRight:
              !isMobile && i < LANGUAGES.length - 1
                ? "1.5px dashed #c8b89a"
                : "none",
            borderBottom:
              isMobile && i < LANGUAGES.length - 1
                ? "1.5px dashed #c8b89a"
                : "none",
            position: "relative",
          }}
        >
          <img
            src={lang.icon}
            alt=""
            referrerPolicy="no-referrer"
            style={{
              width: isMobile ? "96px" : "128px",
              height: isMobile ? "96px" : "128px",
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: 0.5,
            }}
          />
          <h2
            style={{
              fontSize: isMobile ? "44px" : "56px",
              fontWeight: 800,
              color: "#111",
              margin: "24px 0 4px",
              letterSpacing: "-1.5px",
              lineHeight: 1,
              position: "relative",
              zIndex: 1,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            {lang.native}
          </h2>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#999",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            {lang.name}
          </span>
          <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.65, margin: 0, maxWidth: "220px" }}>
            {lang.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Languages;