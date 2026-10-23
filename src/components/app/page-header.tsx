import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  demo = false,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  demo?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>
        ) : null}
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          {demo ? <DemoBadge /> : null}
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function DemoBadge({ label = "Sample data" }: { label?: string }) {
  return (
    <Badge
      variant="outline"
      className="border-border-strong bg-surface-2 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase"
    >
      {label}
    </Badge>
  );
}

/** Shared page shell: consistent max width, padding and scroll behaviour. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="scroll-slim h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-6xl animate-rise px-4 py-8 sm:px-8 sm:py-10">{children}</div>
    </div>
  );
}

/** Workspace card: rounded, restrained border and shadow. */
export function Panel({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("rounded-[1.125rem] border border-border bg-card p-5 shadow-sm sm:p-6", className)}
      {...props}
    />
  );
}

export function SectionTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function EmptyState({ icon, title, body, action }: { icon?: React.ReactNode; title: string; body?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[1.125rem] border border-dashed border-border-strong bg-surface px-6 py-10 text-center">
      {icon ? <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary">{icon}</div> : null}
      <p className="font-medium">{title}</p>
      {body ? <p className="mt-1 max-w-md text-sm text-muted-foreground">{body}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

/** Small honest label describing where content comes from. */
export function SourceNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-xs text-muted-foreground">
      <span aria-hidden className="size-1.5 rounded-full bg-muted-foreground" />
      {children}
    </p>
  );
}
