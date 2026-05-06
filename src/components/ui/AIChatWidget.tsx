"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ArrowUp, Sparkles } from "lucide-react";

const SYSTEM_PROMPT = `Sen Yasir Alrawi'nin kişisel portfolyo sitesinin yapay zeka asistanısın.
Yasir, Ankara'da yaşayan bir full-stack yazılım geliştiricidir. React, Next.js, TypeScript, Node.js konularında uzmandır.
GitHub: github.com/yasir237 | LinkedIn: linkedin.com/in/yasir-alrawi | Instagram: instagram.com/yasir7_23
Email: yasir7alrawi23@gmail.com | Konum: Ankara, Türkiye
Ziyaretçilerin sorularını Türkçe veya İngilizce yanıtla — kullanıcının diline göre cevap ver.
Kısa, samimi ve profesyonel cevaplar ver. Maksimum 3-4 cümle.
Proje talebi veya iletişim soruları için contact bölümüne yönlendir.`;

const SUGGESTIONS = ["Neler yapıyor?", "Projeleri neler?", "İletişime geç"];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnHov, setBtnHov] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, messages]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply =
        data.content?.find((b: { type: string }) => b.type === "text")?.text ??
        "Bir hata oluştu.";
      setMessages((p) => [...p, { role: "assistant", content: reply }]);
    } catch {
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "Bağlantı hatası, tekrar dene." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ─── Trigger Button ─── */}
      <button
        onMouseEnter={() => setBtnHov(true)}
        onMouseLeave={() => setBtnHov(false)}
        onClick={() => setOpen((v) => !v)}
        aria-label="AI Chat"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          padding: "8px 18px",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.22)",
          background: btnHov
            ? "rgba(255,255,255,0.13)"
            : "rgba(255,255,255,0.07)",
          color: "white",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "2px",
          cursor: "pointer",
          transition: "background 0.2s",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <Sparkles size={13} />
        ASK AI
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#f6c7b2",
            boxShadow: "0 0 6px #f6c7b2",
            animation: "aipulse 2s ease-in-out infinite",
            display: "inline-block",
          }}
        />
      </button>

      {/* ─── Chat Panel ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: "86px",
              right: "32px",
              width: "380px",
              zIndex: 9999,
              borderRadius: "24px",
              overflow: "hidden",
              border: "0.5px solid rgba(0,0,0,0.09)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.13), 0 1.5px 0 rgba(255,255,255,0.7) inset",
            }}
          >
            <div
              style={{
                background: "white",
                display: "flex",
                flexDirection: "column",
                height: "480px",
                position: "relative",
              }}
            >
              {/* ── Header ── */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "18px 20px 14px",
                  background: "#f6c7b2",
                  borderBottom: "0.5px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#1a1a1a",
                      letterSpacing: "-0.5px",
                      flexShrink: 0,
                    }}
                  >
                    YA
                  </div>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        color: "#1a1a1a",
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.3px",
                      }}
                    >
                      Alrawi AI
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#22c55e",
                          display: "inline-block",
                          animation: "aiblink 2s ease-in-out infinite",
                        }}
                      />
                      <span style={{ color: "rgba(26,26,26,0.5)", fontSize: "11px", letterSpacing: "0.5px" }}>
                        Online
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "rgba(0,0,0,0.08)",
                    border: "none",
                    borderRadius: "50%",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(26,26,26,0.5)",
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              {/* ── Messages ── */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "20px 18px 8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  position: "relative",
                  zIndex: 1,
                  background: "#fafafa",
                  scrollbarWidth: "none",
                }}
              >
                {/* Empty state */}
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ textAlign: "center", marginTop: "28px" }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        background: "#f6c7b2",
                        margin: "0 auto 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: 800,
                        color: "#1a1a1a",
                      }}
                    >
                      YA
                    </div>
                    <p
                      style={{
                        color: "#1a1a1a",
                        fontSize: "14px",
                        fontWeight: 600,
                        margin: "0 0 6px",
                        letterSpacing: "0.2px",
                      }}
                    >
                      Yasir hakkında bir şey sor
                    </p>
                    <p
                      style={{
                        color: "rgba(26,26,26,0.4)",
                        fontSize: "12px",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      Projeler, yetenekler ya da iletişim
                    </p>

                    {/* Suggestion chips */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          style={{
                            background: "white",
                            border: "0.5px solid rgba(0,0,0,0.12)",
                            borderRadius: "999px",
                            padding: "7px 14px",
                            color: "#444",
                            fontSize: "12px",
                            fontWeight: 500,
                            cursor: "pointer",
                            letterSpacing: "0.3px",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#f6c7b2";
                            e.currentTarget.style.borderColor = "#f6c7b2";
                            e.currentTarget.style.color = "#1a1a1a";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "white";
                            e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                            e.currentTarget.style.color = "#444";
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Bubbles */}
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "flex",
                      justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                      alignItems: "flex-end",
                      gap: "8px",
                    }}
                  >
                    {msg.role === "assistant" && (
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "#f6c7b2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "8px",
                          fontWeight: 800,
                          color: "#1a1a1a",
                          flexShrink: 0,
                        }}
                      >
                        YA
                      </div>
                    )}
                    <div
                      style={{
                        maxWidth: "72%",
                        padding: "10px 14px",
                        borderRadius:
                          msg.role === "user"
                            ? "18px 18px 4px 18px"
                            : "18px 18px 18px 4px",
                        background:
                          msg.role === "user" ? "#1a1a1a" : "white",
                        border:
                          msg.role === "assistant"
                            ? "0.5px solid rgba(0,0,0,0.08)"
                            : "none",
                        color: msg.role === "user" ? "white" : "#1a1a1a",
                        fontSize: "13px",
                        lineHeight: 1.55,
                        fontWeight: msg.role === "user" ? 600 : 400,
                      }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "#f6c7b2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "8px",
                        fontWeight: 800,
                        color: "#1a1a1a",
                        flexShrink: 0,
                      }}
                    >
                      YA
                    </div>
                    <div
                      style={{
                        padding: "12px 16px",
                        borderRadius: "18px 18px 18px 4px",
                        background: "white",
                        border: "0.5px solid rgba(0,0,0,0.08)",
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: "#bbb",
                            display: "inline-block",
                            animation: `aidot 1.3s ${i * 0.18}s ease-in-out infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* ── Input ── */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "12px 14px 16px",
                  borderTop: "0.5px solid rgba(0,0,0,0.07)",
                  background: "white",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#f9f9f9",
                    border: "0.5px solid rgba(0,0,0,0.12)",
                    borderRadius: "16px",
                    padding: "8px 8px 8px 14px",
                  }}
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send(input)}
                    placeholder="Bir şey sor..."
                    style={{
                      flex: 1,
                      background: "none",
                      border: "none",
                      outline: "none",
                      color: "#1a1a1a",
                      fontSize: "13px",
                      caretColor: "#f6c7b2",
                    }}
                  />
                  <button
                    onClick={() => send(input)}
                    disabled={!input.trim() || loading}
                    style={{
                      width: 32,
                      height: 32,
                      flexShrink: 0,
                      borderRadius: "10px",
                      border: "none",
                      background:
                        input.trim() && !loading ? "#f6c7b2" : "#ebebeb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: input.trim() && !loading ? "pointer" : "default",
                      transition: "background 0.2s",
                    }}
                  >
                    <ArrowUp
                      size={14}
                      color={input.trim() && !loading ? "#1a1a1a" : "#aaa"}
                      strokeWidth={2.5}
                    />
                  </button>
                </div>
                <p
                  style={{
                    margin: "8px 0 0",
                    textAlign: "center",
                    fontSize: "10px",
                    color: "rgba(0,0,0,0.22)",
                    letterSpacing: "0.5px",
                  }}
                >
                  Powered by Claude · alrawi.dev
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes aipulse {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:.4;transform:scale(.8)}
        }
        @keyframes aiblink {
          0%,100%{opacity:1}
          50%{opacity:.3}
        }
        @keyframes aidot {
          0%,80%,100%{transform:translateY(0);opacity:.4}
          40%{transform:translateY(-5px);opacity:1}
        }
      `}</style>
    </>
  );
}