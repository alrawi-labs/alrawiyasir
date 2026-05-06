import { GalleryBlock as T } from "@/types/project";

export default function GalleryBlock({ block }: { block: T }) {
  return (
    <section>
      <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "20px" }}>{block.heading}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
        {block.images.map((img, i) => (
          <figure key={i} style={{ margin: 0 }}>
            <img src={img.url} alt={img.alt} style={{ width: "100%", borderRadius: "12px", display: "block", aspectRatio: "4/3", objectFit: "cover" }} />
            {img.caption && (
              <figcaption style={{ fontSize: "12px", color: "#888", marginTop: "6px", textAlign: "center" }}>
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}