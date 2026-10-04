import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, LineChart, Radar, Sparkles, Wand2, type LucideIcon } from "lucide-react";

import { ErrorState, LoadingState } from "@/components/app/data-state";
import { PageShell } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/lib/nova/workspace-store";

export const Route = createFileRoute("/_authenticated/app/")({
  head: () => ({
    meta: [
      { title: "Overview — NOVA marketing workspace" },
      {
        name: "description",
        content:
          "Your NOVA overview: scan trends, generate on-brand content, and see what to act on today.",
      },
      { property: "og:title", content: "Overview — NOVA marketing workspace" },
      {
        property: "og:description",
        content: "Scan trends, generate on-brand content, and see what to act on today.",
      },
    ],
  }),
  component: Overview,
});

const quickActions: {
  to: "/app/trends" | "/app/studio" | "/app/voice" | "/app/insights";
  label: string;
  copy: string;
  icon: LucideIcon;
}[] = [
  {
    to: "/app/trends",
    label: "Scan Trends",
    copy: "Generate strategic trend hypotheses for your category.",
    icon: Radar,
  },
  {
    to: "/app/studio",
    label: "Create Content",
    copy: "Hooks, captions, ad copy and CTAs from one short brief.",
    icon: Wand2,
  },
  {
    to: "/app/voice",
    label: "Define Brand Voice",
    copy: "Set it once so every generation sounds like your brand.",
    icon: Sparkles,
  },
  {
    to: "/app/insights",
    label: "View Insights",
    copy: "Review the real work saved in your NOVA account.",
    icon: LineChart,
  },
];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function Overview() {
  const { activity, profile, profileComplete, user, loading, error, retry } = useWorkspace();

  if (loading) return <PageShell><LoadingState /></PageShell>;
  if (error) return <PageShell><ErrorState message={error} retry={retry} /></PageShell>;

  return (
    <PageShell>
      <header>
        <p className="text-[0.7rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
          Overview
        </p>
        <h1 className="text-balance-tight mt-3 text-3xl font-semibold sm:text-[2.35rem] sm:leading-[1.1]">
          {greeting()}{user?.firstName ? `, ${user.firstName}` : ""}.
          <span className="block text-muted-foreground">
            Here's what matters for {profile.brandName || "your brand"} today.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Start by completing your business profile. Then generate strategic ideas or brief the
          content studio directly.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-sm font-medium text-foreground">Quick actions</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="group surface-sheen rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong hover:bg-surface-2"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <action.icon className="size-4.5" />
              </span>
              <span className="mt-4 flex items-center gap-1.5 text-sm font-medium text-foreground">
                {action.label}
                <ArrowRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{action.copy}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <h2 className="text-sm font-medium text-foreground">Your next step</h2>
          <div className="mt-3 rounded-2xl border border-border bg-surface p-6">
            <p className="text-base font-medium text-foreground">
              {profileComplete ? "Generate your next strategic direction" : "Complete your business profile"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {profileComplete
                ? "NOVA will use your saved audience, tone, and vocabulary in every result."
                : "Add your audience, tone, and vocabulary so NOVA can personalize every result."}
            </p>
            <Button asChild className="mt-5">
              <Link to={profileComplete ? "/app/trends" : "/app/voice"}>
                {profileComplete ? "Generate trend ideas" : "Complete profile"}<ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="lg:col-span-2">
          <h2 className="text-sm font-medium text-foreground">Recent activity</h2>
          <div className="mt-3 rounded-2xl border border-border bg-surface p-5">
            {activity.length === 0 ? (
              <div className="py-4 text-center">
                <p className="text-sm text-foreground">Nothing here yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your saved generations and profile changes will show up here.
                </p>
                <Button asChild size="sm" className="mt-4 rounded-lg">
                  <Link to={profileComplete ? "/app/trends" : "/app/voice"}>{profileComplete ? "Generate your first ideas" : "Complete your profile"}</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {activity.slice(0, 6).map((item) => (
                  <li key={item.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <p className="text-sm text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
                    <p className="mt-1 text-xs text-muted-foreground/70">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {!profileComplete ? (
            <div className="mt-3 rounded-2xl border border-border bg-surface p-5">
              <p className="text-sm font-medium text-foreground">Brand voice is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Content sounds generic until NOVA knows your personality, audience and banned words.
              </p>
              <Button asChild size="sm" variant="secondary" className="mt-4 rounded-lg">
                <Link to="/app/voice">Define brand voice</Link>
              </Button>
            </div>
          ) : null}
        </section>
      </div>
    </PageShell>
  );
}
