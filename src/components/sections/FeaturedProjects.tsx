"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import useWidth from "../../../hooks/useWidth";
import images from "../../../constants/images";
import Link from "next/link";
import { Project } from "@/types/project";

const MAX_VISIBLE = 9;

const FeaturedProjects = () => {
  const w = useWidth();
  const isMobile = w < 768;
  const isTablet = w >= 768 && w < 1024;

  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTag, setActiveTag] = useState("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects);
  }, []);

  const ALL_TAGS = [
    "All",
    ...Array.from(new Set(projects.flatMap((p) => p.category))),
  ];

  const filtered = useMemo(
    () =>
      activeTag === "All"
        ? projects
        : projects.filter((p) => p.category.includes(activeTag)),
    [activeTag, projects],
  );

  const visible = showAll ? filtered : filtered.slice(0, MAX_VISIBLE);
  const hasMore = filtered.length > MAX_VISIBLE;

  const handleTag = (tag: string) => {
    setActiveTag(tag);
    setShowAll(false);
  };

  const truncateWords = (text: string, limit = 10) => {
    const words = text.split(/\s+/).filter(Boolean);
    return words.length <= limit
      ? text
      : `${words.slice(0, limit).join(" ")}...`;
  };

  return (
    <section
      id="projects"
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
      {/* Background */}
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
        {/* Header */}
        <div
          className={
            isMobile
              ? "flex flex-col gap-6 mb-10"
              : "flex flex-row justify-between items-end mb-12 gap-8"
          }
        >
          <h4
            className={
              isMobile
                ? "text-3xl font-semibold text-white"
                : "text-6xl w-100 font-semibold text-white"
            }
          >
            Featured Projects
          </h4>
          {!isMobile && (
            <span
              style={{
                fontSize: "58px",
                fontWeight: 900,
                color: "white",
                opacity: 0.5,
                letterSpacing: "-4px",
                lineHeight: 1,
                userSelect: "none",
                alignSelf: "flex-end",
              }}
            >
              {filtered.length} PROJECT
            </span>
          )}
        </div>

        {/* Kategori filtreleri */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: isMobile ? "32px" : "48px",
          }}
        >
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTag(tag)}
              style={{
                padding: "8px 20px",
                borderRadius: "50px",
                border: "1.5px solid",
                borderColor:
                  activeTag === tag ? "#f6c7b2" : "rgba(255,255,255,0.25)",
                background:
                  activeTag === tag ? "#f6c7b2" : "rgba(255,255,255,0.08)",
                color: activeTag === tag ? "#1a1a1a" : "white",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.5px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {tag}
            </button>
          ))}
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
            {visible.map((project, idx) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="project-card relative bg-[#f5ede0] rounded-3xl overflow-hidden flex flex-col group"
                style={{ minHeight: isMobile ? "380px" : "500px" }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "100%",
                    height: isMobile ? "180px" : "220px",
                    overflow: "hidden",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    className="group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow relative z-10">
                  <span className="text-xl font-medium uppercase tracking-widest text-[#333] mb-4">
                    {project.title}
                  </span>
                  <p
                    className="leading-snug mb-6"
                    style={{ maxWidth: "380px" }}
                  >
                    {truncateWords(project.description, 10)}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      flexGrow: 1,
                      alignContent: "flex-start",
                    }}
                  >
                    {project.technologies.slice(0, 5).map((t) => (
                      <span
                        key={t.name}
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          color: "#666",
                          background: "rgba(0,0,0,0.07)",
                          borderRadius: "50px",
                          padding: "4px 12px",
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                        }}
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link */}
                <div className="px-8 pb-8 relative z-10">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-brand-blue font-bold text-xl uppercase tracking-wider hover:gap-4 transition-all"
                  >
                    View Project <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show more / Show less */}
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
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.color = "white";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.3)";
              }}
            >
              {showAll
                ? "SHOW LESS"
                : `SHOW ALL PROJECTS (${filtered.length - MAX_VISIBLE} more)`}
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

export default FeaturedProjects;
