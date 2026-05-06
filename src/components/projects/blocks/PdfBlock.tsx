import { PdfBlock as T } from "@/types/project";
import { FileText, Download } from "lucide-react";

export default function PdfBlock({ block }: { block: T }) {
  return (
    <figure style={{ margin: 0 }}>
      <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>{block.heading}</h3>

      {/* PDF Viewer */}
      <div style={{ width: "100%", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)", background: "#f5f5f5" }}>
        <iframe
          src={`${block.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          style={{ width: "100%", height: "600px", border: "none", display: "block" }}
          title={block.heading}
        />
      </div>

      {/* Caption + Download */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px", flexWrap: "wrap", gap: "8px" }}>
        {block.caption && (
          <figcaption style={{ fontSize: "13px", color: "#888" }}>
            {block.caption}
          </figcaption>
        )}
        <a
          href={block.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#555",
            textDecoration: "none",
            background: "rgba(0,0,0,0.06)",
            padding: "6px 14px",
            borderRadius: "50px",
            letterSpacing: "0.4px",
          }}
        >
          <FileText size={13} />
          Open PDF
          <Download size={13} />
        </a>
      </div>
    </figure>
  );
}