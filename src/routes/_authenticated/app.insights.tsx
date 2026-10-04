import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";

import { ErrorState, LoadingState } from "@/components/app/data-state";
import { PageHeader, PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/lib/nova/workspace-store";

export const Route = createFileRoute("/_authenticated/app/insights")({
  head: () => ({
    meta: [
      { title: "Insights — NOVA" },
      {
        name: "description",
        content:
          "Track engagement trends, best-performing formats, optimal posting windows and what to do next.",
      },
      { property: "og:title", content: "Insights — NOVA" },
      {
        property: "og:description",
        content: "Engagement trends, top formats and posting windows for youth-brand marketing.",
      },
    ],
  }),
  component: Insights,
});

function Insights() {
  const { activity, loading, error, retry } = useWorkspace();
  if (loading) return <PageShell><LoadingState label="Loading your saved work…" /></PageShell>;
  if (error) return <PageShell><ErrorState message={error} retry={retry} /></PageShell>;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Insights"
        title="Your saved work"
        description="A factual history of the work generated and saved in your NOVA account. Performance analytics appear only after you connect a real data source."
      />
      {activity.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
          <BarChart3 className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium text-foreground">No saved work yet</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">Generate a trend direction or content set to begin your account history.</p>
          <Button asChild className="mt-5"><Link to="/app/trends">Generate ideas</Link></Button>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {activity.map((item) => (
            <li key={item.id} className="rounded-xl border border-border bg-surface p-4">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
              <p className="mt-2 text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
