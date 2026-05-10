"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";

interface ChatBotProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

const SUGGESTED_QUESTIONS = [
  "What are Yasir's main skills?",
  "Tell me about his AI projects",
  "What LLM experience does he have?",
  "Is he available for hire?",
];

const SESSION_ID =
  typeof crypto !== "undefined"
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

function shortenUrl(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");
    const path = u.pathname.replace(/\/$/, "");
    const short = path.length > 22 ? path.slice(0, 22) + "…" : path;
    return host + (short && short !== "/" ? short : "");
  } catch {
    return url.length > 38 ? url.slice(0, 38) + "…" : url;
  }
}

function fixLinks(text: string): string {
  return text.replace(
    /\[((https?:\/\/)[^\]]+)\]/g,
    (_, url) => `[${shortenUrl(url)}](${url})`
  );
}

function fixMarkdown(text: string): string {
  return text
    .split("\n")
    .map((line) => {
      // "* **Kategori**· item1 · item2" veya "- **Kategori**· item1 · item2"
      const match = line.match(/^[*\-]\s+\*\*([^*]+)\*\*[·•]\s*(.+)$/);
      if (!match) return line;

      const category = match[1].trim();
      const items = match[2]
        .split(/\s*[·•]\s*/)
        .filter(Boolean)
        .map((item) => `- ${item.trim()}`)
        .join("\n");

      return `**${category}**\n${items}`;
    })
    .join("\n");
}

const ACCENT = "#e8a87c";
const ACCENT_SOFT = "rgba(232,168,124,0.12)";
const ACCENT_BORDER = "rgba(232,168,124,0.3)";

