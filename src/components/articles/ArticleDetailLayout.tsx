"use client";

import { useRouter } from "next/navigation";
import { Article } from "@/types/article";
import ContentBlockRenderer from "@/components/projects/ContentBlockRenderer";
import SubPagesPanel from "@/components/articles/SubPagesPanel";

import { ArrowLeft, Calendar, Clock, ExternalLink, Tag } from "lucide-react";

export default function ArticleDetailLayout({
  article,
  isModal,
}: {
  article: Article;
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
            cursor: "pointer",
            color: "white",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform =
              "translateX(-4px) scale(1.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform =
              "translateX(0) scale(1)";
          }}
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Back to Articles
        </button>
      )}

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
          {article.category}
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
          {article.title}
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "rgba(0,0,0,0.6)",
            lineHeight: 1.6,
            marginBottom: "32px",
          }}
        >
          {article.subtitle}
        </p>

        <img
          src={article.coverImage}
          alt={article.title}
          style={{
            width: "100%",
            borderRadius: "20px",
            aspectRatio: "16/9",
            objectFit: "cover",
            marginBottom: "32px",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          {[
            {
              icon: <Tag size={13} />,
              label: "Category",
              value: article.category,
              isLink: false,
            },
            {
              icon: <Calendar size={13} />,
              label: "Date",
              value: article.date,
              isLink: false,
            },
            {
              icon: <Clock size={13} />,
              label: "Read Time",
              value: article.readTime,
              isLink: false,
            },
            {
              icon: <ExternalLink size={13} />,
              label: "Link",
              value: article.link,
              isLink: true,
            },
          ].map((item) =>
            item.isLink ? (
              <a
                key={item.label}
                href={item.value}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#e6c1ae",
                  borderRadius: "12px",
                  border: "0.5px solid #153767",
                  padding: "12px 16px",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#153767",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  {item.icon} {item.label}
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#153767",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Open source
                  <ExternalLink size={11} />
                </p>
              </a>
            ) : (
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
                    fontWeight: 500,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    marginBottom: "6px",
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
            ),
          )}
        </div>
      </header>

      {/* Ana içerik blokları */}
      <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
        {article.contentBlocks.map((block, i) => (
          <ContentBlockRenderer key={i} block={block} />
        ))}
      </div>

      {/* Alt sayfalar — sadece varsa render et */}
      {article.subPages && article.subPages.length > 0 && (
        <SubPagesPanel subPages={article.subPages} />
      )}

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
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#111";
          }}
        >
          <ArrowLeft size={14} /> Back to Articles
        </button>
      </div>
    </article>
  );
}
