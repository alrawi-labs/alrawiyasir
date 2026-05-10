export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 99999,
        background: "rgba(246,199,178,0.2)",
      }}
    >
      <div
        style={{
          height: "100%",
          background: "#f6c7b2",
          animation: "loadingBar 1.5s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes loadingBar {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 70%; margin-left: 15%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}