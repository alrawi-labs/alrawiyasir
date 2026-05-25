"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import useWidth from "../../../hooks/useWidth";

const cols = [
  {
    cat: "Programming",
    title: "Languages",
    accent: "#e8926f",
    pills: ["C#", "Python", "JavaScript", "Java", "PHP", "Dart"],
  },
  {
    cat: "AI & Machine Learning",
    title: "AI & ML",
    accent: "#4f94b2",
    pills: ["NLP", "LLaMA", "GPT", "RAG", "Fine-tuning", "Prompt Eng."],
  },
  {
    cat: "Frameworks",
    title: "Frameworks",
    accent: "#4caf7d",
    pills: ["Django", "React", "ASP.NET Core", "Laravel", "Flutter"],
  },
  {
    cat: "Data & DevOps",
    title: "Tooling",
    accent: "#e8926f",
    pills: ["Pandas", "NumPy", "REST APIs", "Git", "Docker"],
  },
  {
    cat: "Databases",
    title: "Databases",
    accent: "#9b7dd4",
    pills: ["MySQL", "MSSQL", "MongoDB", "FAISS", "ChromaDB"],
  },
  {
    cat: "Frontend",
    title: "UI & CSS",
    accent: "#d4607a",
    pills: ["HTML", "CSS", "Tailwind CSS", "Bootstrap"],
  },
];

const Skills = () => {
  const w = useWidth();

  // w null ise henüz mount olmamış, hiçbir şey render etme
  if (w === null) return null;

  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;


  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr 1fr" : "repeat(3, 1fr)";

  return (
    <section
      id="skills"
      style={{
        background: "#f5ede0",
        paddingTop: isMobile ? "72px" : "120px",
        paddingBottom: isMobile ? "72px" : "120px",
        overflow: "hidden",
      }}
    >
      <div
        className={
          isMobile ? "px-5" : "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        }
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
            style={{
              fontSize: isMobile ? "40px" : "64px",
              fontWeight: 500,
              color: "#111",
              letterSpacing: "-2px",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Skills
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
            SKL
          </span>
        </div>

        {/* Card wrap */}
        <div
          style={{
            background: "rgba(245,237,224,0.92)",
            borderRadius: isMobile ? "32px" : "48px",
            border: "1.5px solid #e0d0bc",
            display: "grid",
            gridTemplateColumns: gridCols,
            overflow: "hidden",
          }}
        >
          {cols.map((col, i) => {
            const isLastInRow = isMobile ? false : (i + 1) % 3 === 0;
            const isLast = i === cols.length - 1;
            const isSecondRow = i >= 3;

            return (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{
                  padding: isMobile ? "36px 24px" : "44px 32px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  borderRight:
                    !isMobile && !isLastInRow && !isLast
                      ? "1.5px dashed #c8b89a"
                      : "none",
                  borderBottom:
                    isMobile && !isLast ? "1.5px dashed #c8b89a" : "none",
                  borderTop:
                    !isMobile && isSecondRow ? "1.5px dashed #c8b89a" : "none",
                  position: "relative",
                }}
              >
                {/* Category */}
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    color: "#999",
                    marginBottom: "10px",
                  }}
                >
                  {col.cat}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: isMobile ? "32px" : "clamp(26px, 3.5vw, 42px)",
                    fontWeight: 800,
                    color: "#111",
                    letterSpacing: "-1px",
                    lineHeight: 1.1,
                    marginBottom: "20px",
                  }}
                >
                  {col.title}
                </h3>

                {/* Accent divider */}
                <div
                  style={{
                    width: "28px",
                    height: "2px",
                    borderRadius: "2px",
                    background: col.accent,
                    margin: "0 auto 20px",
                  }}
                />

                {/* Pills */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "7px",
                  }}
                >
                  {col.pills.map((p) => (
                    <span
                      key={p}
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        borderRadius: "50px",
                        padding: "6px 15px",
                        background: "rgba(0,0,0,0.07)",
                        color: "#222",
                        letterSpacing: "0.2px",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;