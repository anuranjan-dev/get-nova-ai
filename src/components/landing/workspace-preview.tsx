import { ArrowUp, LayoutGrid, MessageSquare, Plus, Search, Settings } from "lucide-react";

import { NovaLogo, NovaMark } from "@/components/nova/logo";

const threads = ["Q3 launch narrative", "Contract summary", "Refactor auth flow", "Investor FAQ"];

/** Static, non-interactive product preview used in the landing hero. */
export function WorkspacePreview() {
  return (
    <div
      aria-hidden="true"
      className="surface-sheen overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-panel)]"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="size-2 rounded-full bg-border-strong" />
        <span className="size-2 rounded-full bg-border-strong" />
        <span className="size-2 rounded-full bg-border-strong" />
      </div>

      <div className="flex min-h-[22rem] sm:min-h-[26rem]">
        <div className="hidden w-52 shrink-0 flex-col border-r border-border bg-sidebar p-3 sm:flex">
          <NovaLogo className="px-1 pb-4" />
          <div className="flex items-center gap-2 rounded-lg bg-primary px-2.5 py-2 text-xs font-medium text-primary-foreground">
            <Plus className="size-3.5" /> New chat
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-border px-2.5 py-2 text-xs text-muted-foreground">
            <Search className="size-3.5" /> Search chats
          </div>
          <p className="mt-5 px-1 text-[0.6rem] tracking-wider text-muted-foreground uppercase">
            Recent
          </p>
          <div className="mt-2 space-y-0.5">
            {threads.map((thread, index) => (
              <div
                key={thread}
                className={`truncate rounded-lg px-2.5 py-1.5 text-xs ${
                  index === 0
                    ? "bg-sidebar-accent text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {thread}
              </div>
            ))}
          </div>
          <div className="mt-auto space-y-0.5 border-t border-border pt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 px-2.5 py-1.5">
              <LayoutGrid className="size-3.5" /> AI Tools
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5">
              <Settings className="size-3.5" /> Settings
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-xs text-muted-foreground">
            <MessageSquare className="size-3.5" /> Q3 launch narrative
          </div>

          <div className="flex-1 space-y-6 p-5">
            <div className="flex justify-end">
              <p className="max-w-[75%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-xs leading-relaxed text-primary-foreground">
                Turn these three research notes into a launch narrative the whole team can use.
              </p>
            </div>

            <div className="flex gap-3">
              <NovaMark className="size-6 shrink-0" />
              <div className="min-w-0 space-y-2.5">
                <p className="text-xs leading-relaxed text-foreground/85">
                  Here's a narrative in three beats, with the strongest evidence attached to each.
                </p>
                <div className="space-y-1.5">
                  <div className="h-2 w-11/12 rounded-full bg-surface-2" />
                  <div className="h-2 w-9/12 rounded-full bg-surface-2" />
                  <div className="h-2 w-10/12 rounded-full bg-surface-2" />
                </div>
                <div className="rounded-xl border border-border bg-background p-3">
                  <div className="flex items-center justify-between pb-2 text-[0.6rem] tracking-wider text-muted-foreground uppercase">
                    typescript
                    <span>copy</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-8/12 rounded-full bg-primary/40" />
                    <div className="h-1.5 w-6/12 rounded-full bg-surface-2" />
                    <div className="h-1.5 w-9/12 rounded-full bg-surface-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border p-4">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3.5 py-2.5">
              <span className="text-xs text-muted-foreground">Message NOVA…</span>
              <span className="flex size-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ArrowUp className="size-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
