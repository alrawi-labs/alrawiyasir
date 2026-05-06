"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import ArticleDetailLayout from "./ArticleDetailLayout";
import { Article } from "@/types/article";

export default function ArticleModal({ article }: { article: Article }) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [router]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && router.back()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflowY: "auto",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          background: "#f5ede0",
          borderRadius: "32px",
          width: "100%",
          maxWidth: "900px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            position: "sticky",
            top: "16px",
            float: "right",
            marginRight: "16px",
            zIndex: 10,
            background: "rgba(0,0,0,0.08)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={18} />
        </button>
        <ArticleDetailLayout article={article} isModal={true} />
      </div>
    </div>
  );
}