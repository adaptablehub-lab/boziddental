// Bozid Dental virtual assistant: a small Cloudflare Worker that keeps the Claude API key
// secret and streams answers to the website's chat widget.
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "../../src/assistant/knowledge.js";

const SYSTEM = buildSystemPrompt();
const MAX_TURNS = 20;        // messages kept from the conversation
const MAX_CHARS = 1500;      // per visitor message

function corsHeaders(origin, env) {
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!allowed.includes(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

/** Accept only a clean, alternating user/assistant history that ends with the visitor. */
function cleanMessages(input) {
  if (!Array.isArray(input)) return null;
  const msgs = input.slice(-MAX_TURNS).map((m) => ({
    role: m?.role === "assistant" ? "assistant" : "user",
    content: typeof m?.content === "string" ? m.content.trim().slice(0, MAX_CHARS) : "",
  })).filter((m) => m.content);
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  if (!msgs.length || msgs[msgs.length - 1].role !== "user") return null;
  for (let i = 1; i < msgs.length; i++) if (msgs[i].role === msgs[i - 1].role) return null;
  return msgs;
}

const json = (body, status, headers) =>
  new Response(JSON.stringify(body), { status, headers: { ...headers, "Content-Type": "application/json" } });

export default {
  async fetch(request, env, ctx) {
    const cors = corsHeaders(request.headers.get("Origin") || "", env);
    if (!cors) return new Response("Forbidden", { status: 403 });
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ error: "method" }, 405, cors);

    let body;
    try { body = await request.json(); } catch { return json({ error: "bad_request" }, 400, cors); }
    const messages = cleanMessages(body?.messages);
    if (!messages) return json({ error: "bad_request" }, 400, cors);

    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    const stream = client.beta.messages.stream({
      model: env.MODEL || "claude-opus-5-5",
      max_tokens: 1024,
      output_config: { effort: "low" }, // quick, short chat replies
      // If a safety classifier declines, the API retries on Anthropic's recommended fallback model.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      messages,
    });

    // Stream newline-delimited JSON: {"t": "..."} chunks, then {"done": true} or {"refusal": true}.
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const enc = new TextEncoder();
    const send = (obj) => writer.write(enc.encode(JSON.stringify(obj) + "\n")).catch(() => stream.abort());

    stream.on("text", (t) => send({ t }));
    ctx.waitUntil((async () => {
      try {
        const msg = await stream.finalMessage();
        if (msg.stop_reason === "refusal") await send({ refusal: true });
        else await send({ done: true });
      } catch (err) {
        console.error("assistant error", err?.status, err?.message);
        await send({ error: true });
      } finally {
        await writer.close().catch(() => {});
      }
    })());

    return new Response(readable, {
      headers: { ...cors, "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" },
    });
  },
};
