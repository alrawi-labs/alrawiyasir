"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import ContentBlockRenderer from "@/components/projects/ContentBlockRenderer";
import { SubPage } from "@/types/article";

export default function SubPagesAccordion({ subPages }: { subPages: SubPage[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "64px" }}>
      <h2
        style={{
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "#888",
          marginBottom: "8px",
        }}
      >
        Adımlar
      </h2>

      {subPages.map((page, index) => {
        const isOpen = openId === page.id;

        return (
          <div
            key={page.id}
            style={{
              border: isOpen ? "1.5px solid #153767" : "1.5px solid rgba(0,0,0,0.1)",
              borderRadius: "16px",
              overflow: "hidden",
              transition: "border-color 0.2s ease",
            }}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggle(page.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                background: isOpen ? "rgba(21,55,103,0.04)" : "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.2s ease",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                {/* Step number badge */}
                <span
                  style={{
                    minWidth: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: isOpen ? "#153767" : "rgba(0,0,0,0.07)",
                    color: isOpen ? "white" : "#555",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    transition: "all 0.2s ease",
                  }}
                >
                  {index + 1}
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: isOpen ? "#153767" : "#111",
                    transition: "color 0.2s ease",
                  }}
                >
                  {page.title}
                </span>
              </div>

              <ChevronDown
                size={18}
                style={{
                  color: isOpen ? "#153767" : "#aaa",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease, color 0.2s ease",
                  flexShrink: 0,
                }}
              />
            </button>

            {/* Accordion Body */}
            <div
              style={{
                maxHeight: isOpen ? "9999px" : "0px",
                overflow: "hidden",
                transition: isOpen
                  ? "max-height 0.5s ease"
                  : "max-height 0.3s ease",
              }}
            >
              <div
                style={{
                  padding: "0 24px 28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "40px",
                  borderTop: "1px solid rgba(0,0,0,0.07)",
                  paddingTop: "28px",
                }}
              >
                {/* Content blocks */}
                {page.contentBlocks.map((block, i) => (
                  <ContentBlockRenderer key={i} block={block} />
                ))}

                {/* "Koda Bak" button */}
                {page.link && (
                  <div>
                    <a
                      href={page.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#e6c1ae",
                        border: "0.5px solid #153767",
                        borderRadius: "50px",
                        padding: "12px 24px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#153767",
                        textDecoration: "none",
                        letterSpacing: "0.5px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "#153767";
                        (e.currentTarget as HTMLElement).style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "#e6c1ae";
                        (e.currentTarget as HTMLElement).style.color = "#153767";
                      }}
                    >
                      Koda Bak
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}