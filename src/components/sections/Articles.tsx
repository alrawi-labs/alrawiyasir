"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Article } from '../../types/article';
import Link from "next/link";

const images = {
  heroBg: "/images/hero-bg.png",
};

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

const MAX_VISIBLE = 3;

const Articles = () => {
  const w = useWidth();
  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;

  const [articles, setArticles] = useState<Article[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/articles")
      .then((r) => r.json())
      .then(setArticles);
  }, []);

  const visible = useMemo(
    () => (showAll ? articles : articles.slice(0, MAX_VISIBLE)),
    [showAll, articles]
  );

  const hasMore = articles.length > MAX_VISIBLE;

  return (
    <section
      id="articles"
      className={isMobile ? "rounded-b-[64px]" : "py-24 rounded-b-[128px]"}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        paddingTop: isMobile ? "60px" : "120px",
        paddingBottom: isMobile ? "60px" : "80px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${images.heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scaleX(-1)",
          zIndex: -1,
        }}
      />
      <div
        className={
          isMobile
            ? "px-5 w-full"
            : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        }
      >
        <div
          className={
            isMobile
              ? "flex flex-col gap-6 mb-10"
              : "flex flex-col lg:flex-row justify-between items-center mb-20 gap-8 text-left"
          }
        >
          <h4
            className={
              isMobile
                ? "text-3xl font-semibold text-white"
                : "text-6xl lg:w-1/2 font-semibold text-white"
            }
          >
            Articles & Blogs
          </h4>
          <p
            className={
              isMobile
                ? "text-base font-normal"
                : "lg:w-2/5 text-2xl font-normal"
            }
            style={{ color: "rgb(255 255 255 / 65%)" }}
          >
            I write about the things I build, learn, and think about —
            from design and development to ideas that keep me curious.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "1fr 1fr"
                : "1fr 1fr 1fr",
            gap: "32px",
          }}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((article, idx) => (
              <motion.div
                key={article.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="article-card relative bg-[#f5ede0] rounded-3xl overflow-hidden flex flex-col group"
                style={{ minHeight: isMobile ? "380px" : "500px" }}
              >
                <div className="p-8 flex flex-col flex-grow relative z-10">
                  <span className="text-xl font-medium uppercase tracking-widest text-[#333] mb-4">
                    {article.category}
                  </span>
                  <h3
                    className="text-2xl font-bold leading-snug mb-6 transition-colors"
                    style={{ maxWidth: "280px" }}
                  >
                    {article.title}
                  </h3>
                  <div className="relative px-8 pb-8 z-10">
                    <div className="absolute top-4 right-12 w-3 h-3 rounded-full bg-rose-300 opacity-70" />
                    <div className="absolute top-16 right-4 w-2 h-2 rounded-full border border-slate-400 opacity-50" />
                    <div className="absolute top-20 left-8 w-1 h-1 rounded-full bg-slate-500 opacity-60" />
                    <div className="absolute bottom-4 left-2 w-4 h-4 rounded-full border border-slate-400 opacity-40" />
                  </div>
                </div>
                <div className="relative px-8 pb-8">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center gap-2 text-brand-blue font-bold text-xl uppercase tracking-wider hover:gap-4 transition-all mb-6"
                  >
                    Read more <ChevronRight size={16} />
                  </Link>
                  <div className="absolute bottom-0 right-0 w-90 overflow-hidden rounded-br-3xl pointer-events-none">
                    <img
                      src={article.illustr_01}
                      alt="Article illustration"
                      className="w-full h-full object-contain translate-x-6 translate-y-6 z-1 transition-opacity duration-300 group-hover:opacity-0"
                      referrerPolicy="no-referrer"
                    />
                    <img
                      src={article.illustr_02}
                      alt="Article illustration hover"
                      className="w-full h-full object-contain translate-x-6 translate-y-6 z-1 absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show more / Show less butonu */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "48px",
            }}
          >
            <button
              onClick={() => setShowAll((prev) => !prev)}
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1.5px solid rgba(255,255,255,0.3)",
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
                (e.currentTarget as HTMLElement).style.background = "#f6c7b2";
                (e.currentTarget as HTMLElement).style.color = "#1a1a1a";
                (e.currentTarget as HTMLElement).style.borderColor = "#f6c7b2";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.color = "white";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
              }}
            >
              {showAll
                ? "SHOW LESS"
                : `SHOW ALL ARTICLES (${articles.length - MAX_VISIBLE} more)`}
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
  );
};

export default Articles;