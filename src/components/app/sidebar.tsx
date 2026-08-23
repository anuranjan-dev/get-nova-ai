import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

import { NovaLogo } from "@/components/nova/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useChat } from "@/lib/nova/chat-store";
import { cn } from "@/lib/utils";

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { conversations, renameConversation, deleteConversation } = useChat();
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...conversations].sort((a, b) => b.updatedAt - a.updatedAt);
    if (!q) return list;
    return list.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.messages.some((m) => m.content.toLowerCase().includes(q)),
    );
  }, [conversations, query]);

  const navItem = (active: boolean) =>
    cn(
      "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
    );

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex items-center justify-between px-4 py-4">
        <Link to="/" onClick={onNavigate} aria-label="NOVA home">
          <NovaLogo />
        </Link>
      </div>

      <div className="space-y-3 px-3">
        <Button
          className="w-full justify-start gap-2 rounded-xl"
          onClick={() => {
            onNavigate?.();
            void navigate({ to: "/app" });
          }}
        >
          <Plus className="size-4" />
          New chat
        </Button>

        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats"
            aria-label="Search conversations"
            className="h-9 rounded-xl border-border bg-surface pl-9 text-sm"
          />
        </div>
      </div>

      <div className="scroll-slim mt-5 flex-1 overflow-y-auto px-3">
        <p className="px-2.5 pb-2 text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
          Recent
        </p>
        {filtered.length === 0 ? (
          <p className="px-2.5 py-2 text-sm text-muted-foreground">
            {query ? "No matching chats." : "Your chats will appear here."}
          </p>
        ) : (
          <ul className="space-y-0.5">
            {filtered.map((conversation) => {
              const active = pathname === `/app/chat/${conversation.id}`;
              return (
                <li key={conversation.id} className="group relative">
                  {editingId === conversation.id ? (
                    <Input
                      autoFocus
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onBlur={() => {
                        renameConversation(conversation.id, draft);
                        setEditingId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          renameConversation(conversation.id, draft);
                          setEditingId(null);
                        }
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      className="h-9 rounded-lg border-border bg-surface text-sm"
                      aria-label="Rename conversation"
                    />
                  ) : (
                    <>
                      <Link
                        to="/app/chat/$chatId"
                        params={{ chatId: conversation.id }}
                        onClick={onNavigate}
                        className={cn(navItem(active), "pr-8")}
                      >
                        <span className="truncate">{conversation.title}</span>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            aria-label={`Options for ${conversation.title}`}
                            className="absolute top-1/2 right-1 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground focus-visible:opacity-100"
                          >
                            <MoreHorizontal className="size-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onClick={() => {
                              setDraft(conversation.title);
                              setEditingId(conversation.id);
                            }}
                          >
                            <Pencil className="size-4" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              deleteConversation(conversation.id);
                              if (active) void navigate({ to: "/app" });
                            }}
                          >
                            <Trash2 className="size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="space-y-0.5 border-t border-sidebar-border px-3 py-3">
        <Link to="/app/tools" onClick={onNavigate} className={navItem(pathname === "/app/tools")}>
          <LayoutGrid className="size-4" />
          AI Tools
        </Link>
        <Link
          to="/app/settings"
          onClick={onNavigate}
          className={navItem(pathname.startsWith("/app/settings"))}
        >
          <Settings className="size-4" />
          Settings
        </Link>
      </div>

      <div className="border-t border-sidebar-border p-3">
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
            <span className="block truncate text-xs text-muted-foreground">Pro workspace</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
