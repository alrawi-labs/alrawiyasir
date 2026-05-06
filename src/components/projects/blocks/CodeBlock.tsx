"use client";

import { useState } from "react";
import { CodeBlock as T } from "@/types/project";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ block }: { block: T }) {
  const [activeTab, setActiveTab] = useState(block.defaultTab ?? 0);
  const [copied, setCopied] = useState(false);

  const current = block.codeBlocks[activeTab];

  const copy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section>
      <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>{block.heading}</h3>

      {/* Tabs */}
      {block.codeBlocks.length > 1 && (
        <div style={{ display: "flex", gap: "4px", marginBottom: "-1px", position: "relative", zIndex: 1 }}>
          {block.codeBlocks.map((cb, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                background: activeTab === i ? "#1e1e1e" : "rgba(0,0,0,0.06)",
                color: activeTab === i ? "#f6c7b2" : "#666",
                border: "none",
                borderRadius: "8px 8px 0 0",
                cursor: "pointer",
              }}
            >
              {cb.label}
            </button>
          ))}
        </div>
      )}

      {/* Code */}
      <div style={{ position: "relative", background: "#1e1e1e", borderRadius: block.codeBlocks.length > 1 ? "0 8px 8px 8px" : "8px", padding: "24px" }}>
        <button
          onClick={copy}
          style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "6px", padding: "6px 8px", cursor: "pointer", color: "white", display: "flex", alignItems: "center", gap: "4px", fontSize: "11px" }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
        <pre style={{ margin: 0, overflowX: "auto" }}>
          <code style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "13px", lineHeight: 1.7, color: "#e8ddd0", whiteSpace: "pre" }}>
            {current.code}
          </code>
        </pre>
      </div>
    </section>
  );
}