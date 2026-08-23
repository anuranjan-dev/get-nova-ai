import { ArrowUp, Paperclip, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Composer({
  onSubmit,
  onStop,
  streaming = false,
  placeholder = "Message NOVA…",
  autoFocus = false,
  className,
}: {
  onSubmit: (value: string) => void;
  onStop?: () => void;
  streaming?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || streaming) return;
    onSubmit(trimmed);
    setValue("");
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="surface-sheen rounded-2xl border border-border bg-surface p-2 transition-colors focus-within:border-border-strong">
        <textarea
          ref={ref}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={1}
          placeholder={placeholder}
          aria-label="Message NOVA"
          className="scroll-slim w-full resize-none bg-transparent px-3 pt-2.5 pb-1 text-[0.95rem] leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
        />
        <div className="flex items-center justify-between gap-2 px-1 pt-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 gap-2 rounded-lg px-2 text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="size-4" />
            <span className="hidden sm:inline">Attach</span>
          </Button>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Shift + Enter for a new line
            </span>
            {streaming ? (
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={onStop}
                aria-label="Stop generating"
                className="size-9 rounded-xl"
              >
                <Square className="size-3.5" />
              </Button>
            ) : (
              <Button
                type="button"
                size="icon"
                onClick={submit}
                disabled={!value.trim()}
                aria-label="Send message"
                className="size-9 rounded-xl"
              >
                <ArrowUp className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[0.7rem] text-muted-foreground">
        NOVA is running on sample responses in this preview.
      </p>
    </div>
  );
}
