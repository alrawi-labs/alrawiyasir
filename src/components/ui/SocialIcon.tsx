"use client";

import { useState } from "react";

interface SocialIconProps {
  src: string;
  href: string;
}

const SocialIcon = ({ src, href }: SocialIconProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="__blank"
      className="group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
      style={{ background: hovered ? "#4f94b2" : "transparent" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt="social"
        className="border rounded-full border-[rgba(16,16,16,.2)] transition-all duration-200"
        style={{
          filter: hovered ? "brightness(0) invert(1)" : "brightness(0)",
          opacity: hovered ? 1 : 0.6,
        }}
        referrerPolicy="no-referrer"
      />
    </a>
  );
};

export default SocialIcon;
