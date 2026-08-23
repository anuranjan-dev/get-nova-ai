import { cn } from "@/lib/utils";

export function NovaMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "mark-gradient inline-flex items-center justify-center rounded-[0.6rem] text-primary-foreground",
        "size-7",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-[70%]" fill="none">
        <path
          d="M12 3.2c.35 2.6 1.1 4.4 2.35 5.65C15.6 10.1 17.4 10.85 20 11.2c-2.6.35-4.4 1.1-5.65 2.35C13.1 14.8 12.35 16.6 12 19.2c-.35-2.6-1.1-4.4-2.35-5.65C8.4 12.3 6.6 11.55 4 11.2c2.6-.35 4.4-1.1 5.65-2.35C10.9 7.6 11.65 5.8 12 3.2Z"
          fill="currentColor"
        />
        <circle
          cx="12"
          cy="11.2"
          r="8.6"
          stroke="currentColor"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
      </svg>
    </span>
  );
}

export function NovaLogo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <NovaMark />
      {showWordmark ? (
        <span className="text-[0.95rem] font-semibold tracking-[0.14em] text-foreground">
          NOVA
        </span>
      ) : null}
    </span>
  );
}
