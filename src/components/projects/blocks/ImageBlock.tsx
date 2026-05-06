import { ImageBlock as T } from "@/types/project";

export default function ImageBlock({ block }: { block: T }) {
  return (
    <figure style={{ margin: 0 }}>
      <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>{block.heading}</h3>
      <img src={block.imageUrl} alt={block.heading} style={{ width: "100%", borderRadius: "16px", display: "block" }} />
      {block.caption && (
        <figcaption style={{ fontSize: "13px", color: "#888", textAlign: "center", marginTop: "10px" }}>
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}