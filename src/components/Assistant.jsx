import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { clinic, waLink } from "../data.js";
import { localAnswer, quickQuestions } from "../assistant/knowledge.js";
import { WhatsAppIcon } from "./ui.jsx";

// Address of the Cloudflare Worker (see worker/README). Without it the widget gives offline quick answers.
const API_URL = import.meta.env.VITE_ASSISTANT_URL || "";
const STORE = "bozid-assistant";
const WELCOME = {
  role: "assistant",
  content: "Hello! I'm the Bozid Dental virtual assistant. I can answer questions about our services, hours and location, and help you book. How can I help today?",
};
const SORRY = `Sorry, I can't answer that one. Our team will be happy to help on [WhatsApp](${waLink("Hello Bozid Dental, I have a question.")}) or by phone on ${clinic.primaryPhone.display}.`;

/* ---------- tiny, safe formatter: **bold**, [links](url) and "- " lists ---------- */
const SAFE = /^(\/(?!\/)|https:\/\/wa\.me\/|https:\/\/www\.google\.com\/maps\/|tel:|mailto:)/;

function inline(text, key) {
  const parts = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0, m, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const k = `${key}-${i++}`;
    if (m[1]) parts.push(<strong key={k}>{m[1]}</strong>);
    else if (!SAFE.test(m[3])) parts.push(m[2]);
    else if (m[3].startsWith("/")) parts.push(<Link key={k} to={m[3]}>{m[2]}</Link>);
    else parts.push(<a key={k} href={m[3]} {...(m[3].startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{m[2]}</a>);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function Rich({ text }) {
  const blocks = [];
  let list = null;
  text.split("\n").forEach((raw) => {
    const line = raw.trim();
    if (/^[-*•] /.test(line)) {
      if (!list) { list = []; blocks.push(list); }
      list.push(line.replace(/^[-*•] /, ""));
    } else {
      list = null;
      if (line) blocks.push(line);
    }
  });
  return blocks.map((b, i) =>
    Array.isArray(b)
      ? <ul key={i}>{b.map((li, j) => <li key={j}>{inline(li, `${i}-${j}`)}</li>)}</ul>
      : <p key={i}>{inline(b, i)}</p>
  );
}

/* ---------- talking to the Worker ---------- */
async function streamReply(messages, onText, signal) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    signal,
  });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "", text = "", end = null;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let nl;
    while ((nl = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line) continue;
      const evt = JSON.parse(line);
      if (evt.t) { text += evt.t; onText(text); }
      else end = evt;
    }
  }
  if (end?.refusal) return { text: SORRY };
  if (!end?.done) throw new Error("stream ended early");
  return { text };
}

function loadHistory() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORE) || "null");
    if (Array.isArray(saved) && saved.length) return saved;
  } catch { /* storage unavailable */ }
  return [WELCOME];
}

