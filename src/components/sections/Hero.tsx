"use client";

import { useState } from "react";
import { Download, Linkedin, Github, Instagram } from "lucide-react";
import Languages from "@/components/sections/Languages";
import ChatBot from "@/components/sections/ChatBot"; // ← ekle, yolu ayarla
import useWidth from "../../../hooks/useWidth";
import images from "../../../constants/images";

interface SocialLink {
  icon: React.ElementType;
  label: string;
  href: string;
  hoverColor: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yasir-alrawi/",
    hoverColor: "#0A66C2",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/yasir23",
    hoverColor: "#ffffff",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/yasir7_23/",
    hoverColor: "#E1306C",
  },
];

const Hero = () => {
  const w        = useWidth();
  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;
  const [hovered, setHovered]             = useState<boolean>(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <section
      id="home"
      style={{
        backgroundImage: `url(${images.heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        paddingTop: isMobile ? "88px" : "120px",
      }}
      className={isMobile ? "rounded-b-[64px]" : "rounded-b-[128px]"}
    >
      <div
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding: isMobile ? "0 20px" : isTablet ? "0 32px" : "48px 0",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
            gap: "60px",
            alignItems: "center",
            marginBottom: "60px",
          }}
        >
          {/* Left */}
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <h4
              style={{
                fontSize: isMobile
                  ? "clamp(40px,10vw,60px)"
                  : isTablet
                    ? "clamp(56px,8vw,72px)"
                    : "clamp(80px,6vw,80px)",
                fontWeight: 500,
                color: "white",
                lineHeight: 1.1,
                margin: "0 0 24px 0",
                letterSpacing: "-2px",
              }}
            >
              Yasir Alrawi
            </h4>

            <h4
              style={{
                fontSize: isMobile
                  ? "clamp(40px,10vw,60px)"
                  : isTablet
                    ? "clamp(56px,8vw,72px)"
                    : "clamp(55px,6vw,55px)",
                fontWeight: 500,
                color: "white",
                lineHeight: 1.1,
                margin: "-30px 0 14px 0",
                letterSpacing: "-2px",
              }}
            >
              Computer Engineer & AI Specialist
            </h4>

            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: isMobile ? "18px" : "25px",
                lineHeight: 1.6,
                margin: "0 0 10px 0",
              }}
            >
              Computer Engineer specializing in{" "}
              <strong>Large Language Models (LLMs)</strong>,{" "}
              <strong>RAG architectures</strong>, and <strong>NLP</strong>. I
              design and build scalable, data-driven AI systems that transform
              complex datasets into high-performance, intelligent solutions.
            </p>

            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: isMobile ? "18px" : "25px",
                lineHeight: 1.6,
                margin: "0 0 40px 0",
              }}
            >
              Building scalable applications that analyze data, uncover patterns,
              and transform insights into real-world solutions.
            </p>

            {/* Buton + Sosyal Medya Satırı */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              {/* CV Butonu */}
              <button
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative overflow-hidden flex items-center gap-2"
                style={{
                  background: "#f6c7b2",
                  color: "#1a1a1a",
                  border: "none",
                  borderRadius: "50px",
                  padding: isMobile ? "16px 36px" : "20px 45px",
                  fontWeight: 700,
                  fontSize: isMobile ? "16px" : "20px",
                  letterSpacing: "1.5px",
                  cursor: "pointer",
                  transition: "all 0.5s ease",
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
                <Download size={20} style={{ position: "relative", zIndex: 1 }} />
                <span style={{ position: "relative", zIndex: 1 }}>DOWNLOAD MY CV</span>
              </button>

              {/* Sosyal Medya İkonları */}
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {socialLinks.map(({ icon: Icon, label, href, hoverColor }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    onMouseEnter={() => setHoveredSocial(label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: isMobile ? "44px" : "52px",
                      height: isMobile ? "44px" : "52px",
                      borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.4)",
                      background: "#f6c7b2",
                      color: hoveredSocial === label ? hoverColor : "rgba(0,0,0,0.85)",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(8px)",
                      transform: hoveredSocial === label ? "translateY(-3px)" : "translateY(0)",
                      boxShadow:
                        hoveredSocial === label ? "0 8px 20px rgba(0,0,0,0.2)" : "none",
                      textDecoration: "none",
                    }}
                  >
                    <Icon size={isMobile ? 18 : 22} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — illustration */}
          {!isMobile && !isTablet && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
              <img
                src={images.heroYasir}
                alt="Hero"
                style={{ width: "100%", maxWidth: "580px", height: "auto" }}
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      </div>

      <Languages />

      {/* ChatBot — sağ alt köşeye sabit */}
      <ChatBot />
    </section>
  );
};

export default Hero;