"use client";

import { useState, useEffect } from "react";
import { X, ExternalLink, ArrowLeft } from "lucide-react";
import ContentBlockRenderer from "@/components/projects/ContentBlockRenderer";
import { SubPage } from "@/types/article";

export default function SubPagesPanel({ subPages }: { subPages: SubPage[] }) {
  const [activePage, setActivePage] = useState<SubPage | null>(null);
  const [visible, setVisible] = useState(false);

  const open = (page: SubPage) => { 
    setActivePage(page);
    setTimeout(() => setVisible(true), 10);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setVisible(false);
    setTimeout(() => {
      setActivePage(null);
      document.body.style.overflow = "";
    }, 400);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Step cards */}
      <div style={{ marginTop: "72px" }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#999",
            display: "block",
            marginBottom: "20px",
          }}
        >
          Adımlar
        </span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "12px",
          }}
        >
          {subPages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => open(page)}
              style={{
                background: "rgba(0,0,0,0.03)",
                border: "1.5px solid rgba(0,0,0,0.08)",
                borderRadius: "16px",
                padding: "20px 22px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#e6c1ae";
                el.style.borderColor = "#153767";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(0,0,0,0.03)";
                el.style.borderColor = "rgba(0,0,0,0.08)";
                el.style.transform = "translateY(0)";
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#153767",
                  opacity: 0.6,
                }}
              >
                Adım {index + 1}
              </span>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#111",
                  lineHeight: 1.4,
                }}
              >
                {/* Title without "Adım N —" prefix if present */}
                {page.title.replace(/^Adım \d+ — /, "")}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Full-screen bottom sheet */}
      {activePage && (
        <>
          {/* Backdrop */}
          <div
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 200,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          />

          {/* Panel */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              height: "92vh",
              background: "#fff",
              borderRadius: "24px 24px 0 0",
              zIndex: 201,
              transform: visible ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Panel header */}
            <div
              style={{
                padding: "20px 32px 16px",
                borderBottom: "1px solid rgba(0,0,0,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <button
                  onClick={close}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#666",
                    fontSize: "14px",
                    fontWeight: 600,
                    padding: "6px 0",
                  }}
                >
                  <ArrowLeft size={16} />
                  Geri
                </button>

                <span style={{ color: "rgba(0,0,0,0.15)", fontSize: "18px" }}>|</span>

                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#111",
                  }}
                >
                  {activePage.title}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {activePage.link && (
                  <a
                    href={activePage.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "#e6c1ae",
                      border: "0.5px solid #153767",
                      borderRadius: "50px",
                      padding: "8px 18px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#153767",
                      textDecoration: "none",
                      letterSpacing: "0.4px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "#153767";
                      el.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "#e6c1ae";
                      el.style.color = "#153767";
                    }}
                  >
                    Koda Bak
                    <ExternalLink size={11} />
                  </a>
                )}

                <button
                  onClick={close}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(0,0,0,0.12)",
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#666",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "#111";
                    el.style.color = "white";
                    el.style.borderColor = "#111";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "transparent";
                    el.style.color = "#666";
                    el.style.borderColor = "rgba(0,0,0,0.12)";
                  }}
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div
              style={{
                overflowY: "auto",
                flex: 1,
                padding: "48px 32px 64px",
                maxWidth: "860px",
                width: "100%",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "48px",
              }}
            >
              {activePage.contentBlocks.map((block, i) => (
                <ContentBlockRenderer key={i} block={block} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}