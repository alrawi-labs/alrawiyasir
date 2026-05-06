"use client";

import React from "react";
import { springScrollTo } from "../utils/springScroll";

/**
 * Navbar/footer linkleri için spring-scroll tabanlı smooth navigation.
 * Kullanım: const handleNav = useSmoothNav();
 */
const useSmoothNav = () => {
  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 0;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    springScrollTo(top);
  };

  return handleNav;
};

export default useSmoothNav;