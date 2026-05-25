"use client";

import { useState, useEffect } from "react";

const useWidth = (): number | null => {
  const [w, setW] = useState<number | null>(null);

  useEffect(() => {
    setW(window.innerWidth);
    const handleResize = () => setW(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return w;
};

export default useWidth;