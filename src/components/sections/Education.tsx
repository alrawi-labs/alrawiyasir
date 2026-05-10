"use client";

import { motion } from "motion/react";
import useWidth from "../../../hooks/useWidth";
import images from "../../../constants/images";

const firstCard = {
  period: "Sep 2021 – Jun 2025",
  degree: "Bachelor of\nComputer Engineering",
  school: "Kırıkkale University",
  location: "Kırıkkale, Turkey",
  badge: "3.25 GPA · Ranked 3rd",
  numImg: images.numb01,
};

const otherCards = [
  {
    period: "Sep 2014 – May 2018",
    degree: "High School\nDiploma",
    school: "Beşir Atalay Anadolu İmam Hatip Lisesi",
    location: "Kırıkkale, Turkey",
    dark: false,
    accent: "#4f94b2",
    numImg: images.numb02,
  },
  {
    period: "Oct 2011 – Jun 2014",
    degree: "Middle School\nDiploma",
    school: "Hammurabi Middle School",
    location: "Anbar, Iraq",
    dark: true,
    accent: "#4caf7d",
    numImg: images.numb03,
  },
  {
    period: "Oct 2005 – Jun 2011",
    degree: "Primary School\nDiploma",
    school: "Al-Saray Primary School",
    location: "Anbar, Iraq",
    dark: false,
    accent: "#9b7dd4",
    numImg: images.numb01,
  },
];

const Education = () => {
 const w = useWidth();

  
  if (w === null) return null;
  const isMobile = w > 0 && w < 768;
  const isTablet = w >= 768 && w < 1024;

  return (
    <section
      id="education"
      style={{
        background: "#f5ede0",
        paddingTop: isMobile ? "72px" : "120px",
        paddingBottom: isMobile ? "72px" : "120px",
        overflow: "hidden",
      }}
    >
      <div className={isMobile ? "px-5" : "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: isMobile ? "48px" : "72px",
          }}
        >
          <h4
            style={{
              fontSize: isMobile ? "40px" : "64px",
              fontWeight: 500,
              color: "#111",
              letterSpacing: "-2px",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Education
          </h4>
          <span
            style={{
              fontSize: isMobile ? "48px" : "96px",
              lineHeight: 1,
              opacity: 0.06,
              fontWeight: 900,
              color: "#111",
              letterSpacing: "-4px",
              userSelect: "none",
            }}
          >
            EDU
          </span>
        </div>

        {/* First card — full width */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: "#1a1a1a",
            borderRadius: isMobile ? "32px" : "44px",
            padding: isMobile ? "36px 28px" : "52px 60px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: isMobile ? "28px" : "0",
            marginBottom: "20px",
          }}
        >
          {/* Watermark */}
          <img
            src={firstCard.numImg}
            alt=""
            referrerPolicy="no-referrer"
            style={{
              position: "absolute",
              right: isMobile ? "-20px" : "-10px",
              bottom: isMobile ? "-20px" : "-16px",
              width: isMobile ? "160px" : "220px",
              height: isMobile ? "160px" : "220px",
              opacity: 0.17,
              pointerEvents: "none",
              userSelect: "none",
            }}
          />

          {/* Accent stripe */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: isMobile ? "32px" : "60px",
              width: "48px",
              height: "4px",
              borderRadius: "0 0 4px 4px",
              background: "#e8926f",
            }}
          />

          {/* Decorative dots */}
          <div style={{ position: "absolute", top: "24px", right: "32px", width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
          <div style={{ position: "absolute", top: "42px", right: "52px", width: "6px", height: "6px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)" }} />

          {/* Left */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#e8926f",
                display: "block",
                marginBottom: "16px",
              }}
            >
              {firstCard.period}
            </span>
            <h3
              style={{
                fontSize: isMobile ? "28px" : "38px",
                fontWeight: 400,
                color: "white",
                letterSpacing: "-1px",
                lineHeight: 1.15,
                margin: "0 0 24px 0",
                whiteSpace: "pre-line",
              }}
            >
              {firstCard.degree}
            </h3>
            <motion.span
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: "13px",
                fontWeight: 600,
                background: "#e8926f",
                color: "white",
                borderRadius: "50px",
                padding: "8px 20px",
              }}
            >
              {firstCard.badge}
            </motion.span>
          </div>

          {/* Right — school pill */}
          <div style={{ textAlign: isMobile ? "left" : "right", flexShrink: 0, position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.07)",
                borderRadius: "20px",
                padding: isMobile ? "16px 20px" : "20px 28px",
                textAlign: isMobile ? "left" : "right",
              }}
            >
              <p style={{ fontSize: isMobile ? "19px" : "24px", fontWeight: 400, color: "rgba(255,255,255,0.9)", margin: "0 0 4px 0", maxWidth: "240px", lineHeight: 1.3 }}>
                {firstCard.school}
              </p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: 0, fontWeight: 500 }}>
                {firstCard.location}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom 3 cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          {otherCards.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{
                background: edu.dark ? "#1a1a1a" : "white",
                borderRadius: isMobile ? "28px" : "36px",
                padding: isMobile ? "32px 24px" : "40px 36px",
                position: "relative",
                overflow: "hidden",
                border: edu.dark ? "none" : "1.5px solid #e8ddd0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "220px",
              }}
            >
              {/* Watermark */}
              <img
                src={edu.numImg}
                alt=""
                referrerPolicy="no-referrer"
                style={{
                  position: "absolute",
                  right: "-8px",
                  bottom: "-12px",
                  width: "140px",
                  height: "140px",
                  opacity: edu.dark ? 0.17 : 0.21,
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />

              {/* Accent stripe */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: isMobile ? "28px" : "36px",
                  width: "48px",
                  height: "4px",
                  borderRadius: "0 0 4px 4px",
                  background: edu.accent,
                }}
              />

              {/* Dots */}
              <div style={{ position: "absolute", top: "24px", right: "32px", width: "10px", height: "10px", borderRadius: "50%", background: edu.dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)" }} />
              <div style={{ position: "absolute", top: "42px", right: "52px", width: "6px", height: "6px", borderRadius: "50%", border: `1px solid ${edu.dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}` }} />

              {/* Top */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: edu.accent,
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  {edu.period}
                </span>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 400,
                    color: edu.dark ? "white" : "#111",
                    letterSpacing: "-0.5px",
                    lineHeight: 1.2,
                    margin: 0,
                    whiteSpace: "pre-line",
                  }}
                >
                  {edu.degree}
                </h3>
              </div>

              {/* Bottom — school pill */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    background: edu.dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)",
                    borderRadius: "14px",
                    padding: "14px 18px",
                  }}
                >
                  <p style={{ fontSize: "15px", fontWeight: 500, color: edu.dark ? "rgba(255,255,255,0.9)" : "#333", margin: "0 0 3px 0", lineHeight: 1.3 }}>
                    {edu.school}
                  </p>
                  <p style={{ fontSize: "12px", color: edu.dark ? "rgba(255,255,255,0.35)" : "#aaa", margin: 0, fontWeight: 500 }}>
                    {edu.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;