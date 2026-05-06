import { TextBlock as T } from "@/types/project";
import ReactMarkdown from "react-markdown";

export default function TextBlock({ block }: { block: T }) {
  return (
    <section>
      {block.subheading && (
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#888", marginBottom: "8px" }}>
          {block.subheading}
        </p>
      )}
      <h2 style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.5px", marginBottom: "20px" }}>
        {block.heading}
      </h2>
      <div className="prose prose-neutral max-w-none" style={{ fontSize: "17px", lineHeight: 1.75, color: "rgba(0,0,0,0.7)" }}>
        <ReactMarkdown>{block.content}</ReactMarkdown>
      </div>
    </section>
  );
}