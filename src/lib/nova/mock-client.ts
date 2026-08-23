import type { Message, NovaAIClient } from "./types";

const REPLIES: { match: RegExp; body: string }[] = [
  {
    match: /code|bug|function|typescript|python|react/i,
    body: `Here's a compact way to solve it.

### Approach
1. Normalise the input before you branch on it.
2. Keep the retry policy in one place so it stays testable.
3. Surface failures to the caller instead of swallowing them.

\`\`\`typescript
export async function fetchWithRetry<T>(
  url: string,
  attempts = 3,
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      return (await res.json()) as T;
    } catch (error) {
      lastError = error;
      await new Promise((r) => setTimeout(r, 2 ** i * 200));
    }
  }

  throw lastError;
}
\`\`\`

The exponential backoff keeps you from hammering a struggling service, and the typed return means callers keep their inference.

**Next step:** tell me which runtime you're on and I'll adapt the timeout handling.`,
  },
  {
    match: /summari|document|pdf|report/i,
    body: `Here's the shape of a summary I'd produce for a document like that.

### Key points
- **Thesis:** the author argues that small, frequent releases reduce risk more than large audits do.
- **Evidence:** three case studies, covering 18 months of deployment data.
- **Caveat:** the sample is limited to teams above 40 engineers.

### What matters for you
| Section | Why it matters |
| --- | --- |
| Methodology | Explains how confidence intervals were derived |
| Chapter 4 | The only part with actionable checklists |

Upload the file in **PDF Assistant** and I'll cite exact pages.`,
  },
  {
    match: /write|draft|email|post|copy/i,
    body: `Here's a first draft. I kept the tone direct and warm.

> Hi Maya — quick update on the migration. We finished the read path this week, and latency is down 38%. Next up is the write path, which we expect to land Thursday. Nothing blocking on your side.

### Variations
- **Shorter:** "Read path shipped, latency down 38%, write path Thursday."
- **More formal:** open with the outcome, then the timeline, then the ask.

Want me to adjust the length, tone, or add a clear call to action?`,
  },
  {
    match: /image|photo|picture|diagram/i,
    body: `Once you attach an image I'll read it end to end. Here's what that looks like.

### What I extract
1. **Scene** — objects, layout, and relationships between them.
2. **Text** — any legible copy, including handwriting and small labels.
3. **Intent** — charts get trends, screenshots get UI critique, photos get description.

For interface screenshots I'll also flag contrast issues and inconsistent spacing. Drop the file into **Image Understanding** whenever you're ready.`,
  },
];

const FALLBACK = `Happy to think this through with you.

### How I'd frame it
- Start from the outcome you want, not the tool.
- Name the one constraint that actually binds — budget, time, or people.
- Pick the smallest first step that produces real evidence.

Most decisions get easier once the constraint is explicit, because the option space shrinks to something you can reason about in a single sitting.

**Tell me a bit more** about your situation and I'll get specific: what you've tried, and what "done" looks like.`;

function pick(messages: Message[]) {
  const last = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  return REPLIES.find((r) => r.match.test(last))?.body ?? FALLBACK;
}

function chunk(text: string) {
  return text.match(/\s*\S+/g) ?? [text];
}

export const mockClient: NovaAIClient = {
  async streamReply({ messages, signal }, onChunk) {
    const body = pick(messages);
    const parts = chunk(body);
    let out = "";

    await new Promise((r) => setTimeout(r, 420));

    for (const part of parts) {
      if (signal?.aborted) return out;
      out += part;
      onChunk(part);
      await new Promise((r) => setTimeout(r, 10 + Math.random() * 24));
    }

    return out;
  },

  async suggestTitle(firstUserMessage) {
    const clean = firstUserMessage.replace(/\s+/g, " ").trim();
    const words = clean.split(" ").slice(0, 6).join(" ");
    return words.length > 3 ? words.replace(/[?.!,]$/, "") : "New conversation";
  },
};
