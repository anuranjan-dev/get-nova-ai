import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Composer } from "@/components/chat/composer";
import { useChat } from "@/lib/nova/chat-store";
import { suggestions } from "@/lib/nova/suggestions";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Workspace — NOVA" },
      {
        name: "description",
        content: "Your NOVA workspace: start a chat, pick up a recent thread, or open a tool.",
      },
      { property: "og:title", content: "Workspace — NOVA" },
      {
        property: "og:description",
        content: "Your NOVA workspace: start a chat, pick up a recent thread, or open a tool.",
      },
    ],
  }),
  component: WorkspaceHome,
});

function greeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function WorkspaceHome() {
  const { startConversation } = useChat();
  const navigate = useNavigate();

  const send = (prompt: string) => {
    const id = startConversation(prompt);
    void navigate({ to: "/app/chat/$chatId", params: { chatId: id } });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="scroll-slim flex flex-1 items-center overflow-y-auto px-4 py-10 sm:px-6">
        <div className="mx-auto w-full max-w-3xl animate-rise">
          <h1 className="text-balance-tight text-3xl font-semibold sm:text-[2.5rem] sm:leading-[1.1]">
            {greeting()}, Ada.
            <span className="block text-muted-foreground">What are we thinking about?</span>
          </h1>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.title}
                type="button"
                onClick={() => send(suggestion.prompt)}
                className="group surface-sheen rounded-2xl border border-border bg-surface p-4 text-left transition-colors hover:border-border-strong hover:bg-surface-2"
              >
                <suggestion.icon className="size-4 text-primary" />
                <span className="mt-3 block text-sm font-medium text-foreground">
                  {suggestion.title}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {suggestion.hint}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          <Composer onSubmit={send} autoFocus />
        </div>
      </div>
    </div>
  );
}
