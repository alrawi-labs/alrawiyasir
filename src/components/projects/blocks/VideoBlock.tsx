import { VideoBlock as T } from "@/types/project";

export default function VideoBlock({ block }: { block: T }) {
  return (
    <figure style={{ margin: 0 }}>
      <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>{block.heading}</h3>
      <video
        src={block.videoUrl}
        poster={block.posterUrl}
        controls
        playsInline
        style={{ width: "100%", borderRadius: "16px", display: "block", background: "#000" }}
      />
      {block.caption && (
        <figcaption style={{ fontSize: "13px", color: "#888", textAlign: "center", marginTop: "10px" }}>
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}