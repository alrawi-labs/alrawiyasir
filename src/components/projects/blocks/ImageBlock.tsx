import { useState } from "react";
import { ImageBlock as T } from "@/types/project";

export default function ImageBlock({ block }: { block: T }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <figure style={{ margin: 0 }}>
      <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>
        {block.heading}
      </h3>
      <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden" }}>
        {!imgLoaded && (
          <div
            style={{
              width: "100%",
              height: "300px",
              background: "linear-gradient(90deg, rgb(237 234 229) 25%, rgb(219 213 204) 50%, rgb(245 237 224) 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
        )}
        <img
          src={block.imageUrl}
          alt={block.heading}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%",
            borderRadius: "16px",
            display: "block",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.4s ease",
            position: imgLoaded ? "static" : "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
      {block.caption && (
        <figcaption
          style={{
            fontSize: "13px",
            color: "#888",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          {block.caption}
        </figcaption>
      )}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </figure>
  );
}