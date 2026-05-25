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

interface ActionCard {
  type:
    | "projects"
    | "contact"
    | "skills"
    | "articles"
    | "education"
    | "experience"
    | "volunteering"
    | "languages"
    | "certificate";
  title: string;
  subtitle: string;
  buttonLabel: string;
  targetId: string;
}

interface NavigationAction {
  type: "navigate";
  url: string;
  label: string;
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

const LS_KEY_DISMISSED = "chatbot_nav_dismissed";
function getNavDismissed(): boolean {
  try { return localStorage.getItem(LS_KEY_DISMISSED) === "true"; } catch { return false; }
}
function setNavDismissed() {
  try { localStorage.setItem(LS_KEY_DISMISSED, "true"); } catch {}
}
function clearNavDismissed() {
  try { localStorage.removeItem(LS_KEY_DISMISSED); } catch {}
}

const LS_KEY = "chatbot_nav_accepted";
function getNavAccepted(): boolean {
  try { return localStorage.getItem(LS_KEY) === "true"; } catch { return false; }
}
function setNavAccepted() {
  try { localStorage.setItem(LS_KEY, "true"); } catch {}
}
function clearNavAccepted() {
  try { localStorage.removeItem(LS_KEY); } catch {}
}

const URL_TO_ID: Record<string, string> = {
  "#home": "home",
  "#projects": "projects",
  "#articles": "articles",
  "#contact": "contact",
  "#skills": "skills",
  "#education": "education",
  "#experience": "experience",
  "#volunteering": "volunteering",
  "#certificate": "certificate",
  "#languages": "languages",
};

const URL_TO_CARD: Record<string, Omit<ActionCard, "targetId">> = {
  "#projects": { type: "projects", title: "Explore Projects", subtitle: "Live demos and source code from Yasir's builds", buttonLabel: "View Projects" },
  "#contact": { type: "contact", title: "Let's Connect", subtitle: "Reach out for work, collab, or just a hello", buttonLabel: "Open Contact" },
  "#skills": { type: "skills", title: "Tech Stack", subtitle: "Languages, frameworks and tools Yasir works with", buttonLabel: "View Skills" },
  "#articles": { type: "articles", title: "Read the Blog", subtitle: "Yasir's takes on AI, engineering and beyond", buttonLabel: "Browse Articles" },
  "#education": { type: "education", title: "Academic Background", subtitle: "Degrees, courses and institutions that shaped Yasir", buttonLabel: "View Education" },
  "#experience": { type: "experience", title: "Work Experience", subtitle: "Roles, companies and impact across Yasir's career", buttonLabel: "View Experience" },
  "#volunteering": { type: "volunteering", title: "Volunteering", subtitle: "Community work and causes Yasir contributes to", buttonLabel: "View Volunteering" },
  "#certificate": { type: "certificate", title: "Certificates", subtitle: "Courses and credentials Yasir has earned", buttonLabel: "View Certificates" },
  "#languages": { type: "languages", title: "languages", subtitle: "Languages that Yasir speaks", buttonLabel: "View Languages" },
};

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
  return text.replace(/\[((https?:\/\/)[^\]]+)\]/g, (_, url) => `[${shortenUrl(url)}](${url})`);
}

function fixMarkdown(text: string): string {
  return text.split("\n").map((line) => {
    const match = line.match(/^[*\-]\s+\*\*([^*]+)\*\*[·•]\s*(.+)$/);
    if (!match) return line;
    const category = match[1].trim();
    const items = match[2].split(/\s*[·•]\s*/).filter(Boolean).map((item) => `- ${item.trim()}`).join("\n");
    return `**${category}**\n${items}`;
  }).join("\n");
}

const ACCENT = "#e8a87c";
const ACCENT_SOFT = "rgba(232,168,124,0.12)";
const ACCENT_BORDER = "rgba(232,168,124,0.3)";

