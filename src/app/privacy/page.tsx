export const metadata = {
  title: "Privacy Policy | Yasir Alrawi",
};

export default function PrivacyPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#f5f5f7",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: "60px 24px",
    }}>
      <div style={{
        maxWidth: "680px",
        margin: "0 auto",
        background: "white",
        borderRadius: "20px",
        padding: "48px 52px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "12px", color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "10px" }}>
            Legal
          </p>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1c1c1e", letterSpacing: "-0.5px", margin: "0 0 10px" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "13px", color: "#8e8e93", margin: 0 }}>
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Sections */}
        {[
          {
            title: "Overview",
            body: "This privacy policy explains how conversations with the AI assistant on yasiralrawi.com are handled. The assistant is designed to answer questions about Yasir Alrawi's portfolio, skills, and experience.",
          },
          {
            title: "What We Collect",
            body: "When you use the AI chat assistant, your questions and the assistant's responses may be logged. Each session is assigned a random, anonymous session ID — no personally identifiable information (name, email, IP address) is collected or stored.",
          },
          {
            title: "Why We Collect It",
            body: "Logs are used solely to review the quality of AI responses and improve the chatbot's accuracy over time. They are not used for advertising, profiling, or any commercial purpose.",
          },
          {
            title: "Data Storage",
            body: "Logs are stored securely on the backend server. They are not shared with any third parties. Data may be retained for up to 90 days before being permanently deleted.",
          },
          {
            title: "Your Rights",
            body: "You have the right to request deletion of any logged conversation. To do so, contact me directly via email. Under KVKK (Turkey) and GDPR (EU), you may also request access to or correction of any data held about you.",
          },
          {
            title: "Third-Party Services",
            body: "The AI assistant uses Groq's API (for language model inference) and Google Gemini (for embeddings). These services process your messages in order to generate responses. Please refer to their respective privacy policies for more information.",
          },
          {
            title: "Contact",
            body: "For any privacy-related questions or requests, please reach out at: yasir@yasiralrawi.com",
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: "32px" }}>
            <h2 style={{
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              color: "#b5651d",
              margin: "0 0 10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <span style={{
                display: "inline-block",
                width: 3, height: 12,
                borderRadius: 2,
                background: "#e8a87c",
              }} />
              {section.title}
            </h2>
            <p style={{
              fontSize: "14.5px",
              color: "#3a3a3c",
              lineHeight: 1.75,
              margin: 0,
            }}>
              {section.body}
            </p>
          </div>
        ))}

        {/* Back link */}
        <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #f0f0f0" }}>
          <a href="/" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontSize: "13px", color: "#b5651d", textDecoration: "none", fontWeight: 500,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Portfolio
          </a>
        </div>
      </div>
    </main>
  );
}