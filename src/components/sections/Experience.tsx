"use client";

import { motion } from "motion/react";
import useWidth from "../../../hooks/useWidth";

const EXPERIENCES = [
  {
    period: "Jul 2025 – Aug 2025",
    role: "Full-Stack Developer",
    company: "Freelance",
    type: "Freelance",
    items: [
      "Architected an AI-Powered Audio Separation Platform using Django and React with integrated ML models.",
      "Optimized media processing pipelines for high-performance handling of YouTube and video sources.",
    ],
    tech: ["Django", "React", "Python", "ML"],
  },
  {
    period: "May 2025 – Jul 2025",
    role: "ASP.NET MVC Developer",
    company: "Kırıkkale University — Information Processing Dept.",
    type: "University",
    items: [
      "Developed an enterprise admin panel for academic management using C# ASP.NET Core MVC and Entity Framework Core.",
      "Designed scalable controller-view architectures supporting live academic events.",
    ],
    tech: ["C#", "ASP.NET Core", "Entity Framework"],
  },
  {
    period: "Apr 2025",
    role: "Full-Stack Developer",
    company: "Kırıkkale University — Information Processing Dept.",
    type: "University",
    items: ["Developed a bilingual (Turkish–English) website for the International Family Studies Congress."],
    tech: ["Full-Stack", "Bilingual"],
  },
  {
    period: "Sep 2024",
    role: "Full-Stack Developer",
    company: "Kırıkkale University — Faculty of Science and Letters",
    type: "University",
    items: ["Built the website for the International History of Science Symposium (Dîvânu Lugâti't-Türk, Ali Kuşçu, Fuat Sezgin)."],
    tech: ["Full-Stack"],
  },
  {
    period: "Jul 2024 – Aug 2024",
    role: "Backend Developer",
    company: "Bayraktar Solar Enerji, Ankara",
    type: "Internship",
    items: [
      "Developed a Flutter mobile app that remotely controls a Python Flask backend on a laptop via Tkinter.",
      "Enabled real-time file creation, editing, and transfers between phone and laptop.",
    ],
    tech: ["Flutter", "Python", "Flask", "Tkinter"],
  },
  {
    period: "Aug 2023 – Oct 2023",
    role: "Full-Stack Developer",
    company: "Mostaql Platform — Freelance",
    type: "Freelance",
    items: ["Migrated a school management system from ASP.NET MVC to Laravel (PHP) without altering core functionalities."],
    tech: ["Laravel", "PHP", "ASP.NET MVC"],
  },
  {
    period: "Nov 2022 – May 2023",
    role: "Full-Stack Developer",
    company: "Mostaql Platform — Freelance",
    type: "Freelance",
    items: [
      "Built a comprehensive school management system with multi-role access (admin, teacher).",
      "Enabled teachers to manage schedules, post announcements, and track classroom activity logs.",
    ],
    tech: ["C#", "ASP.NET MVC"],
  },
  {
    period: "Jul 2023 – Aug 2023",
    role: "Full-Stack Developer",
    company: "Kırıkkale University — Information Processing Dept.",
    type: "Internship",
    items: ["Developed a web-based management system using PHP for managing students, teachers, and projects."],
    tech: ["PHP"],
  },
];

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  Freelance:  { bg: "#fef3e2", color: "#e8926f" },
  University: { bg: "#e8f4fd", color: "#4f94b2" },
  Internship: { bg: "#edf7ed", color: "#4caf7d" },
};

const Experience = () => {
  const w        = useWidth();
  const isMobile = w < 768;

  return (
    <section id="experience" className="py-24 bg-brand-bg overflow-hidden">
      <div className={isMobile ? "px-5 w-full" : "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full"}>

        {/* Header */}
        <div style={{ marginBottom: isMobile ? "48px" : "72px" }}>
          <p style={{ color: "#999", fontSize: "13px", fontWeight: 600, letterSpacing: "5px", textTransform: "uppercase", marginBottom: "12px" }}>
            Career
          </p>
          <h4 style={{ fontSize: isMobile ? "36px" : "60px", fontWeight: 500, color: "#111", letterSpacing: "-1.5px", lineHeight: 1.1, margin: 0 }}>
            Work Experience
          </h4>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {!isMobile && (
            <div
              style={{
                position: "absolute",
                left: "180px",
                top: 0, bottom: 0,
                width: "1.5px",
                background: "linear-gradient(to bottom, #e8ddd0, #e8ddd0 90%, transparent)",
              }}
            />
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "40px" : "0" }}>
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "180px 1fr",
                  gap: isMobile ? "12px" : "0",
                  paddingBottom: isMobile ? "0" : "48px",
                  position: "relative",
                }}
              >
                {/* Period */}
                <div style={{ paddingRight: "32px", paddingTop: "4px", textAlign: isMobile ? "left" : "right" }}>
                  <span style={{ fontSize: "13px", color: "#999", fontWeight: 500, letterSpacing: "0.3px", whiteSpace: "nowrap" }}>
                    {exp.period}
                  </span>
                </div>

                {/* Dot */}
                {!isMobile && (
                  <div
                    style={{
                      position: "absolute",
                      left: "174px", top: "6px",
                      width: "14px", height: "14px",
                      borderRadius: "50%",
                      background: "#f5ede0",
                      border: "2.5px solid #c8b89a",
                      zIndex: 1,
                    }}
                  />
                )}

                {/* Content */}
                <div style={{ paddingLeft: isMobile ? "0" : "40px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <h3 style={{ fontSize: isMobile ? "18px" : "22px", fontWeight: 700, color: "#111", margin: 0, letterSpacing: "-0.3px" }}>
                      {exp.role}
                    </h3>
                    <span
                      style={{
                        fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase",
                        background: TYPE_COLORS[exp.type].bg, color: TYPE_COLORS[exp.type].color,
                        borderRadius: "50px", padding: "3px 12px",
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  <p style={{ fontSize: "14px", color: "#888", fontWeight: 500, margin: "0 0 16px 0", letterSpacing: "0.2px" }}>
                    {exp.company}
                  </p>

                  <ul style={{ margin: "0 0 16px 0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {exp.items.map((item, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", fontSize: "15px", color: "#555", lineHeight: 1.65 }}>
                        <span style={{ color: "#e8926f", flexShrink: 0, marginTop: "2px" }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Tech pills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "11px", fontWeight: 700, color: "#666",
                          background: "rgba(0,0,0,0.06)", borderRadius: "50px",
                          padding: "3px 12px", letterSpacing: "0.5px", textTransform: "uppercase",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {!isMobile && idx < EXPERIENCES.length - 1 && (
                    <div style={{ marginTop: "40px", borderBottom: "1.5px dashed #e8ddd0" }} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;