"use client";

import { useState, useEffect } from "react";

/**
 * Tarayıcı genişliğini reaktif olarak döndürür.
 * SSR güvenli: sunucuda varsayılan 1280px kullanılır.
 */
const useWidth = (): number => {
  const [w, setW] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    const handleResize = () => setW(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return w;
};

export default useWidth;