export default function Assistant({ onOpenChange }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [live, setLive] = useState(""); // text announced to screen readers when a reply finishes
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const logRef = useRef(null);
  const abortRef = useRef(null);
  const restored = useRef(false);

  // Restore this visit's conversation (after hydration, so server and client HTML match)
  useEffect(() => { setMessages(loadHistory()); restored.current = true; }, []);
  useEffect(() => {
    if (!restored.current || busy) return;
    try { sessionStorage.setItem(STORE, JSON.stringify(messages.slice(-30))); } catch { /* ignore */ }
  }, [messages, busy]);

  useEffect(() => { onOpenChange?.(open); }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep the newest message in view
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  async function ask(question) {
    const q = question.trim().slice(0, 1500);
    if (!q || busy) return;
    setDraft("");
    const history = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "", pending: true }]);
    setBusy(true);
    setLive("");

    const put = (content, extra = {}) =>
      setMessages((m) => [...m.slice(0, -1), { role: "assistant", content, ...extra }]);

    let reply;
    if (API_URL) {
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      const timer = setTimeout(() => ctrl.abort(), 45000);
      try {
        // The welcome line is the widget's own, so only the real conversation goes to the AI
        const convo = history.filter((m) => m.content !== WELCOME.content).map(({ role, content }) => ({ role, content }));
        reply = (await streamReply(convo, (t) => put(t, { pending: true }), ctrl.signal)).text;
      } catch {
        reply = `${localAnswer(q)}\n\n(Our AI assistant is busy right now, so this is a quick answer.)`;
      } finally {
        clearTimeout(timer);
      }
    } else {
      await new Promise((r) => setTimeout(r, 350));
      reply = localAnswer(q);
    }
    put(reply);
    setBusy(false);
    setLive(reply.replace(/\*\*|\[|\]\([^)]*\)/g, ""));
  }

  function reset() {
    abortRef.current?.abort();
    setMessages([WELCOME]);
    setBusy(false);
    inputRef.current?.focus();
  }

  const showChips = messages.length === 1 && !busy;

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={open ? "ai-launch is-open" : "ai-launch"}
        aria-expanded={open}
        aria-controls="ai-panel"
        aria-label={open ? "Close the virtual assistant" : "Ask our virtual assistant"}
        onClick={() => (open ? close() : setOpen(true))}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="ai-launch__chat">
          <path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm4 7a1.3 1.3 0 1 0 0-2.6A1.3 1.3 0 0 0 8 11zm4 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6zm4 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6z" />
        </svg>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="ai-launch__x">
          <path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
        <span className="ai-launch__label">Ask us</span>
      </button>

      {open && (
        <section id="ai-panel" className="ai-panel" role="dialog" aria-modal="false" aria-labelledby="ai-title">
          <div className="ai-panel__head">
            <span className="ai-panel__avatar" aria-hidden="true">B</span>
            <div>
              <h2 id="ai-title" className="ai-panel__title">Bozid virtual assistant</h2>
              <p className="ai-panel__sub">{API_URL ? "AI assistant · replies instantly" : "Quick answers · replies instantly"}</p>
            </div>
            <button type="button" className="ai-panel__icon" onClick={reset} aria-label="Start a new conversation" title="New conversation">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" /></svg>
            </button>
            <button type="button" className="ai-panel__icon" onClick={close} aria-label="Close the virtual assistant">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>

          <div className="ai-panel__log" ref={logRef}>
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ai-msg--${m.role}`}>
                {m.role === "user" ? <p>{m.content}</p>
                  : m.content ? <Rich text={m.content} />
                  : <span className="ai-typing" aria-label="Typing"><i /><i /><i /></span>}
              </div>
            ))}
            {showChips && (
              <div className="ai-chips" role="group" aria-label="Suggested questions">
                {quickQuestions.map((q) => (
                  <button key={q} type="button" className="ai-chip" onClick={() => ask(q)}>{q}</button>
                ))}
              </div>
            )}
          </div>
          <p className="sr-only" aria-live="polite">{live}</p>

          <form className="ai-panel__form" onSubmit={(e) => { e.preventDefault(); ask(draft); }}>
            <label htmlFor="ai-input" className="sr-only">Type your question</label>
            <textarea
              id="ai-input"
              ref={inputRef}
              rows={1}
              value={draft}
              maxLength={1500}
              placeholder="Type your question…"
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(draft); } }}
            />
            <button type="submit" className="ai-send" disabled={busy || !draft.trim()} aria-label="Send">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z" /></svg>
            </button>
          </form>
          <div className="ai-panel__foot">
            <p>AI can make mistakes and isn't medical advice. For severe swelling or bleeding, seek urgent care.</p>
            <a href={waLink("Hello Bozid Dental, I have a question.")} target="_blank" rel="noopener noreferrer" className="ai-panel__wa">
              <WhatsAppIcon /> Talk to a person
            </a>
          </div>
        </section>
      )}
    </>
  );
}