/* ── useIsMobile hook ── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

const ChatBot = ({ isOpen, setIsOpen }: ChatBotProps) => {
  const isMobile = useIsMobile();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayedContent, setDisplayedContent] = useState<Record<number, string>>({});

  const [actionCard, setActionCard] = useState<ActionCard | null>(null);
  const [actionVisible, setActionVisible] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [cornersVisible, setCornersVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [cardShow, setCardShow] = useState(false);
  const [char1Above, setChar1Above] = useState(false);
  const [char1Visible, setChar1Visible] = useState(false);
  const [char2Visible, setChar2Visible] = useState(false);
  const [char3Visible, setChar3Visible] = useState(false);
  const [char3Above, setChar3Above] = useState(false);
  const [answeredVisible, setAnsweredVisible] = useState(false);
  const [navEnabled, setNavEnabled] = useState(getNavAccepted());
  const [lastTargetId, setLastTargetId] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  const typingPausedRef = useRef(false);
  const typingResumeRef = useRef<(() => void) | null>(null);
  const pendingActionRef = useRef<ActionCard | null>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 250);
  }, [isOpen]);

  // Mobilde scroll'u kilitle
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedContent]);

  const showDiamondCard = useCallback((card: ActionCard) => {
    setActionCard(card);
    setActionVisible(true);
    setScanActive(true);
    setChar2Visible(false);
    if (answeredVisible) {
      setChar3Visible(true);
      setChar3Above(false);
      setTimeout(() => setChar3Above(true), 400);
      setTimeout(() => { setChar3Above(false); setChar3Visible(false); }, 5 * 1000);
    }
    setTimeout(() => setCornersVisible(true), 400);
    setTimeout(() => setGridVisible(true), 700);
    setTimeout(() => setCardShow(true), 1050);
    setTimeout(() => setScanActive(false), 1400);
  }, [answeredVisible]);

  const dismissDiamond = useCallback(() => {
    setCardShow(false);
    setGridVisible(false);
    setCornersVisible(false);
    setTimeout(() => { setActionCard(null); setActionVisible(false); }, 400);
    setTimeout(() => {
      typingPausedRef.current = false;
      const resume = typingResumeRef.current;
      typingResumeRef.current = null;
      resume?.();
    }, 450);
  }, []);

  const handleNavAction = useCallback((navAction: NavigationAction) => {
    const targetId = URL_TO_ID[navAction.url];
    if (!targetId) return;
    setLastTargetId(targetId);
    if (getNavAccepted()) {
      
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => setChar2Visible(true), 300);
        setTimeout(() => setChar2Visible(false), 5 * 1000);
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (getNavDismissed()) {
      setAnsweredVisible(true);
    } else {
      const cardMeta = URL_TO_CARD[navAction.url];
      if (!cardMeta) return;
      showDiamondCard({ ...cardMeta, targetId });
    }
  }, [showDiamondCard]);

  const handleActionClick = useCallback((card: ActionCard) => {
    setNavAccepted();
    dismissDiamond();
    clearNavDismissed();
    setAnsweredVisible(true);
    setChar1Above(false);
    setChar1Visible(false);
    const el = document.getElementById(card.targetId);
    if (el) {
      setTimeout(() => { setChar2Visible(true); }, 300);
      setTimeout(() => {
        setChar1Visible(true);
        setChar1Above(false);
        setTimeout(() => setChar1Above(true), 400);
        setChar2Visible(false);
      }, 5 * 1000);
      el.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      typingPausedRef.current = false;
      const resume = typingResumeRef.current;
      typingResumeRef.current = null;
      resume?.();
    }, 450);
  }, [dismissDiamond]);

  const handleNoActionClick = useCallback(() => {
    dismissDiamond();
    setNavDismissed();
    setAnsweredVisible(true);
    setChar3Visible(true);
    setChar3Above(false);
    setTimeout(() => setChar3Above(true), 400);
    setTimeout(() => { setChar3Above(false); setChar3Visible(false); }, 5 * 1000);
    setTimeout(() => {
      typingPausedRef.current = false;
      const resume = typingResumeRef.current;
      typingResumeRef.current = null;
      resume?.();
    }, 450);
  }, [dismissDiamond]);

  const handleToggleActionMode = useCallback(() => {
    if (getNavAccepted()) {
      clearNavAccepted();
      clearNavDismissed();
      setNavEnabled(false);
      setChar3Visible(true);
      setChar3Above(false);
      setTimeout(() => setChar3Above(true), 400);
      setTimeout(() => { setChar3Above(false); setChar3Visible(false); }, 5 * 1000);
    } else {
      setChar3Above(false);
      setChar3Visible(false);
      setNavAccepted();
      clearNavDismissed();
      setNavEnabled(true);
      if (lastTargetId) {
        const el = document.getElementById(lastTargetId);
        if (el) {
          setChar1Visible(false);
          setChar1Above(false);
          setTimeout(() => { setChar2Visible(true); }, 300);
          setTimeout(() => {
            setChar1Visible(true);
            setChar1Above(false);
            setTimeout(() => setChar1Above(true), 400);
            setChar2Visible(false);
          }, 5 * 1000);
          el.scrollIntoView({ behavior: "smooth" });
        }
        setLastTargetId("");
      }
    }
  }, [lastTargetId]);

  const typeMessage = useCallback((index: number, fullText: string, onCardTrigger?: () => void, onFinish?: () => void) => {
    let i = 0;
    const speed = Math.max(5, Math.min(15, 1800 / fullText.length));
    const cardTriggerAt = Math.floor(fullText.length * 0.4);
    let cardTriggered = false;
    const tick = () => {
      if (typingPausedRef.current) { typingResumeRef.current = tick; return; }
      i++;
      setDisplayedContent((prev) => ({ ...prev, [index]: fullText.slice(0, i) }));
      if (!cardTriggered && onCardTrigger && i >= cardTriggerAt) {
        cardTriggered = true;
        typingPausedRef.current = true;
        typingResumeRef.current = tick;
        onCardTrigger();
        return;
      }
      if (i < fullText.length) {
        typingTimers.current[index] = setTimeout(tick, speed);
      } else {
        setMessages((prev) => prev.map((m, idx) => idx === index ? { ...m, isTyping: false } : m));
        onFinish?.();
      }
    };
    tick();
  }, []);

  const skipTyping = useCallback((index: number, fullText: string) => {
    if (typingTimers.current[index]) clearTimeout(typingTimers.current[index]);
    typingPausedRef.current = false;
    typingResumeRef.current = null;
    setDisplayedContent((prev) => ({ ...prev, [index]: fullText }));
    setMessages((prev) => prev.map((m, idx) => (idx === index ? { ...m, isTyping: false } : m)));
    const pending = pendingActionRef.current;
    if (pending) {
      pendingActionRef.current = null;
      setTimeout(() => handleNavAction({ type: "navigate", url: "#" + pending.targetId, label: pending.buttonLabel }), 80);
    }
  }, [handleNavAction]);

  const clearSession = () => {
    Object.values(typingTimers.current).forEach(clearTimeout);
    typingTimers.current = {};
    typingPausedRef.current = false;
    typingResumeRef.current = null;
    pendingActionRef.current = null;
    setMessages([]);
    setDisplayedContent({});
    setInput("");
    dismissDiamond();
    clearNavAccepted();
    clearNavDismissed();
    setAnsweredVisible(false);
  };

  const sendMessage = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;
    dismissDiamond();
    pendingActionRef.current = null;
    const userMsg: Message = { role: "user", content: userText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://yasir723-rag-based-portfolio.hf.space/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": "rag-yasir-8x92kLmQ" },
        body: JSON.stringify({ question: userText, session_id: SESSION_ID }),
      });
      const data = await res.json();
      const answer = fixMarkdown(fixLinks(data.answer ?? "An error occurred, please try again."));
      const navAction: NavigationAction | null = data.action ?? null;
      const assistantIndex = updatedMessages.length;
      setMessages((prev) => [...prev, { role: "assistant", content: answer, isTyping: true }]);
      setDisplayedContent((prev) => ({ ...prev, [assistantIndex]: "" }));
      if (navAction) {
        const targetId = URL_TO_ID[navAction.url];
        const cardMeta = URL_TO_CARD[navAction.url];
        pendingActionRef.current = targetId && cardMeta ? { ...cardMeta, targetId } : null;
        if (targetId) setLastTargetId(targetId);
      } else {
        pendingActionRef.current = null;
      }
      const onCardTrigger = pendingActionRef.current
        ? () => {
            const pending = pendingActionRef.current;
            if (!pending) return;
            if (getNavAccepted()) {

              const el = document.getElementById(pending.targetId);
              if (el) {
                setTimeout(() => { setChar1Visible(false); setChar1Above(false); setChar2Visible(true); }, 300);
                setTimeout(() => { setChar1Visible(true); setChar1Above(false); setTimeout(() => setChar1Above(true), 400); setChar2Visible(false); }, 5 * 1000);
                el.scrollIntoView({ behavior: "smooth" });
              }
              typingPausedRef.current = false;
              const resume = typingResumeRef.current;
              typingResumeRef.current = null;
              setTimeout(() => resume?.(), 50);
            } else if (getNavDismissed()) {
              setChar3Visible(true);
              setChar3Above(false);
              setTimeout(() => setChar3Above(true), 400);
              setTimeout(() => { setChar3Above(false); setChar3Visible(false); }, 5 * 1000);
              typingPausedRef.current = false;
              const resume = typingResumeRef.current;
              typingResumeRef.current = null;
              setTimeout(() => resume?.(), 50);
            } else {
              pendingActionRef.current = null;
              showDiamondCard(pending);
            }
          }
        : undefined;
      setTimeout(() => typeMessage(assistantIndex, answer, onCardTrigger, undefined), 80);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error, please try again.", isTyping: false }]);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = messages.length === 0;

  const mdComponents = {
    p: ({ children }: any) => <p style={{ margin: "0 0 7px", lineHeight: 1.7, fontSize: "13.5px", color: "#1c1c1e" }}>{children}</p>,
    ul: ({ children }: any) => <ul style={{ margin: "6px 0 10px", padding: 0, listStyle: "none" }}>{children}</ul>,
    ol: ({ children }: any) => <ol style={{ margin: "6px 0 10px", paddingLeft: "16px" }}>{children}</ol>,
    li: ({ children }: any) => (
      <li style={{ margin: "6px 0", display: "flex", alignItems: "flex-start", gap: "9px", fontSize: "13.5px", lineHeight: 1.6, color: "#1c1c1e" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, flexShrink: 0, marginTop: "7px", boxShadow: `0 0 0 2px ${ACCENT_SOFT}` }} />
        <span style={{ flex: 1, minWidth: 0 }}>{children}</span>
      </li>
    ),
    strong: ({ children }: any) => (
      <strong style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, fontSize: "11px", letterSpacing: "0.6px", textTransform: "uppercase" as const, color: "#b5651d", marginTop: "18px", marginBottom: "8px", paddingBottom: "5px", borderBottom: "1px solid rgba(232,168,124,0.25)" }}>
        <span style={{ width: 3, height: 12, borderRadius: 2, background: "#e8a87c", flexShrink: 0, display: "inline-block" }} />
        {children}
      </strong>
    ),
    a: ({ href, children }: any) => (
      <a href={href} target="_blank" rel="noreferrer" title={href} style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#b5651d", textDecoration: "none", fontWeight: 500, fontSize: "12px", background: ACCENT_SOFT, borderRadius: "6px", padding: "2px 8px", border: `1px solid ${ACCENT_BORDER}`, maxWidth: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", verticalAlign: "middle" }}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{typeof children === "string" && children.startsWith("http") ? shortenUrl(children) : children}</span>
      </a>
    ),
    code: ({ children }: any) => <code style={{ background: "#f0f0f0", borderRadius: "4px", padding: "1px 6px", fontSize: "12px", fontFamily: "monospace", color: "#c0392b" }}>{children}</code>,
  };

  /* ── Responsive chatbox styles ── */
  const chatboxStyle: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        background: "#ffffff",
        border: "none",
        borderRadius: 0,
        overflow: "hidden",
        boxShadow: "none",
        zIndex: 9998,
        animation: "slideUpMobile 0.35s cubic-bezier(0.16,1,0.3,1) both",
        display: "flex",
        flexDirection: "column",
      }
    : {
        position: "fixed",
        bottom: "108px",
        right: "28px",
        width: "390px",
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
        zIndex: 9998,
        animation: "popUp 0.3s cubic-bezier(0.16,1,0.3,1) both",
        display: "flex",
        flexDirection: "column",
        height: "580px",
      };

  return (
    <>
      {isOpen && (
        <>
          {/* Karakterler — sadece masaüstünde */}
          {!isMobile && char1Visible && getNavAccepted() && (
            <img src="/images/vactor_yasir_1.png" alt="" style={{ position: "fixed", bottom: "90px", right: "52px", width: "200px", height: "auto", pointerEvents: "none", zIndex: char1Above ? 9999 : 9997, animation: "slideUpChar 0.7s cubic-bezier(0.16,1,0.3,1) forwards", filter: "drop-shadow(0 -4px 20px rgba(232,168,124,0.25))" }} />
          )}
          {!isMobile && char3Visible && (
            <img src="/images/vactor_yasir_3.png" alt="" style={{ position: "fixed", bottom: "90px", right: "52px", width: "200px", height: "auto", pointerEvents: "none", zIndex: char3Above ? 9999 : 9997, animation: "slideUpChar 0.7s cubic-bezier(0.16,1,0.3,1) forwards", filter: "drop-shadow(0 -4px 20px rgba(232,168,124,0.25))" }} />
          )}
          {!isMobile && char2Visible && (
            <img src="/images/vactor_yasir_2.png" alt="" style={{ position: "fixed", bottom: "-55px", right: "339px", width: "200px", height: "auto", pointerEvents: "none", zIndex: 9997, animation: char2Visible ? "slideUpChar2 0.75s cubic-bezier(0.16,1,0.3,1) 0.08s forwards" : "slideDownChar2 0.5s cubic-bezier(0.4,0,0.6,1) forwards", filter: "drop-shadow(0 -4px 20px rgba(232,168,124,0.25))" }} />
          )}

          {/* ── Chatbot kutusu ── */}
          <div style={chatboxStyle}>

            {/* ── Header ── */}
            <div style={{ padding: isMobile ? "16px 16px" : "16px 18px", paddingTop: isMobile ? "calc(env(safe-area-inset-top) + 16px)" : "16px", background: "#fafafa", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: `2px solid ${ACCENT_BORDER}` }}>
                  <img src="/images/vactor_yasir.png" alt="Yasir" style={{ objectFit: "cover", transform: "translateY(2px)" }} />
                </div>
                <div style={{ position: "absolute", bottom: 1, right: 1, width: 9, height: 9, borderRadius: "50%", background: "#30d158", border: "2px solid #fafafa" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#1c1c1e", letterSpacing: "-0.2px" }}>Yasir's Assistant</p>
                <p style={{ margin: "1px 0 0", fontSize: "11.5px", color: "#8e8e93" }}>AI · Usually responds instantly</p>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>

                {((!isEmpty && answeredVisible) || navEnabled) && (
                  <button
                    onClick={handleToggleActionMode}
                    style={{ background: "none", border: "none", borderRadius: "8px", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: navEnabled ? ACCENT : "#8e8e93", transition: "all 0.15s", marginRight: "17px" }}
                    title={navEnabled ? "Disable interaction mode" : "Enable interaction mode"}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f0f0"; e.currentTarget.style.color = "#1c1c1e"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = navEnabled ? ACCENT_SOFT : "none"; e.currentTarget.style.color = navEnabled ? ACCENT : "#8e8e93"; e.currentTarget.style.border = navEnabled ? `1px solid ${ACCENT_BORDER}` : "1px solid transparent"; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="14" cy="14" r="4.5" fill="currentColor"/><circle cx="14" cy="14" r="2" fill="white"/>
                      <line x1="14" y1="1" x2="14" y2="8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <line x1="14" y1="19.5" x2="14" y2="27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <line x1="1" y1="14" x2="8.5" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <line x1="19.5" y1="14" x2="27" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <line x1="4.5" y1="4.5" x2="9.8" y2="9.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <line x1="18.2" y1="18.2" x2="23.5" y2="23.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <line x1="23.5" y1="4.5" x2="18.2" y2="9.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <line x1="9.8" y1="18.2" x2="4.5" y2="23.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <circle cx="14" cy="1.5" r="1.8" fill="currentColor" opacity="0.6"/>
                      <circle cx="14" cy="26.5" r="1.8" fill="currentColor" opacity="0.6"/>
                      <circle cx="1.5" cy="14" r="1.8" fill="currentColor" opacity="0.6"/>
                      <circle cx="26.5" cy="14" r="1.8" fill="currentColor" opacity="0.6"/>
                      <circle cx="4" cy="4" r="1.4" fill="currentColor" opacity="0.4"/>
                      <circle cx="24" cy="24" r="1.4" fill="currentColor" opacity="0.4"/>
                      <circle cx="24" cy="4" r="1.4" fill="currentColor" opacity="0.4"/>
                      <circle cx="4" cy="24" r="1.4" fill="currentColor" opacity="0.4"/>
                      <circle cx="14" cy="14" r="19" fill="none" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="2 3"/>
                    </svg>
                    
                  </button>
                )}
                {!isEmpty && (
                  <button onClick={clearSession} title="Clear conversation" style={{ background: "none", border: "none", borderRadius: "8px", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#8e8e93", transition: "all 0.15s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f0f0"; e.currentTarget.style.color = "#1c1c1e"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#8e8e93"; }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" /></svg>
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", borderRadius: "8px", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#8e8e93", transition: "all 0.15s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f0f0"; e.currentTarget.style.color = "#1c1c1e"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#8e8e93"; }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
            </div>

            {/* ── Messages area ── */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#ffffff", display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", display: "flex", flexDirection: "column", transition: "filter 0.6s ease, opacity 0.6s ease", filter: actionVisible ? "blur(3px)" : "none", opacity: actionVisible ? 0.22 : 1, pointerEvents: actionVisible ? "none" : "auto" }}>
                {isEmpty ? (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isMobile ? "28px 20px" : "28px 22px", animation: "fadeIn 0.35s ease" }}>
                    <div style={{ width: 72, height: 72, borderRadius: "24px", overflow: "hidden", marginBottom: "18px", border: `2px solid ${ACCENT_BORDER}`, boxShadow: `0 8px 32px rgba(232,168,124,0.35)` }}>
                      <img src="/images/vactor_yasir.png" alt="Yasir" style={{ objectFit: "cover", transform: "translateY(4px)" }} />
                    </div>
                    <p style={{ margin: "0 0 5px", fontSize: "16px", fontWeight: 700, color: "#1c1c1e", textAlign: "center", letterSpacing: "-0.3px" }}>Hi, I'm Yasir's AI</p>
                    <p style={{ margin: "0 0 26px", fontSize: "13px", color: "#8e8e93", textAlign: "center", lineHeight: 1.5 }}>Ask me anything about Yasir's work, skills, or experience.</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", width: "100%" }}>
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button key={q} onClick={() => sendMessage(q)} style={{ background: "#f8f8f8", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "12px", padding: "10px 12px", fontSize: "12px", color: "#3a3a3c", cursor: "pointer", textAlign: "left", lineHeight: 1.45, fontWeight: 500, transition: "all 0.15s ease" }}
                          onMouseEnter={(e) => { Object.assign(e.currentTarget.style, { background: ACCENT_SOFT, borderColor: ACCENT_BORDER, color: "#1c1c1e", transform: "translateY(-1px)" }); }}
                          onMouseLeave={(e) => { Object.assign(e.currentTarget.style, { background: "#f8f8f8", borderColor: "rgba(0,0,0,0.07)", color: "#3a3a3c", transform: "translateY(0)" }); }}>
                          {q}
                        </button>
                      ))}
                    </div>
                    <p style={{ marginTop: "18px", fontSize: "10.5px", color: "#aeaeb2", textAlign: "center", lineHeight: 1.5 }}>
                      🔒 Conversations may be logged to improve response quality.{" "}
                      <span onClick={() => window.open("/privacy", "_blank")} style={{ color: "#b5651d", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "2px" }}>Privacy Policy</span>
                    </p>
                  </div>
                ) : (
                  <div style={{ padding: "18px 16px 10px", display: "flex", flexDirection: "column", gap: "14px" }}>
                    {messages.map((msg, i) => {
                      const content = msg.role === "assistant" ? (displayedContent[i] ?? "") : msg.content;
                      const isStillTyping = msg.role === "assistant" && msg.isTyping;
                      const isUser = msg.role === "user";
                      return (
                        <div key={i} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", alignItems: "flex-end", gap: "8px", animation: "fadeIn 0.2s ease" }}>
                          {!isUser && (
                            <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `1.5px solid ${ACCENT_BORDER}` }}>
                              <img src="/images/vactor_yasir.png" alt="Yasir" style={{ objectFit: "cover", transform: "translateY(2px)" }} />
                            </div>
                          )}
                          <div style={{ maxWidth: "76%", padding: isUser ? "10px 15px" : "12px 15px", borderRadius: isUser ? "18px 18px 4px 18px" : "4px 18px 18px 18px", background: isUser ? "linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)" : "#f8f8f8", border: isUser ? "none" : "1px solid rgba(0,0,0,0.06)", color: isUser ? "white" : "#1c1c1e", fontSize: "13.5px", lineHeight: 1.6, fontWeight: isUser ? 500 : 400, boxShadow: isUser ? "0 2px 12px rgba(0,0,0,0.15)" : "0 1px 4px rgba(0,0,0,0.04)", minWidth: 0, overflow: "hidden" }}>
                            {isUser ? (
                              <span style={{ fontSize: "13.5px" }}>{msg.content}</span>
                            ) : (
                              <>
                                <ReactMarkdown components={mdComponents}>{content}</ReactMarkdown>
                                {isStillTyping && <span style={{ display: "inline-block", width: "2px", height: "14px", background: ACCENT, marginLeft: "2px", verticalAlign: "middle", animation: "cursorBlink 0.65s step-end infinite" }} />}
                              </>
                            )}
                          </div>
                          {isStillTyping && (
                            <div style={{ position: "relative", display: "inline-flex", alignSelf: "flex-end", marginBottom: "2px" }}
                              onMouseEnter={(e) => { const tip = e.currentTarget.querySelector(".skip-tip") as HTMLElement; if (tip) tip.style.opacity = "1"; }}
                              onMouseLeave={(e) => { const tip = e.currentTarget.querySelector(".skip-tip") as HTMLElement; if (tip) tip.style.opacity = "0"; }}>
                              <div className="skip-tip" style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "#1c1c1e", color: "white", fontSize: "10.5px", padding: "3px 8px", borderRadius: "6px", whiteSpace: "nowrap", opacity: 0, pointerEvents: "none", transition: "opacity 0.15s ease", zIndex: 10 }}>Hepsini göster</div>
                              <button onClick={() => skipTyping(i, msg.content)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: ACCENT_SOFT, border: `1px solid ${ACCENT_BORDER}`, borderRadius: "6px", width: "22px", height: "22px", color: "#b5651d", cursor: "pointer", padding: 0 }}>
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {loading && (
                      <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", animation: "fadeIn 0.2s ease" }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `1.5px solid ${ACCENT_BORDER}` }}>
                          <img src="/images/vactor_yasir.png" alt="Yasir" style={{ objectFit: "cover", transform: "translateY(2px)" }} />
                        </div>
                        <div style={{ padding: "12px 16px", borderRadius: "4px 18px 18px 18px", background: "#f8f8f8", border: "1px solid rgba(0,0,0,0.06)", display: "flex", gap: "5px", alignItems: "center" }}>
                          {[0, 1, 2].map((i) => <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#c8c8cc", display: "block", animation: `aidot 1.4s ${i * 0.2}s ease-in-out infinite` }} />)}
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* ── Diamond Overlay ── */}
              {actionCard && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", pointerEvents: actionVisible ? "auto" : "none", zIndex: 10 }}>
                  {scanActive && <div style={{ position: "absolute", left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent 0%, ${ACCENT} 40%, #fff 50%, ${ACCENT} 60%, transparent 100%)`, animation: "scanline 1.1s cubic-bezier(0.4,0,0.6,1) forwards", zIndex: 30, pointerEvents: "none" }} />}
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: gridVisible ? 1 : 0, transition: "opacity 0.5s ease" }}>
                    {[{ top: "33%", left: 0, right: 0, height: "1px", transitionDelay: "0.1s" }, { top: "66%", left: 0, right: 0, height: "1px", transitionDelay: "0.2s" }].map((s, i) => <div key={i} style={{ position: "absolute", background: "rgba(232,168,124,0.1)", transform: gridVisible ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: `transform 0.5s cubic-bezier(0.16,1,0.3,1) ${s.transitionDelay}`, ...s }} />)}
                    {[{ left: "33%", top: 0, bottom: 0, width: "1px", transitionDelay: "0.15s" }, { left: "66%", top: 0, bottom: 0, width: "1px", transitionDelay: "0.25s" }].map((s, i) => <div key={i} style={{ position: "absolute", background: "rgba(232,168,124,0.1)", transform: gridVisible ? "scaleY(1)" : "scaleY(0)", transformOrigin: "top", transition: `transform 0.5s cubic-bezier(0.16,1,0.3,1) ${s.transitionDelay}`, ...s }} />)}
                  </div>
                  {(["tl", "tr", "bl", "br"] as const).map((pos) => <div key={pos} style={{ position: "absolute", width: 32, height: 32, opacity: cornersVisible ? 1 : 0, transition: "opacity 0.3s ease", ...(pos === "tl" ? { top: 14, left: 14, borderTop: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}`, borderRadius: "4px 0 0 0" } : {}), ...(pos === "tr" ? { top: 14, right: 14, borderTop: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}`, borderRadius: "0 4px 0 0" } : {}), ...(pos === "bl" ? { bottom: 14, left: 14, borderBottom: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}`, borderRadius: "0 0 0 4px" } : {}), ...(pos === "br" ? { bottom: 14, right: 14, borderBottom: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}`, borderRadius: "0 0 4px 0" } : {}) }} />)}
                  <div style={{ background: "rgba(255,255,255,0.99)", borderRadius: 22, border: `1px solid rgba(232,168,124,0.4)`, padding: "28px 24px 22px", width: "100%", maxWidth: 310, textAlign: "center", position: "relative", zIndex: 20, boxShadow: "0 8px 60px rgba(232,168,124,0.22), 0 2px 16px rgba(0,0,0,0.07)", transform: cardShow ? "scale(1) translateY(0)" : "scale(0.7) translateY(40px)", opacity: cardShow ? 1 : 0, transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease" }}>
                    {[{ top: "12px", left: "22px", width: 4, height: 4, delay: "0s" }, { top: "20px", right: "18px", width: 3, height: 3, delay: "0.6s" }, { bottom: "30px", left: "16px", width: 5, height: 5, delay: "1.2s" }, { bottom: "50px", right: "22px", width: 3, height: 3, delay: "0.3s" }].map((s, i) => <div key={i} style={{ position: "absolute", borderRadius: "50%", background: ACCENT, animation: cardShow ? `sparkleAnim 2s ${s.delay} ease-in-out infinite` : "none", opacity: cardShow ? undefined : 0, width: s.width, height: s.height, ...(s as any) }} />)}
                    <div style={{ width: 90, height: 90, margin: "0 auto 18px", position: "relative" }}>
                      {[{ size: 90, border: `1px solid rgba(232,168,124,0.25)`, anim: "spinRing1 5s linear infinite reverse", delay: "0.4s" }, { size: 110, border: `1px solid rgba(232,168,124,0.18)`, anim: "spinRing1 8s linear infinite", delay: "0.5s" }, { size: 130, border: `1px dashed rgba(232,168,124,0.1)`, anim: "spinRing2 14s linear infinite", delay: "0.7s" }].map((r, i) => <div key={i} style={{ position: "absolute", borderRadius: "50%", border: r.border, width: r.size, height: r.size, top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: cardShow ? r.anim : "none", opacity: cardShow ? 1 : 0, transition: `opacity 0.5s ease ${r.delay}` }} />)}
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: cardShow ? "gemFloat 3s ease-in-out infinite" : "none", filter: "drop-shadow(0 4px 12px rgba(232,168,124,0.5))", opacity: cardShow ? 1 : 0, transition: "opacity 0.4s ease 0.9s" }}>
                        <svg width="56" height="52" viewBox="0 0 56 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <polygon points="28,0 56,18 44,52 12,52 0,18" fill="#f5d4b0" stroke="#e8a87c" strokeWidth="1"/>
                          <polygon points="28,0 56,18 28,10" fill="#f0c090"/><polygon points="28,0 0,18 28,10" fill="#f8e0c0"/>
                          <polygon points="56,18 44,52 28,10" fill="#e8a87c"/><polygon points="0,18 12,52 28,10" fill="#f5c898"/>
                          <polygon points="28,10 44,52 12,52" fill="#fde8cc"/><polygon points="28,0 40,16 28,10 16,16" fill="rgba(255,255,255,0.4)"/>
                          <line x1="28" y1="0" x2="28" y2="10" stroke="#e8a87c" strokeWidth="0.5" opacity="0.5"/>
                          <line x1="0" y1="18" x2="56" y2="18" stroke="#e8a87c" strokeWidth="0.5" opacity="0.3"/>
                          <line x1="28" y1="10" x2="12" y2="52" stroke="#e8a87c" strokeWidth="0.5" opacity="0.3"/>
                          <line x1="28" y1="10" x2="44" y2="52" stroke="#e8a87c" strokeWidth="0.5" opacity="0.3"/>
                        </svg>
                      </div>
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: ACCENT_SOFT, border: `1px solid ${ACCENT_BORDER}`, borderRadius: 999, padding: "3px 12px 3px 9px", marginBottom: 14, opacity: cardShow ? 1 : 0, transform: cardShow ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.4s ease 1.1s, transform 0.4s ease 1.1s" }}>
                      <div style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", background: ACCENT }}>
                        <span style={{ position: "absolute", inset: "-3px", borderRadius: "50%", background: "rgba(232,168,124,0.4)", animation: "ping 2s ease-in-out infinite" }} />
                      </div>
                      <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "1.5px", color: "#b5651d", textTransform: "uppercase" as const }}>Suggested</span>
                    </div>
                    <p style={{ fontSize: 20, fontWeight: 800, color: "#1c1c1e", letterSpacing: "-0.5px", margin: "0 0 5px", opacity: cardShow ? 1 : 0, transform: cardShow ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.4s ease 1.2s, transform 0.4s ease 1.2s" }}>{actionCard.title}</p>
                    <p style={{ fontSize: 12, color: "#8e8e93", lineHeight: 1.5, margin: "0 0 20px", padding: "0 8px", opacity: cardShow ? 1 : 0, transform: cardShow ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.4s ease 1.3s, transform 0.4s ease 1.3s" }}>{actionCard.subtitle}</p>
                    <button onClick={() => handleActionClick(actionCard)} style={{ width: "100%", height: 48, padding: "0 18px", borderRadius: 14, border: `1.5px solid rgba(232,168,124,0.7)`, background: "transparent", color: "#c07340", fontSize: 13, fontWeight: 700, letterSpacing: "0.4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden", opacity: cardShow ? 1 : 0, transform: cardShow ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.4s ease 1.4s, transform 0.4s ease 1.4s, border-color 0.2s, color 0.2s, background 0.2s", fontFamily: "inherit" }}
                      onMouseEnter={(e) => { Object.assign(e.currentTarget.style, { borderColor: "#e8a87c", background: "rgba(232,168,124,0.08)", color: "#b5651d" }); const track = e.currentTarget.querySelector(".arrow-track") as HTMLElement; const icon = e.currentTarget.querySelector(".arrow-icon") as HTMLElement; if (track) track.style.opacity = "1"; if (icon) icon.style.transform = "translateX(4px)"; }}
                      onMouseLeave={(e) => { Object.assign(e.currentTarget.style, { borderColor: "rgba(232,168,124,0.7)", background: "transparent", color: "#c07340" }); const track = e.currentTarget.querySelector(".arrow-track") as HTMLElement; const icon = e.currentTarget.querySelector(".arrow-icon") as HTMLElement; if (track) track.style.opacity = "0"; if (icon) icon.style.transform = "translateX(0)"; }}>
                      <span style={{ position: "relative", zIndex: 1 }}>{actionCard.buttonLabel}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 0, position: "relative", zIndex: 1 }}>
                        <span className="arrow-track" style={{ width: 24, height: 1, background: `linear-gradient(90deg, transparent, ${ACCENT})`, opacity: 0, transition: "opacity 0.25s ease" }} />
                        <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4, transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)" }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                      </span>
                      <span style={{ position: "absolute", top: 0, left: "-80%", width: "60%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(232,168,124,0.15), transparent)", animation: "shimBtn 3s ease-in-out infinite", pointerEvents: "none" }} />
                    </button>
                    <button onClick={handleNoActionClick} style={{ marginTop: 11, background: "none", border: "none", fontSize: 11.5, color: "#aeaeb2", cursor: "pointer", padding: "4px 8px", borderRadius: 6, width: "100%", fontFamily: "inherit", opacity: cardShow ? 1 : 0, transition: "opacity 0.4s ease 1.5s, color 0.15s" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#8e8e93"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#aeaeb2"; }}>Continue chatting</button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Input ── */}
            <div style={{ padding: "12px 16px", paddingBottom: isMobile ? "calc(env(safe-area-inset-bottom) + 16px)" : "16px", borderTop: "1px solid rgba(0,0,0,0.06)", background: "#fafafa", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "white", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "14px", padding: "8px 8px 8px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", transition: "border-color 0.2s" }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  onFocus={(e) => { e.currentTarget.parentElement!.style.borderColor = ACCENT; }}
                  onBlur={(e) => { e.currentTarget.parentElement!.style.borderColor = "rgba(0,0,0,0.1)"; }}
                  placeholder="Ask something about Yasir..."
                  style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#1c1c1e", fontSize: "13.5px", caretColor: ACCENT }}
                />
                <button onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{ width: 34, height: 34, flexShrink: 0, borderRadius: "10px", border: "none", background: input.trim() && !loading ? `linear-gradient(135deg, ${ACCENT} 0%, #d4956a 100%)` : "#efefef", display: "flex", alignItems: "center", justifyContent: "center", cursor: input.trim() && !loading ? "pointer" : "default", transition: "all 0.15s ease", boxShadow: input.trim() && !loading ? "0 2px 8px rgba(232,168,124,0.4)" : "none" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !loading ? "white" : "#aaa"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
                </button>
              </div>
              <p style={{ margin: "8px 0 0", textAlign: "center", fontSize: "10.5px", color: "#aeaeb2", letterSpacing: "0.2px" }}>⚡ First response may take ~30s to wake up</p>
            </div>
          </div>
        </>
      )}

      {/* ── FAB ── */}
      <div style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 9999 }}>
        {isOpen === false && (
          <div style={{ position: "absolute", bottom: "70px", right: 0, pointerEvents: "none", animation: "fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ background: "white", borderRadius: "12px", padding: "7px 14px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.06)", whiteSpace: "nowrap" }}>
              <p style={{ margin: 0, fontSize: "12.5px", fontWeight: 600, color: "#1c1c1e" }}>✦ Ask AI about Yasir</p>
            </div>
            <div style={{ position: "absolute", bottom: -5, right: 20, width: 10, height: 10, background: "white", border: "1px solid rgba(0,0,0,0.06)", borderTop: "none", borderLeft: "none", transform: "rotate(45deg)" }} />
          </div>
        )}
        <div style={{ position: "relative", width: "56px", height: "56px" }}>
          {!isOpen && (
            <>
              <div style={{ position: "absolute", inset: "-10px", borderRadius: "50%", background: ACCENT, opacity: 0.15, animation: "pulse 2.5s ease-out infinite" }} />
              <div style={{ position: "absolute", inset: "-5px", borderRadius: "50%", background: ACCENT, opacity: 0.12, animation: "pulse 2.5s ease-out infinite 0.6s" }} />
            </>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `linear-gradient(135deg, ${ACCENT} 0%, #d4956a 100%)`, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s ease, box-shadow 0.2s ease", boxShadow: "0 4px 20px rgba(232,168,124,0.45)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >
            {isOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="11" y1="1" x2="11" y2="4" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="11" cy="0.8" r="1.1" fill="white"/>
                <rect x="3" y="4" width="16" height="12" rx="3" fill="white" fillOpacity="0.9"/>
                <circle cx="8" cy="9" r="1.8" fill="#d4956a"/><circle cx="14" cy="9" r="1.8" fill="#d4956a"/>
                <circle cx="8.5" cy="9.4" r="0.8" fill="white"/><circle cx="14.5" cy="9.4" r="0.8" fill="white"/>
                <path d="M7.5 12 Q11 13.8 14.5 12" stroke="#d4956a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                <rect x="1" y="7.5" width="2" height="3.5" rx="1" fill="white" fillOpacity="0.9"/>
                <rect x="19" y="7.5" width="2" height="3.5" rx="1" fill="white" fillOpacity="0.9"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popUp { from { opacity: 0; transform: scale(0.94) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes slideUpMobile { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes aidot { 0%, 80%, 100% { transform: translateY(0); opacity: 0.3; } 40% { transform: translateY(-6px); opacity: 1; } }
        @keyframes pulse { 0% { transform: scale(1); opacity: 0.15; } 70% { transform: scale(1.7); opacity: 0; } 100% { transform: scale(1.7); opacity: 0; } }
        @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes ping { 0% { transform: scale(1); opacity: 0.7; } 70% { transform: scale(2.2); opacity: 0; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes gemFloat { 0%, 100% { transform: translate(-50%,-50%) translateY(0); } 50% { transform: translate(-50%,-50%) translateY(-6px); } }
        @keyframes spinRing1 { to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes spinRing2 { to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes sparkleAnim { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 0.9; transform: scale(1); } }
        @keyframes scanline { 0% { top: 0px; opacity: 1; } 80% { top: 100%; opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes shimBtn { 0% { left: -80%; } 100% { left: 140%; } }
        @keyframes slideUpChar { 0% { opacity: 0; transform: translateY(0px); } 40% { opacity: 1; } 100% { opacity: 1; transform: translateY(-560px); } }
        @keyframes slideDownChar { 0% { opacity: 1; transform: translateY(-560px); } 60% { opacity: 1; } 100% { opacity: 0; transform: translateY(0px); } }
        @keyframes slideUpChar2 { 0% { opacity: 0; transform: translateY(0px) rotate(2deg); } 40% { opacity: 1; } 100% { opacity: 1; transform: translateY(-560px) rotate(2deg); } }
        @keyframes slideDownChar2 { 0% { opacity: 1; transform: translateY(-560px) rotate(2deg); } 60% { opacity: 1; } 100% { opacity: 0; transform: translateY(0px) rotate(2deg); } }
      `}</style>
    </>
  );
};

export default ChatBot;