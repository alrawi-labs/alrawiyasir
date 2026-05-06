"use client";

import { useRouter } from "next/navigation";
import { Project } from "@/types/project";
import ContentBlockRenderer from "./ContentBlockRenderer";
import {
  ExternalLink,
  Github,
  ShoppingCart,
  Clock,
  Users,
  Tag,
  ArrowLeft,
} from "lucide-react";

export default function ProjectDetailLayout({
  project,
  isModal,
}: {
  project: Project;
  isModal: boolean;
}) {
  const router = useRouter();

  return (
    <article
      style={{
        padding: isModal ? "48px 40px" : "80px 24px",
        maxWidth: isModal ? "100%" : "900px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Floating back butonu — sadece tam sayfada */}
      {!isModal && (
        <button
          onClick={() => router.back()}
          style={{
            position: "fixed",
            top: "24px",
            left: "24px",
            zIndex: 100,
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "#111",
            border: "none",
            borderRadius: "50px",
            padding: "14px 28px 14px 20px",
            fontSize: "15px",
            fontWeight: 800,
            letterSpacing: "0.5px",
            cursor: "pointer",
            color: "white",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform =
              "translateX(-4px) scale(1.04)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 12px 40px rgba(0,0,0,0.45)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform =
              "translateX(0) scale(1)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 8px 32px rgba(0,0,0,0.35)";
          }}
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Back to All Project
        </button>
      )}

      {/* Hero */}
      <header style={{ marginBottom: "48px" }}>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#888",
            display: "block",
            marginBottom: "12px",
          }}
        >
          {Array.isArray(project.category)
            ? project.category.join(" · ")
            : project.category}
        </span>
        <h1
          style={{
            fontSize: isModal ? "32px" : "48px",
            fontWeight: 600,
            letterSpacing: "-1px",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          {project.title}
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "rgba(0,0,0,0.6)",
            lineHeight: 1.6,
            marginBottom: "32px",
          }}
        >
          {project.subtitle}
        </p>

        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            borderRadius: "20px",
            aspectRatio: "16/9",
            objectFit: "cover",
            marginBottom: "32px",
          }}
        />

        {/* Meta grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {[
            {
              icon: <Clock size={14} />,
              label: "Duration",
              value: project.duration,
            },
            {
              icon: <Users size={14} />,
              label: "Team",
              value: `${project.teamSize} person`,
            },
            { icon: <Tag size={14} />, label: "Role", value: project.role },
            { icon: <Clock size={14} />, label: "Date", value: project.date },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(0,0,0,0.05)",
                borderRadius: "12px",
                padding: "12px 16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#888",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                {item.icon} {item.label}
              </div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#111",
                  margin: 0,
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${project.results.length}, 1fr)`,
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            {project.results.map((r) => (
              <div
                key={r.metric}
                style={{
                  background: "#111",
                  borderRadius: "16px",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#f6c7b2",
                    margin: "0 0 4px",
                  }}
                >
                  {r.value}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    margin: "0 0 4px",
                  }}
                >
                  {r.metric}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    margin: 0,
                  }}
                >
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#111",
                color: "white",
                borderRadius: "50px",
                padding: "12px 24px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(0,0,0,0.08)",
                color: "#111",
                borderRadius: "50px",
                padding: "12px 24px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              <Github size={14} /> GitHub
            </a>
          )}
          {project.buy && (
            <a
              href={project.buy.buylink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#f6c7b2",
                color: "#111",
                borderRadius: "50px",
                padding: "12px 24px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              <ShoppingCart size={14} /> Buy — {project.buy.price}
            </a>
          )}
        </div>
      </header>

      {/* Content Blocks */}
      <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
        {project.contentBlocks.map((block, i) => (
          <ContentBlockRenderer key={i} block={block} />
        ))}
      </div>

      {/* Testimonial */}
      {project.testimonial && (
        <blockquote
          style={{
            margin: "56px 0 0",
            background: "#111",
            borderRadius: "24px",
            padding: "40px",
            color: "white",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              lineHeight: 1.6,
              fontStyle: "italic",
              marginBottom: "24px",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            "{project.testimonial.text}"
          </p>
          <footer>
            <strong style={{ color: "#f6c7b2" }}>
              {project.testimonial.author}
            </strong>
            <span style={{ color: "rgba(255,255,255,0.4)", marginLeft: "8px" }}>
              — {project.testimonial.position}
            </span>
          </footer>
        </blockquote>
      )}

      {/* Alt back butonu */}
      <div
        style={{
          marginTop: "80px",
          paddingBottom: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "transparent",
            border: "1.5px solid rgba(0,0,0,0.15)",
            borderRadius: "50px",
            padding: "14px 32px",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            cursor: "pointer",
            color: "#111",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#111";
            (e.currentTarget as HTMLElement).style.color = "white";
            (e.currentTarget as HTMLElement).style.borderColor = "#111";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#111";
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(0,0,0,0.15)";
          }}
        >
          <ArrowLeft size={14} /> Back to Projects
        </button>
      </div>
    </article>
  );
}
