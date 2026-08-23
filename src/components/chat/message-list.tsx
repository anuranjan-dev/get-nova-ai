import { Check, Copy, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Markdown } from "@/components/chat/markdown";
import { NovaMark } from "@/components/nova/logo";
import { Button } from "@/components/ui/button";
import type { Message } from "@/lib/nova/types";

function CopyResponse({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-8 gap-1.5 rounded-lg px-2 text-xs text-muted-foreground hover:text-foreground"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(content);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable */
        }
      }}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

export function MessageList({
  messages,
  streaming,
  onRegenerate,
}: {
  messages: Message[];
  streaming: boolean;
  onRegenerate: () => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      {messages.map((message, index) => {
        const isLast = index === messages.length - 1;

        if (message.role === "user") {
          return (
            <div key={message.id} className="mb-8 flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[0.95rem] leading-relaxed whitespace-pre-wrap text-primary-foreground">
                {message.content}
              </div>
            </div>
          );
        }

        const pending = streaming && isLast && !message.content;

        return (
          <div key={message.id} className="mb-10 flex gap-4">
            <NovaMark className="mt-0.5 size-7 shrink-0" />
            <div className="min-w-0 flex-1">
              {pending ? (
                <div className="flex items-center gap-2 pt-1.5 text-sm text-muted-foreground">
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                  Thinking…
                </div>
              ) : (
                <Markdown content={message.content} />
              )}
              {!streaming && isLast && message.content ? (
                <div className="mt-3 flex items-center gap-1">
                  <CopyResponse content={message.content} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onRegenerate}
                    className="h-8 gap-1.5 rounded-lg px-2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw className="size-3.5" />
                    Regenerate
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
