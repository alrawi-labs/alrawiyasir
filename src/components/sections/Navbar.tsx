"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Menu, Sparkles, X } from "lucide-react";
import NavItem from "@/components/ui/NavItem";
import AIChatWidget from "@/components/ui/AIChatWidget"; // ← yeni import
import useWidth from "../../../hooks/useWidth";
import useSmoothNav from "../../../hooks/useSmoothNav";
import images from "../../../constants/images";

const NAV_ITEMS = ["HOME", "PROJECTS", "ARTICLES", "CONTACT"];

interface NavbarProps {
  onAskAI: () => void;
}

const Navbar = ({ onAskAI }: NavbarProps) => {
  const w = useWidth();
  const [isOpen, setIsOpen] = useState(false);
  const [signHovered, setSignHovered] = useState(false);

  
  if (w === null) return null;
  const isMobile = w > 0 && w < 768;
  const isTablet = w >= 768 && w < 1024;
  const handleNav = useSmoothNav();

  return (
    <nav
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1480px",
          margin: "0 auto",
          padding: isMobile ? "16px 20px" : "16px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: isMobile ? "60px" : "72px",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              className={
                isMobile ? "w-20 h-20 object-contain" : "w-36 h-36 object-contain"
              }
              src={images.logo}
              alt="Alrawi Logo"
            />
          </div>

          {/* Desktop Nav Links */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
              {NAV_ITEMS.map((item) => (
                <NavItem key={item} item={item} handleNav={handleNav} />
              ))}
            </div>
          )}

          {/* Desktop: AI Chat + Make a Project */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* ─── Trigger Button ─── */}
              {/* ─── ASK AI Button ─── */}
<button
  onClick={onAskAI}
  aria-label="AI Chat"
  style={{
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 22px",
    borderRadius: "999px",
    border: "1px solid rgba(246, 199, 178, 0.35)",
    background: "linear-gradient(135deg, rgba(246,199,178,0.12) 0%, rgba(255,255,255,0.06) 100%)",
    color: "white",
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "2.5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 0 20px rgba(246,199,178,0.08), inset 0 1px 0 rgba(255,255,255,0.1)",
    overflow: "hidden",
  }}
  onMouseEnter={(e) => {
    const btn = e.currentTarget;
    btn.style.background = "linear-gradient(135deg, rgba(246,199,178,0.22) 0%, rgba(255,255,255,0.10) 100%)";
    btn.style.borderColor = "rgba(246,199,178,0.65)";
    btn.style.boxShadow = "0 0 28px rgba(246,199,178,0.22), inset 0 1px 0 rgba(255,255,255,0.15)";
    btn.style.transform = "translateY(-1px)";
  }}
  onMouseLeave={(e) => {
    const btn = e.currentTarget;
    btn.style.background = "linear-gradient(135deg, rgba(246,199,178,0.12) 0%, rgba(255,255,255,0.06) 100%)";
    btn.style.borderColor = "rgba(246,199,178,0.35)";
    btn.style.boxShadow = "0 0 20px rgba(246,199,178,0.08), inset 0 1px 0 rgba(255,255,255,0.1)";
    btn.style.transform = "translateY(0)";
  }}
>
  {/* Shimmer efekti */}
  <span
    style={{
      position: "absolute",
      inset: 0,
      background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 3s infinite",
      borderRadius: "inherit",
    }}
  />

  <Sparkles size={12} style={{ opacity: 0.9, flexShrink: 0 }} />

  <span style={{ position: "relative", zIndex: 1 }}>ASK AI</span>

  {/* Pulse dot */}
  <span
    style={{
      position: "relative",
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "#f6c7b2",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        position: "absolute",
        inset: -2,
        borderRadius: "50%",
        border: "1.5px solid rgba(246,199,178,0.6)",
        animation: "ping 2s ease-in-out infinite",
      }}
    />
  </span>
</button>

              <button
                onMouseEnter={() => setSignHovered(true)}
                onMouseLeave={() => setSignHovered(false)}
                onClick={(e) =>
                  handleNav(
                    e as unknown as React.MouseEvent<HTMLAnchorElement>,
                    "contact",
                  )
                }
                className="relative overflow-hidden"
                style={{
                  background: "white",
                  color: "#1a1a1a",
                  border: "1.5px solid rgba(0,0,0,0.12)",
                  borderRadius: "50px",
                  padding: "10px 32px",
                  fontWeight: 700,
                  fontSize: "18px",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  boxShadow: signHovered
                    ? "0 4px 16px rgba(0,0,0,0.14)"
                    : "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "all 0.2s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: signHovered ? "400px" : "0px",
                    height: signHovered ? "400px" : "0px",
                    background: "#ebc7b5",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    transition:
                      "width 0.8s cubic-bezier(0.4,0,0.2,1), height 0.8s cubic-bezier(0.4,0,0.2,1)",
                    zIndex: 0,
                  }}
                />
                <span style={{ position: "relative", zIndex: 1 }}>
                  MAKE A PROJECT
                </span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "white",
                padding: 0,
              }}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>

        {/* Mobile Dropdown */}
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "rgba(15,15,20,0.97)",
              borderRadius: "20px",
              padding: "24px",
              marginTop: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  handleNav(e, item.toLowerCase());
                  setIsOpen(false);
                }}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "18px",
                  letterSpacing: "2px",
                }}
              >
                {item}
              </a>
            ))}
            <button
              onClick={(e) =>
                handleNav(
                  e as unknown as React.MouseEvent<HTMLAnchorElement>,
                  "contact",
                )
              }
              style={{
                background: "white",
                color: "#1a1a1a",
                border: "none",
                borderRadius: "50px",
                padding: "12px 28px",
                fontWeight: 700,
                fontSize: "16px",
                cursor: "pointer",
                width: "fit-content",
                marginTop: "4px",
              }}
            >
              MAKE A PROJECT
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
