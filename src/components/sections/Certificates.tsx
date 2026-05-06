"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, X, ExternalLink } from "lucide-react";

const useWidth = () => {
  const [w, setW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  React.useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
};

// ─── Certificates data ───────────────────────────────────────────────
const certificates = [
  {
    title: "Diction, Announcing and Presentation",
    issuer: "Republic of Türkiye – Ministry of National Education",
    date: "2026",
    category: "Communication",
    accent: "#e8926f",
    bg: "#fef3e2",
    image: "images/certificates/diksiyon.png",
    link: "#",
  },
  {
    title: "Master Instructor Orientation Training Program",
    issuer: "Republic of Türkiye – Ministry of National Education",
    date: "2025",
    category: "Training & Mentoring",
    accent: "#9b7dd4",
    bg: "#f3eeff",
    image: "images/certificates/usta_öğretici.png",
    link: "#",
  },
  {
    title: "Empowering Youth in Hatay with AI Training Program",
    issuer: "Kodluyoruz",
    date: "2024",
    category: "AI / ML",
    accent: "#e8926f",
    bg: "#fef3e2",
    image: "images/certificates/hatay_yapay_zeka.png",
    link: "https://verified.sertifier.com/en/verify/19214415529495/?ref=email",
  },
  {
    title: "Introduction to Data Science and Artificial Intelligence 101",
    issuer: "Turkcell",
    date: "2024",
    category: "Data Science",
    accent: "#9b7dd4",
    bg: "#f3eeff",
    image: "images/certificates/turkcel-veri-bilimi.png",
    link: "#",
  },
  {
    title: "CyberStart with IBM and Kodluyoruz",
    issuer: "Kodluyoruz",
    date: "2024",
    category: "Cybersecurity",
    accent: "#e8384f",
    bg: "#fff0f2",
    image: "images/certificates/IBM-CyberStart.png",
    link: "https://verified.sertifier.com/tr/verify/71862750169764/",
  },
  {
    title: "Beginner Level Backend Web Development with PHP Path",
    issuer: "Patika",
    date: "2024",
    category: "Backend / PHP",
    accent: "#4f94b2",
    bg: "#e8f4fd",
    image: "images/certificates/patika-php.png",
    link: "https://academy.patika.dev/certificates/2abd817a",
  },
  {
    title: "Cybersecurity Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "2024",
    category: "Cybersecurity",
    accent: "#e8384f",
    bg: "#fff0f2",
    image: "images/certificates/ibm1.png",
    link: "https://www.credly.com/badges/336b98f2-f30b-4533-af50-a64c1710c375/public_url",
  },
  {
    title: "Dart Programming Language",
    issuer: "BTK Academy",
    date: "2024",
    category: "Programming",
    accent: "#4f94b2",
    bg: "#e8f4fd",
    image: "images/certificates/dart.png",
    link: "#",
  },
  {
    title: "Explore Emerging Tech",
    issuer: "IBM",
    date: "2024",
    category: "DevOps",
    accent: "#4caf7d",
    bg: "#edf7ed",
    image: "images/certificates/Explore_Emerging_Tech.png",
    link: "https://www.credly.com/badges/042028b0-8497-4fde-8045-bc449de71f32/linked_in_profile",
  },
  {
    title: "Professional Competence",
    issuer: "Kodluyoruz",
    date: "2024",
    category: "DevOps",
    accent: "#4caf7d",
    bg: "#edf7ed",
    image: "images/certificates/Fachliche_Eignung.png",
    link: "https://skills.yourlearning.ibm.com/certificate/share/a3c569b70dewogICJvYmplY3RJZCIgOiAiUExBTi01QUIxRjUxQzZBODYiLAogICJsZWFybmVyQ05VTSIgOiAiMjc2MDk1MVJFRyIsCiAgIm9iamVjdFR5cGUiIDogIkFDVElWSVRZIgp9422445810b-10",
  },
  {
    title: "Introduction to Firewall",
    issuer: "BTK Academy",
    date: "2024",
    category: "Cybersecurity",
    accent: "#e8384f",
    bg: "#fff0f2",
    image: "images/certificates/cybersecurity-btk.png",
    link: "#",
  },
  {
    title: "Working in a Digital World",
    issuer: "IBM SkillsBuild",
    date: "2024",
    category: "Soft Skills",
    accent: "#888",
    bg: "#f1efeb",
    image: "images/certificates/working_in_a_digital_world1.png",
    link: "https://www.credly.com/badges/e4a64704-1bf4-4148-a2eb-9c81b7e78d51/linked_in_profile",
  },
  {
    title: "Cybersecurity with IBM",
    issuer: "IBM",
    date: "2024",
    category: "Cybersecurity",
    accent: "#e8384f",
    bg: "#fff0f2",
    image: "images/certificates/CyberStart.png",
    link: "https://sb-auth.skillsbuild.org/login?client_id=yl-internal-adopter&learning_path=https:%2F%2Fskills.yourlearning.ibm.com%2Fcertificate%2Fshare%2F11f3a366f1ewogICJvYmplY3RJZCIgOiAiUExBTi1DMkIwNkY3MDUxRTIiLAogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIsCiAgImxlYXJuZXJDTlVNIiA6ICIyNzYwOTUxUkVHIgp99e4e0e97df-10&redirect_uri=https:%2F%2Fskills.yourlearning.ibm.com%2Foauth%2Fcallback&referer=skills.yourlearning.ibm.com&response_type=code&scope=openid%20email",
  },
  {
    title: "Professional Skills",
    issuer: "IBM SkillsBuild",
    date: "2024",
    category: "Soft Skills",
    accent: "#888",
    bg: "#f1efeb",
    image: "images/certificates/professional_skills.png",
    link: "https://sb-auth.skillsbuild.org/login?client_id=yl-internal-adopter&learning_path=https:%2F%2Fskills.yourlearning.ibm.com%2Fcertificate%2Fshare%2Fff6d905dc5ewogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIsCiAgImxlYXJuZXJDTlVNIiA6ICIyNzYwOTUxUkVHIiwKICAib2JqZWN0SWQiIDogIlBMQU4tQzRGQ0M2N0QzRTc2Igp91049423cee-10&redirect_uri=https:%2F%2Fskills.yourlearning.ibm.com%2Foauth%2Fcallback&referer=skills.yourlearning.ibm.com&response_type=code&scope=openid%20email",
  },
  {
    title: "Basic Network Technologies",
    issuer: "BTK Academy",
    date: "2024",
    category: "Networking",
    accent: "#4caf7d",
    bg: "#edf7ed",
    image: "images/certificates/NetworkTechnology.png",
    link: "#",
  },
  {
    title: "Working in a Digital World",
    issuer: "IBM SkillsBuild",
    date: "2024",
    category: "Soft Skills",
    accent: "#888",
    bg: "#f1efeb",
    image: "images/certificates/working_in_a_digital_world.png",
    link: "https://www.credly.com/badges/e4a64704-1bf4-4148-a2eb-9c81b7e78d51/linked_in_profile",
  },
  {
    title: "Cyber Security",
    issuer: "AIBÜ",
    date: "2024",
    category: "Cybersecurity",
    accent: "#e8384f",
    bg: "#fff0f2",
    image: "images/certificates/cyber.png",
    link: "#",
  },
];

type Cert = (typeof certificates)[0];

// ─── CertModal ────────────────────────────────────────────────────────
const CertModal = ({
  cert,
  onClose,
}: {
  cert: Cert;
  onClose: () => void;
}) => {
  // ESC ile kapat
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    // scroll kilitle
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const hasLink = cert.link && cert.link !== "#";

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(10, 8, 5, 0.72)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Modal panel */}
      <motion.div
        key="modal-panel"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "28px",
          width: "100%",
          maxWidth: "640px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(0,0,0,0.06)",
          position: "relative",
        }}
      >
        {/* Accent stripe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(90deg, ${cert.accent}, ${cert.accent}88)`,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "28px 28px 20px 28px",
            gap: "16px",
          }}
        >
          <div style={{ flex: 1 }}>
            {/* Category pill */}
            <span
              style={{
                display: "inline-block",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                background: cert.bg,
                color: cert.accent,
                borderRadius: "50px",
                padding: "3px 12px",
                marginBottom: "12px",
              }}
            >
              {cert.category}
            </span>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#111",
                letterSpacing: "-0.4px",
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              {cert.title}
            </h2>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              flexShrink: 0,
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1.5px solid #e8ddd0",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#888",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#111";
              (e.currentTarget as HTMLElement).style.color = "#fff";
              (e.currentTarget as HTMLElement).style.borderColor = "#111";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#888";
              (e.currentTarget as HTMLElement).style.borderColor = "#e8ddd0";
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Certificate image */}
        <div
          style={{
            margin: "0 28px",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #e8ddd0",
            background: cert.bg,
          }}
        >
          <img
            src={cert.image}
            alt={cert.title}
            referrerPolicy="no-referrer"
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 28px 28px 28px",
            gap: "12px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "13px",
                color: "#888",
                margin: "0 0 2px 0",
                fontWeight: 500,
              }}
            >
              {cert.issuer}
            </p>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: cert.accent,
              }}
            >
              {cert.date}
            </span>
          </div>

          {hasLink && (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: cert.accent,
                color: "#fff",
                borderRadius: "50px",
                padding: "12px 24px",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                textDecoration: "none",
                transition: "opacity 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "0.85")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "1")
              }
            >
              View Certificate
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── CertCard ────────────────────────────────────────────────────────
const CertCard = ({
  cert,
  idx,
  isMobile,
  onClick,
}: {
  cert: Cert;
  idx: number;
  isMobile: boolean;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "white",
        borderRadius: isMobile ? "24px" : "28px",
        padding: isMobile ? "24px 20px" : "28px 28px",
        border: `1.5px solid ${hovered ? cert.accent : "#e8ddd0"}`,
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.25s ease, transform 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "pointer",
      }}
    >
      {/* Accent stripe */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "24px",
          width: "36px",
          height: "3px",
          borderRadius: "0 0 3px 3px",
          background: cert.accent,
        }}
      />

      {/* Category pill */}
      <div style={{ marginBottom: "16px", marginTop: "4px" }}>
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            background: cert.bg,
            color: cert.accent,
            borderRadius: "50px",
            padding: "3px 12px",
          }}
        >
          {cert.category}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: isMobile ? "16px" : "18px",
          fontWeight: 700,
          color: "#111",
          letterSpacing: "-0.3px",
          lineHeight: 1.3,
          margin: "0 0 16px 0",
        }}
      >
        {cert.title}
      </h3>

      {/* Certificate image */}
      <div
        style={{
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "16px",
          transform: "scale(1.1)",
          border: "1px solid #e8ddd0",
          background: cert.bg,
        }}
      >
        <img
          src={cert.image}
          alt={cert.title}
          referrerPolicy="no-referrer"
          style={{
            width: "100%",
            height: isMobile ? "140px" : "160px",
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
            transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingTop: "12px",
          borderTop: "1px dashed #e8ddd0",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            color: "#888",
            margin: 0,
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {cert.issuer}
        </p>
        <span
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: cert.accent,
          }}
        >
          {cert.date}
        </span>
      </div>

      {/* Decorative dots */}
      <div
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "40px",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      />
    </motion.div>
  );
};

