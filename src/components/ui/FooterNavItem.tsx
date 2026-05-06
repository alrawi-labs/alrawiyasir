"use client";

import { useState } from "react";

interface FooterNavItemProps {
  item: string;
  handleNav: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  isMobile: boolean;
}

const FooterNavItem = ({ item, handleNav, isMobile }: FooterNavItemProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`#${item.toLowerCase()}`}
      onClick={(e) => handleNav(e, item.toLowerCase())}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative pb-1 text-[#555] font-normal uppercase hover:text-[#1a1a1a] transition-colors"
      style={{
        textDecoration: "none",
        fontSize: isMobile ? "13px" : "18px",
        letterSpacing: isMobile ? "0.5px" : "0.1em",
      }}
    >
      {item}
      <span
        className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#555] transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: hovered ? "left" : "right",
        }}
      />
    </a>
  );
};

export default FooterNavItem;