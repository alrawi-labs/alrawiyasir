"use client";

export default function NavigationLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,10,10,0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Modal — ProjectDetailLayout iskeletini taklit eder */}
      <div
        style={{
          background: "#F5EDE0",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "900px",
          maxHeight: "90vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          padding: "48px 40px",
          boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
        }}
      >
        {/* Category skeleton */}
        <Shimmer width={120} height={10} style={{ marginBottom: 16 }} />

        {/* Title skeleton */}
        <Shimmer width="75%" height={40} style={{ marginBottom: 12 }} />
        <Shimmer width="55%" height={40} style={{ marginBottom: 20 }} />

        {/* Subtitle */}
        <Shimmer width="90%" height={16} style={{ marginBottom: 8 }} />
        <Shimmer width="70%" height={16} style={{ marginBottom: 32 }} />

        {/* Hero image skeleton */}
        <Shimmer width="100%" height={400} style={{ borderRadius: 20, marginBottom: 32 }} />

        {/* Meta grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                background: "rgba(0,0,0,0.04)",
                borderRadius: 12,
                padding: "12px 16px",
              }}
            >
              <Shimmer width={60} height={10} style={{ marginBottom: 8 }} />
              <Shimmer width={80} height={14} />
            </div>
          ))}
        </div>

        {/* Results row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 32,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                background: "#111",
                borderRadius: 16,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Shimmer width={64} height={28} dark />
              <Shimmer width={80} height={10} dark />
              <Shimmer width={100} height={10} dark />
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <Shimmer width={120} height={44} style={{ borderRadius: 50 }} />
          <Shimmer width={100} height={44} style={{ borderRadius: 50 }} />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
      `}</style>
    </div>
  );
}

function Shimmer({
  width,
  height,
  dark = false,
  style = {},
}: {
  width: number | string;
  height: number;
  dark?: boolean;
  style?: React.CSSProperties;
}) {
  const base = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const highlight = dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.10)";

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 8,
        background: `linear-gradient(90deg, ${base} 25%, ${highlight} 50%, ${base} 75%)`,
        backgroundSize: "600px 100%",
        animation: "shimmer 1.4s ease-in-out infinite",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}