const MAX_VISIBLE = 6;

// ─── Certificates ─────────────────────────────────────────────────────
const Certificates = () => {
  const w = useWidth();
  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;

  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Cert | null>(null);

  const visible = showAll ? certificates : certificates.slice(0, MAX_VISIBLE);
  const hasMore = certificates.length > MAX_VISIBLE;

  return (
    <>
      <section
        id="certificates"
        style={{
          background: "#f5ede0",
          paddingTop: isMobile ? "72px" : "120px",
          paddingBottom: isMobile ? "72px" : "120px",
          overflow: "hidden",
        }}
      >
        <div
          className={
            isMobile
              ? "px-5 w-full"
              : "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
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
            <div>
              <p
                style={{
                  color: "#999",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                Credentials
              </p>
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
                Certificates
              </h4>
            </div>
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
              CRT
            </span>
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                  ? "1fr 1fr"
                  : "1fr 1fr 1fr",
              gap: isMobile ? "16px" : "10px",
            }}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((cert, idx) => (
                <CertCard
                  key={cert.title + idx}
                  cert={cert}
                  idx={idx}
                  isMobile={isMobile}
                  onClick={() => setSelectedCert(cert)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Show more / Show less */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}
            >
              <button
                onClick={() => setShowAll((prev) => !prev)}
                style={{
                  background: "rgba(0,0,0,0.05)",
                  color: "#333",
                  border: "1.5px solid rgba(0,0,0,0.12)",
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
                  (e.currentTarget as HTMLElement).style.background = "#111";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.borderColor = "#111";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.05)";
                  (e.currentTarget as HTMLElement).style.color = "#333";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.12)";
                }}
              >
                {showAll
                  ? "SHOW LESS"
                  : `SHOW ALL CERTIFICATES (${certificates.length - MAX_VISIBLE} more)`}
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

      {/* Modal — section dışında render edilir */}
      <AnimatePresence>
        {selectedCert && (
          <CertModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Certificates;