export type AiTool = "email" | "meeting" | "tasks" | "research" | "chat";

export type ChatMessage = { role: "user" | "assistant"; content: string };

const AI_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`;

export async function streamAi(opts: {
  tool: AiTool;
  input?: string;
  messages?: ChatMessage[];
  onDelta: (chunk: string) => void;
  signal?: AbortSignal;
}) {
  const resp = await fetch(AI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({
      tool: opts.tool,
      input: opts.input,
      messages: opts.messages,
    }),
    signal: opts.signal,
  });

  if (resp.status === 429) throw new Error("Rate limit exceeded. Please wait a moment and try again.");
  if (resp.status === 402) throw new Error("AI credits exhausted. Please add credits to your workspace.");
  if (!resp.ok || !resp.body) {
    const t = await resp.text().catch(() => "");
    throw new Error(t || "Failed to start AI stream");
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let done = false;

  while (!done) {
    const { done: d, value } = await reader.read();
    if (d) break;
    buf += decoder.decode(value, { stream: true });
    let idx: number;
    while ((idx = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line || line.startsWith(":")) continue;
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { done = true; break; }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) opts.onDelta(content);
      } catch {
        buf = line + "\n" + buf;
        break;
      }
    }
  }
}
