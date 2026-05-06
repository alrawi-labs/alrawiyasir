"use client";

import React, { useState } from "react";

interface RippleButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const RippleButton = ({
  label,
  href,
  onClick,
  icon,
  variant = "dark",
  size = "md",
  fullWidth = false,
}: RippleButtonProps): React.ReactElement => {
  const [hovered, setHovered] = useState(false);

  const bg         = variant === "dark" ? "#1a1a1a" : "white";
  const textColor  = variant === "dark" ? "white"   : "#1a1a1a";
  const rippleSize = size === "lg" ? "600px" : "400px";

  const padding  = size === "sm" ? "12px 28px" : size === "lg" ? "20px 52px" : "16px 40px";
  const fontSize = size === "sm" ? "14px"      : size === "lg" ? "18px"      : "15px";

  const sharedStyle: React.CSSProperties = {
    background: bg,
    color: textColor,
    border: "none",
    borderRadius: "50px",
    padding,
    fontWeight: 700,
    fontSize,
    letterSpacing: "1.5px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    textDecoration: "none",
    width: fullWidth ? "100%" : "auto",
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
  };

  const inner = (
    <>
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: hovered ? rippleSize : "0px",
          height: hovered ? rippleSize : "0px",
          background: "#f6c7b2",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.8s cubic-bezier(0.4,0,0.2,1), height 0.8s cubic-bezier(0.4,0,0.2,1)",
          zIndex: 0,
        }}
      />
      <span
        style={{
          position: "relative",
          zIndex: 1,
          color: hovered ? "#1a1a1a" : textColor,
          transition: "color 0.3s",
        }}
      >
        {label}
      </span>
      {icon && (
        <span
          style={{
            position: "relative",
            zIndex: 1,
            display: "inline-flex",
            color: hovered ? "#1a1a1a" : textColor,
            transition: "color 0.3s",
          }}
        >
          {icon}
        </span>
      )}
    </>
  );

  const events = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (href) {
    return (
      <a href={href} style={sharedStyle} {...events}>
        {inner}
      </a>
    );
  }

  return (
    <button style={sharedStyle} onClick={onClick} {...events}>
      {inner}
    </button>
  );
};