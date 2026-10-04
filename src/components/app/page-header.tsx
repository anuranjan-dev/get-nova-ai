import { Badge } from "@/components/ui/badge";

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
    <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-balance-tight text-2xl font-semibold sm:text-3xl">{title}</h1>
          {demo ? <DemoBadge /> : null}
        </div>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
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
      <div className="mx-auto w-full max-w-6xl animate-rise px-4 py-8 sm:px-8 sm:py-10">
        {children}
      </div>
    </div>
  );
}
