"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import useWidth from "../../../hooks/useWidth";

const heroBg = "/images/hero-bg.png";


const items = [
  {
    img: "images/volunteering/bahcesehir-katilim-belgesi.png",
    title: "Guest Speaker",
    org: "Bahçeşehir College – Kırıkkale Campus",
    period: "Nov 2025",
    desc: "As a representative of Kırıkkale University, I shared my experiences in Computer Engineering, university life, and career planning with students.",
    decos: [
      { type: "circle" as const, w: 22, h: 22, top: "-8px", left: "-8px" },
      { type: "dot" as const, w: 8, h: 8, top: "12px", right: "-4px", color: "#f6c7b2" },
      { type: "circle" as const, w: 14, h: 14, bottom: "-6px", right: "8px" },
    ],
  },
  {
    img: "images/volunteering/Committee.png",
    title: "Organizing Committee Member",
    org: "Kırıkkale University",
    period: "Nov 2024",
    desc: "Served as a member of the organizing committee for the International Symposium on History of Science, contributing to planning, organizing, website management, and supervision to ensure the success of the academic event.",
    decos: [
      { type: "circle" as const, w: 22, h: 22, top: "-8px", right: "-8px" },
      { type: "dot" as const, w: 10, h: 10, bottom: "-4px", left: "12px", color: "rgba(255,255,255,0.35)" },
      { type: "dot" as const, w: 6, h: 6, top: "8px", left: "-4px", color: "#f6c7b2" },
    ],
  },
  {
    img: "images/volunteering/arabic_teacher.png",
    title: "Arabic Teacher",
    org: "KU — International Relations Office, Foreign Languages Club",
    period: "Jan – Feb 2022",
    desc: "Taught Arabic to students from various departments and received a certificate of appreciation for my contribution.",
    decos: [
      { type: "dot" as const, w: 10, h: 10, top: "-4px", left: "20px", color: "#f6c7b2" },
      { type: "circle" as const, w: 18, h: 18, bottom: "-6px", right: "-6px" },
      { type: "dot" as const, w: 6, h: 6, top: "14px", right: "-4px", color: "rgba(255,255,255,0.35)" },
    ],
  },
  {
    img: "images/volunteering/FIRST_AIDER_CERTIFICATE.png",
    title: "Certified First Aider",
    org: "Kırıkkale Provincial Health Directorate",
    period: "Jan 2020",
    desc: "Obtained a certified first aider certificate.",
    decos: [
      { type: "circle" as const, w: 22, h: 22, bottom: "-8px", left: "-8px" },
      { type: "dot" as const, w: 8, h: 8, top: "-4px", right: "20px", color: "#f6c7b2" },
      { type: "dot" as const, w: 6, h: 6, bottom: "10px", right: "-4px", color: "rgba(255,255,255,0.35)" },
    ],
  },
];
const MAX_VISIBLE = 4;

const Volunteering = () => {
  const w = useWidth();
  const isMobile = w > 0 && w < 768;
  const isTablet = w >= 768 && w < 1024;

  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? items : items.slice(0, MAX_VISIBLE);
  const hasMore = items.length > MAX_VISIBLE;

  const gridCols = "1fr 1fr";

  return (
    <section
      id="volunteering"
      className={isMobile ? "rounded-b-[64px]" : "rounded-b-[128px]"}
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: isMobile ? "72px" : "120px",
        paddingBottom: isMobile ? "80px" : "128px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className={isMobile ? "px-5" : "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"}
      >
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
            className={
              isMobile
                ? "text-3xl font-semibold text-white"
                : "text-6xl lg:w-1/2 font-semibold text-white"
            }
          >
            Volunteering
          </h4>
          <span
            style={{
              fontSize: isMobile ? "56px" : "108px",
              fontWeight: 900,
              color: "white",
              opacity: 0.07,
              letterSpacing: "-4px",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            VOL
          </span>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
          }}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: isMobile ? "0 16px 48px" : "0 20px",
                  position: "relative",
                }}
              >
                {/* Dashed divider */}
                {i > 0 && !isMobile && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      borderLeft: "1.5px dashed rgba(255,255,255,0.18)",
                    }}
                  />
                )}
                {i > 0 && isMobile && (
                  <div
                    style={{
                      borderTop: "1.5px dashed rgba(255,255,255,0.18)",
                      width: "100%",
                      marginBottom: "36px",
                    }}
                  />
                )}

                {/* Photo wrap */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    marginBottom: "28px",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: "100%",
                      aspectRatio: "4/3",
                      borderRadius: "20px",
                      objectFit: "cover",
                      display: "block",
                      border: "2px solid rgba(255,255,255,0.12)",
                    }}
                  />
                  {item.decos.map((d, di) => {
                    const pos: React.CSSProperties = {
                      position: "absolute",
                      width: `${d.w}px`,
                      height: `${d.h}px`,
                      borderRadius: "50%",
                      ...(d.top && { top: d.top }),
                      ...(d.bottom && { bottom: d.bottom }),
                      ...(d.left && { left: d.left }),
                      ...(d.right && { right: d.right }),
                    };
                    if (d.type === "circle") {
                      return (
                        <div
                          key={di}
                          style={{
                            ...pos,
                            border: "1px solid rgba(255,255,255,0.3)",
                          }}
                        />
                      );
                    }
                    return (
                      <div
                        key={di}
                        style={{
                          ...pos,
                          background: d.color || "#f6c7b2",
                          opacity: 0.7,
                        }}
                      />
                    );
                  })}
                </div>

                <h3
                  style={{
                    fontSize: isMobile ? "28px" : "32px",
                    fontWeight: 400,
                    color: "black",
                    letterSpacing: "-0.5px",
                    marginBottom: "8px",
                    lineHeight: 1.2,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? "16px" : "15px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.45)",
                    lineHeight: 1.5,
                    marginBottom: "14px",
                  }}
                >
                  {item.org}
                </p>
                <p
                  style={{
                    fontSize: isMobile ? "22px" : "20px",
                    fontWeight: 400,
                    color: "rgba(0,0,0,0.65)",
                    lineHeight: 1.7,
                    marginBottom: "16px",
                    maxWidth: "100%",
                  }}
                >
                  {item.desc}
                </p>
                <span
                  style={{
                    fontSize: isMobile ? "13px" : "12px",
                    fontWeight: 700,
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    color: "#415357",
                    marginBottom: "10px",
                  }}
                >
                  {item.period}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show more / Show less butonu — sadece 4'ten fazla varsa */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "48px",
            }}
          >
            <button
              onClick={() => setShowAll((prev) => !prev)}
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.3)",
                borderRadius: "50px",
                padding: "14px 36px",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "1px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#f6c7b2";
                (e.currentTarget as HTMLElement).style.color = "#1a1a1a";
                (e.currentTarget as HTMLElement).style.borderColor = "#f6c7b2";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.color = "white";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.3)";
              }}
            >
              {showAll
                ? "SHOW LESS"
                : `SHOW ALL VOLUNTEERING (${items.length - MAX_VISIBLE} more)`}
              <motion.span
                animate={{ rotate: showAll ? 270 : 90 }}
                transition={{ duration: 0.3 }}
                style={{ display: "flex" }}
              >
                <ChevronRight size={16} />
              </motion.span>
            </button>
          </motion.div>
        )}

     
      </div>
    </section>
  );
};

export default Volunteering;
