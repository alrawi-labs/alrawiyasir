"use client";

import { useState } from "react";

interface NavItemProps {
  item: string;
  handleNav: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

const NavItem = ({ item, handleNav }: NavItemProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`#${item.toLowerCase()}`}
      onClick={(e) => handleNav(e, item.toLowerCase())}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative pb-1 text-white/90 hover:text-white font-semibold tracking-widest text-xl transition-opacity duration-200"
      style={{ textDecoration: "none" }}
    >
      {item}
      <span
        className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-white transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: hovered ? "left" : "right",
        }}
      />
    </a>
  );
};

export default NavItem;