const ChatBot = ({ isOpen, setIsOpen }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayedContent, setDisplayedContent] = useState<Record<number, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 250);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedContent]);

  const typeMessage = useCallback((index: number, fullText: string) => {
    let i = 0;
    const speed = Math.max(5, Math.min(15, 1800 / fullText.length));
    const tick = () => {
      i++;
      setDisplayedContent((prev) => ({ ...prev, [index]: fullText.slice(0, i) }));
      if (i < fullText.length) {
        typingTimers.current[index] = setTimeout(tick, speed);
      } else {
        setMessages((prev) =>
          prev.map((m, idx) => (idx === index ? { ...m, isTyping: false } : m))
        );
      }
    };
    tick();
  }, []);

  const skipTyping = useCallback((index: number, fullText: string) => {
    if (typingTimers.current[index]) clearTimeout(typingTimers.current[index]);
    setDisplayedContent((prev) => ({ ...prev, [index]: fullText }));
    setMessages((prev) =>
      prev.map((m, idx) => (idx === index ? { ...m, isTyping: false } : m))
    );
  }, []);

  const clearSession = () => {
    Object.values(typingTimers.current).forEach(clearTimeout);
    typingTimers.current = {};
    setMessages([]);
    setDisplayedContent({});
    setInput("");
  };

  const sendMessage = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    const userMsg: Message = { role: "user", content: userText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://yasir723-rag-based-portfolio.hf.space/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "rag-yasir-8x92kLmQ",
        },
        body: JSON.stringify({ question: userText, session_id: SESSION_ID }),
      });
      const data = await res.json();
      const answer = fixMarkdown(
        fixLinks(data.answer ?? "An error occurred, please try again.")
      );

      const assistantIndex = updatedMessages.length;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: answer, isTyping: true },
      ]);
      setDisplayedContent((prev) => ({ ...prev, [assistantIndex]: "" }));
      setTimeout(() => typeMessage(assistantIndex, answer), 80);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error, please try again.",
          isTyping: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = messages.length === 0;

  const mdComponents = {
    p: ({ children }: any) => (
      <p
        style={{
          margin: "0 0 7px",
          lineHeight: 1.7,
          fontSize: "13.5px",
          color: "#1c1c1e",
        }}
      >
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul style={{ margin: "6px 0 10px", padding: 0, listStyle: "none" }}>
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol style={{ margin: "6px 0 10px", paddingLeft: "16px" }}>{children}</ol>
    ),
    li: ({ children }: any) => (
      <li
        style={{
          margin: "6px 0",
          display: "flex",
          alignItems: "flex-start",
          gap: "9px",
          fontSize: "13.5px",
          lineHeight: 1.6,
          color: "#1c1c1e",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: ACCENT,
            flexShrink: 0,
            marginTop: "7px",
            boxShadow: `0 0 0 2px ${ACCENT_SOFT}`,
          }}
        />
        <span style={{ flex: 1, minWidth: 0 }}>{children}</span>
      </li>
    ),
    strong: ({ children }: any) => (
      <strong
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontWeight: 700,
          fontSize: "11px",
          letterSpacing: "0.6px",
          textTransform: "uppercase",
          color: "#b5651d",
          marginTop: "18px",
          marginBottom: "8px",
          paddingBottom: "5px",
          borderBottom: "1px solid rgba(232,168,124,0.25)",
        }}
      >
        <span
          style={{
            width: 3,
            height: 12,
            borderRadius: 2,
            background: "#e8a87c",
            flexShrink: 0,
            display: "inline-block",
          }}
        />
        {children}
      </strong>
    ),
    a: ({ href, children }: any) => (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        title={href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          color: "#b5651d",
          textDecoration: "none",
          fontWeight: 500,
          fontSize: "12px",
          background: ACCENT_SOFT,
          borderRadius: "6px",
          padding: "2px 8px",
          border: `1px solid ${ACCENT_BORDER}`,
          maxWidth: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          verticalAlign: "middle",
          transition: "all 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(232,168,124,0.22)";
          e.currentTarget.style.borderColor = ACCENT;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = ACCENT_SOFT;
          e.currentTarget.style.borderColor = ACCENT_BORDER;
        }}
      >
        <svg
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {typeof children === "string" && children.startsWith("http")
            ? shortenUrl(children)
            : children}
        </span>
      </a>
    ),
    code: ({ children }: any) => (
      <code
        style={{
          background: "#f0f0f0",
          borderRadius: "4px",
          padding: "1px 6px",
          fontSize: "12px",
          fontFamily: "monospace",
          color: "#c0392b",
        }}
      >
        {children}
      </code>
    ),
  };

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "108px",
            right: "28px",
            width: "390px",
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            zIndex: 9998,
            animation: "popUp 0.3s cubic-bezier(0.16,1,0.3,1) both",
            display: "flex",
            flexDirection: "column",
            height: "580px",
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              padding: "16px 18px",
              background: "#fafafa",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexShrink: 0,
            }}
          >
            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  border: `2px solid ${ACCENT_BORDER}`,
                }}
              >
                <img
                  src="/images/vactor_yasir.png"
                  alt="Yasir"
                  style={{ width:"40", height:"40", objectFit: "cover", transform: "translateY(2px)" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 1,
                  right: 1,
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: "#30d158",
                  border: "2px solid #fafafa",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#1c1c1e",
                  letterSpacing: "-0.2px",
                }}
              >
                Yasir's Assistant
              </p>
              <p style={{ margin: "1px 0 0", fontSize: "11.5px", color: "#8e8e93" }}>
                AI · Usually responds instantly
              </p>
            </div>

            <div style={{ display: "flex", gap: "6px" }}>
              {!isEmpty && (
                <button
                  onClick={clearSession}
                  title="Clear conversation"
                  style={{
                    background: "none",
                    border: "none",
                    borderRadius: "8px",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#8e8e93",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f0f0f0";
                    e.currentTarget.style.color = "#1c1c1e";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "none";
                    e.currentTarget.style.color = "#8e8e93";
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  borderRadius: "8px",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#8e8e93",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f0f0f0";
                  e.currentTarget.style.color = "#1c1c1e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#8e8e93";
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Messages ── */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              background: "#ffffff",
              scrollbarWidth: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isEmpty ? (
              /* Empty state */
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "28px 22px",
                  animation: "fadeIn 0.35s ease",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "24px",
                    overflow: "hidden",
                    marginBottom: "18px",
                    border: `2px solid ${ACCENT_BORDER}`,
                    boxShadow: `0 8px 32px rgba(232,168,124,0.35)`,
                  }}
                >
                  <img
                    src="/images/vactor_yasir.png"
                    alt="Yasir"
                    style={{ width:"40", height:"40", objectFit: "cover", transform: "translateY(4px)" }}
                  />
                </div>

                <p
                  style={{
                    margin: "0 0 5px",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#1c1c1e",
                    textAlign: "center",
                    letterSpacing: "-0.3px",
                  }}
                >
                  Hi, I'm Yasir's AI
                </p>
                <p
                  style={{
                    margin: "0 0 26px",
                    fontSize: "13px",
                    color: "#8e8e93",
                    textAlign: "center",
                    lineHeight: 1.5,
                  }}
                >
                  Ask me anything about Yasir's work, skills, or experience.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    width: "100%",
                  }}
                >
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      style={{
                        background: "#f8f8f8",
                        border: "1px solid rgba(0,0,0,0.07)",
                        borderRadius: "12px",
                        padding: "10px 12px",
                        fontSize: "12px",
                        color: "#3a3a3c",
                        cursor: "pointer",
                        textAlign: "left",
                        lineHeight: 1.45,
                        fontWeight: 500,
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, {
                          background: ACCENT_SOFT,
                          borderColor: ACCENT_BORDER,
                          color: "#1c1c1e",
                          transform: "translateY(-1px)",
                        });
                      }}
                      onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, {
                          background: "#f8f8f8",
                          borderColor: "rgba(0,0,0,0.07)",
                          color: "#3a3a3c",
                          transform: "translateY(0)",
                        });
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Privacy notice */}
                <p style={{
                  marginTop: "18px",
                  fontSize: "10.5px",
                  color: "#aeaeb2",
                  textAlign: "center",
                  lineHeight: 1.5,
                }}>
                  🔒 Conversations may be logged to improve response quality.{" "}
                  <span
                    onClick={() => window.open("/privacy", "_blank")}
                    style={{
                      color: "#b5651d",
                      cursor: "pointer",
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                  >
                    Privacy Policy
                  </span>
                </p>
              </div>
            ) : (
              /* Messages list */
              <div
                style={{
                  padding: "18px 16px 10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {messages.map((msg, i) => {
                  const content =
                    msg.role === "assistant"
                      ? (displayedContent[i] ?? "")
                      : msg.content;
                  const isStillTyping = msg.role === "assistant" && msg.isTyping;
                  const isUser = msg.role === "user";

                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: isUser ? "flex-end" : "flex-start",
                        alignItems: "flex-end",
                        gap: "8px",
                        animation: "fadeIn 0.2s ease",
                      }}
                    >
                      {!isUser && (
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            overflow: "hidden",
                            flexShrink: 0,
                            border: `1.5px solid ${ACCENT_BORDER}`,
                          }}
                        >
                          <img
                            src="/images/vactor_yasir.png"
                            alt="Yasir"
                            style={{ width:"40", height:"40", objectFit: "cover", transform: "translateY(2px)" }}
                          />
                        </div>
                      )}
                      <div
                        style={{
                          maxWidth: "76%",
                          padding: isUser ? "10px 15px" : "12px 15px",
                          borderRadius: isUser
                            ? "18px 18px 4px 18px"
                            : "4px 18px 18px 18px",
                          background: isUser
                            ? "linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)"
                            : "#f8f8f8",
                          border: isUser ? "none" : "1px solid rgba(0,0,0,0.06)",
                          color: isUser ? "white" : "#1c1c1e",
                          fontSize: "13.5px",
                          lineHeight: 1.6,
                          fontWeight: isUser ? 500 : 400,
                          boxShadow: isUser
                            ? "0 2px 12px rgba(0,0,0,0.15)"
                            : "0 1px 4px rgba(0,0,0,0.04)",
                          minWidth: 0,
                          overflow: "hidden",
                        }}
                      >
                        {isUser ? (
                          <span style={{ fontSize: "13.5px" }}>{msg.content}</span>
                        ) : (
                          <>
                            <ReactMarkdown components={mdComponents}>{content}</ReactMarkdown>
                            {isStillTyping && (
                              <span style={{
                                display: "inline-block", width: "2px", height: "14px",
                                background: ACCENT, marginLeft: "2px",
                                verticalAlign: "middle", animation: "cursorBlink 0.65s step-end infinite",
                              }} />
                            )}
                          </>
                        )}
                      </div>

                      {/* Skip button — outside the bubble */}
                      {isStillTyping && (
                        <div
                          style={{ position: "relative", display: "inline-flex", alignSelf: "flex-end", marginBottom: "2px" }}
                          onMouseEnter={(e) => {
                            const tip = e.currentTarget.querySelector(".skip-tip") as HTMLElement;
                            if (tip) tip.style.opacity = "1";
                          }}
                          onMouseLeave={(e) => {
                            const tip = e.currentTarget.querySelector(".skip-tip") as HTMLElement;
                            if (tip) tip.style.opacity = "0";
                          }}
                        >
                          <div className="skip-tip" style={{
                            position: "absolute",
                            bottom: "calc(100% + 6px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "#1c1c1e",
                            color: "white",
                            fontSize: "10.5px",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            whiteSpace: "nowrap",
                            opacity: 0,
                            pointerEvents: "none",
                            transition: "opacity 0.15s ease",
                            zIndex: 10,
                          }}>
                            Hepsini göster
                            <div style={{
                              position: "absolute", top: "100%", left: "50%",
                              transform: "translateX(-50%)",
                              width: 0, height: 0,
                              borderLeft: "4px solid transparent",
                              borderRight: "4px solid transparent",
                              borderTop: "4px solid #1c1c1e",
                            }} />
                          </div>
                          <button
                            onClick={() => skipTyping(i, msg.content)}
                            style={{
                              display: "inline-flex", alignItems: "center", justifyContent: "center",
                              background: ACCENT_SOFT,
                              border: `1px solid ${ACCENT_BORDER}`,
                              borderRadius: "6px",
                              width: "22px", height: "22px",
                              color: "#b5651d",
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                              padding: 0,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(232,168,124,0.22)";
                              e.currentTarget.style.borderColor = ACCENT;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = ACCENT_SOFT;
                              e.currentTarget.style.borderColor = ACCENT_BORDER;
                            }}
                          >
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {loading && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "8px",
                      animation: "fadeIn 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        overflow: "hidden",
                        flexShrink: 0,
                        border: `1.5px solid ${ACCENT_BORDER}`,
                      }}
                    >
                      <img
                        src="/images/vactor_yasir.png"
                        alt="Yasir"
                        style={{ width:"40", height:"40", objectFit: "cover", transform: "translateY(2px)" }}
                      />
                    </div>
                    <div
                      style={{
                        padding: "12px 16px",
                        borderRadius: "4px 18px 18px 18px",
                        background: "#f8f8f8",
                        border: "1px solid rgba(0,0,0,0.06)",
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: "#c8c8cc",
                            display: "block",
                            animation: `aidot 1.4s ${i * 0.2}s ease-in-out infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* ── Input ── */}
          <div
            style={{
              padding: "12px 16px 16px",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              background: "#fafafa",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "white",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "14px",
                padding: "8px 8px 8px 16px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "border-color 0.2s",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                onFocus={(e) => {
                  e.currentTarget.parentElement!.style.borderColor = ACCENT;
                }}
                onBlur={(e) => {
                  e.currentTarget.parentElement!.style.borderColor =
                    "rgba(0,0,0,0.1)";
                }}
                placeholder="Ask something about Yasir..."
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "#1c1c1e",
                  fontSize: "13.5px",
                  caretColor: ACCENT,
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                style={{
                  width: 34,
                  height: 34,
                  flexShrink: 0,
                  borderRadius: "10px",
                  border: "none",
                  background:
                    input.trim() && !loading
                      ? `linear-gradient(135deg, ${ACCENT} 0%, #d4956a 100%)`
                      : "#efefef",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: input.trim() && !loading ? "pointer" : "default",
                  transition: "all 0.15s ease",
                  boxShadow:
                    input.trim() && !loading
                      ? "0 2px 8px rgba(232,168,124,0.4)"
                      : "none",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={input.trim() && !loading ? "white" : "#aaa"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </div>
            <p
              style={{
                margin: "8px 0 0",
                textAlign: "center",
                fontSize: "10.5px",
                color: "#aeaeb2",
                letterSpacing: "0.2px",
              }}
            >
              ⚡ First response may take ~30s to wake up
            </p>
          </div>
        </div>
      )}

      {/* ── FAB ── */}
      <div style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 500 }}>
        {!isOpen && (
          <div
            style={{
              position: "absolute",
              bottom: "70px",
              right: 0,
              pointerEvents: "none",
              animation: "fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "7px 14px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                border: "1px solid rgba(0,0,0,0.06)",
                whiteSpace: "nowrap",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "12.5px",
                  fontWeight: 600,
                  color: "#1c1c1e",
                }}
              >
                ✦ Ask AI about Yasir
              </p>
            </div>
            {/* Arrow */}
            <div
              style={{
                position: "absolute",
                bottom: -5,
                right: 20,
                width: 10,
                height: 10,
                background: "white",
                border: "1px solid rgba(0,0,0,0.06)",
                borderTop: "none",
                borderLeft: "none",
                transform: "rotate(45deg)",
              }}
            />
          </div>
        )}

        <div style={{ position: "relative", width: "56px", height: "56px" }}>
          {/* Pulse rings */}
          {isOpen == false && (
            <>
              <div
                style={{
                  position: "absolute",
                  inset: "-10px",
                  borderRadius: "50%",
                  background: ACCENT,
                  opacity: 0.15,
                  animation: "pulse 2.5s ease-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "-5px",
                  borderRadius: "50%",
                  background: ACCENT,
                  opacity: 0.12,
                  animation: "pulse 2.5s ease-out infinite 0.6s",
                }}
              />
            </>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${ACCENT} 0%, #d4956a 100%)`,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 4px 20px rgba(232,168,124,0.45)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 6px 28px rgba(232,168,124,0.55)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 20px rgba(232,168,124,0.45)";
            }}
          >
            {isOpen ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="11"
                  y1="1"
                  x2="11"
                  y2="4"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="11" cy="0.8" r="1.1" fill="white" />
                <rect
                  x="3"
                  y="4"
                  width="16"
                  height="12"
                  rx="3"
                  fill="white"
                  fillOpacity="0.9"
                />
                <circle cx="8" cy="9" r="1.8" fill="#d4956a" />
                <circle cx="14" cy="9" r="1.8" fill="#d4956a" />
                <circle cx="8.5" cy="9.4" r="0.8" fill="white" />
                <circle cx="14.5" cy="9.4" r="0.8" fill="white" />
                <path
                  d="M7.5 12 Q11 13.8 14.5 12"
                  stroke="#d4956a"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                />
                <rect
                  x="1"
                  y="7.5"
                  width="2"
                  height="3.5"
                  rx="1"
                  fill="white"
                  fillOpacity="0.9"
                />
                <rect
                  x="19"
                  y="7.5"
                  width="2"
                  height="3.5"
                  rx="1"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popUp {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes aidot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes pulse {
          0%   { transform: scale(1);   opacity: 0.15; }
          70%  { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default ChatBot;