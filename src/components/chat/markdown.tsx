import { Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  return { copied, copy };
}

export function CodeBlock({ code, language }: { code: string; language?: string }) {
  const { copied, copy } = useCopy();

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={() => void copy(code)}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="scroll-slim overflow-x-auto p-4">
        <code className="font-mono text-[0.82rem] leading-relaxed text-foreground/90">
          {code}
        </code>
      </pre>
    </div>
  );
}

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}-i${i++}`;
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key}
          className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[0.82em]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      nodes.push(
        <em key={key} className="italic">
          {token.slice(1, -1)}
        </em>,
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Small, dependency-free markdown renderer tuned for chat responses. */
export function Markdown({ content, className }: { content: string; className?: string }) {
  const blocks: ReactNode[] = [];
  const lines = content.split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";

    if (line.trimStart().startsWith("```")) {
      const language = line.trim().slice(3).trim();
      const body: string[] = [];
      i++;
      while (i < lines.length && !(lines[i] ?? "").trimStart().startsWith("```")) {
        body.push(lines[i] ?? "");
        i++;
      }
      i++;
      blocks.push(
        <CodeBlock key={`b${key++}`} code={body.join("\n")} language={language} />,
      );
      continue;
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1]!.length;
      const text = heading[2]!;
      blocks.push(
        <p
          key={`b${key++}`}
          className={cn(
            "mt-5 mb-2 font-semibold text-foreground",
            level <= 2 ? "text-base" : "text-[0.95rem]",
          )}
        >
          {inline(text, `h${key}`)}
        </p>,
      );
      i++;
      continue;
    }

    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items: string[] = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i] ?? "")) {
        items.push((lines[i] ?? "").replace(/^\s*([-*]|\d+\.)\s+/, ""));
        i++;
      }
      const ListTag = ordered ? "ol" : "ul";
      blocks.push(
        <ListTag
          key={`b${key++}`}
          className={cn(
            "my-3 space-y-1.5 pl-5 text-foreground/85",
            ordered ? "list-decimal" : "list-disc",
          )}
        >
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed marker:text-muted-foreground">
              {inline(item, `l${key}-${idx}`)}
            </li>
          ))}
        </ListTag>,
      );
      continue;
    }

    if (line.trimStart().startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && (lines[i] ?? "").trimStart().startsWith(">")) {
        quote.push((lines[i] ?? "").replace(/^\s*>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote
          key={`b${key++}`}
          className="my-4 border-l-2 border-primary/60 pl-4 text-foreground/80 italic"
        >
          {inline(quote.join(" "), `q${key}`)}
        </blockquote>,
      );
      continue;
    }

    if (line.trim().startsWith("|")) {
      const rows: string[] = [];
      while (i < lines.length && (lines[i] ?? "").trim().startsWith("|")) {
        rows.push((lines[i] ?? "").trim());
        i++;
      }
      const cells = rows
        .filter((r) => !/^\|[\s|:-]+\|$/.test(r))
        .map((r) =>
          r
            .replace(/^\||\|$/g, "")
            .split("|")
            .map((c) => c.trim()),
        );
      const [head, ...body] = cells;
      blocks.push(
        <div key={`b${key++}`} className="my-4 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            {head ? (
              <thead className="bg-secondary/60">
                <tr>
                  {head.map((c, idx) => (
                    <th key={idx} className="px-3 py-2 text-left font-medium">
                      {inline(c, `th${key}-${idx}`)}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {body.map((row, r) => (
                <tr key={r} className="border-t border-border">
                  {row.map((c, idx) => (
                    <td key={idx} className="px-3 py-2 text-foreground/85">
                      {inline(c, `td${key}-${r}-${idx}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (!line.trim()) {
      i++;
      continue;
    }

    const paragraph: string[] = [];
    while (i < lines.length && (lines[i] ?? "").trim() && !/^\s*(#{1,4}\s|[-*]\s|\d+\.\s|>|\||```)/.test(lines[i] ?? "")) {
      paragraph.push(lines[i] ?? "");
      i++;
    }
    blocks.push(
      <p key={`b${key++}`} className="my-3 leading-[1.75] text-foreground/85">
        {inline(paragraph.join(" "), `p${key}`)}
      </p>,
    );
  }

  return <div className={cn("text-[0.95rem] first:mt-0", className)}>{blocks}</div>;
}
