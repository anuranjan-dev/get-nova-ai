import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LineChart,
  Radar,
  Settings,
  Sparkles,
  Wand2,
} from "lucide-react";

import { NovaLogo } from "@/components/nova/logo";
import { useWorkspace } from "@/lib/nova/workspace-store";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/trends", label: "Trend Scanner", icon: Radar },
  { to: "/app/studio", label: "Content Studio", icon: Wand2 },
  { to: "/app/voice", label: "Brand Voice", icon: Sparkles },
  { to: "/app/insights", label: "Insights", icon: LineChart },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { profile, profileComplete } = useWorkspace();

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="px-4 py-4">
        <Link to="/" onClick={onNavigate} aria-label="NOVA home">
          <NovaLogo />
        </Link>
      </div>

      <nav className="mt-2 space-y-0.5 px-3">
        {nav.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 p-3">
        {!profileComplete ? (
          <Link
            to="/app/voice"
            onClick={onNavigate}
            className="block rounded-xl border border-border bg-surface p-3 transition-colors hover:border-border-strong"
          >
            <p className="text-xs font-medium text-foreground">Brand voice not set</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Define it once so every generation sounds like you.
            </p>
          </Link>
        ) : null}

        <Link
          to="/app/settings"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-sidebar-accent/60"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-surface-2 text-xs font-medium text-foreground">
            AR
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm text-foreground">Ada Reyes</span>
            <span className="block truncate text-xs text-muted-foreground">
              {profile.brandName || "Marketing workspace"}
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
