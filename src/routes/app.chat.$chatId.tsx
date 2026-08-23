import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { Composer } from "@/components/chat/composer";
import { MessageList } from "@/components/chat/message-list";
import { Button } from "@/components/ui/button";
import { useChat } from "@/lib/nova/chat-store";

export const Route = createFileRoute("/app/chat/$chatId")({
  head: () => ({
    meta: [
      { title: "Chat — NOVA" },
      { name: "description", content: "A focused NOVA conversation with markdown answers." },
      { property: "og:title", content: "Chat — NOVA" },
      {
        property: "og:description",
        content: "A focused NOVA conversation with markdown answers.",
      },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const { chatId } = Route.useParams();
  const { conversations, streamingId, sendMessage, regenerate, stop, ready } = useChat();
  const navigate = useNavigate();
  const conversation = conversations.find((c) => c.id === chatId);

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-lg font-semibold">
            {ready ? "This conversation isn't here anymore" : "Loading conversation…"}
          </h1>
          {ready ? (
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                It may have been deleted or opened on another device.
              </p>
              <Button asChild className="mt-5 rounded-xl">
                <Link to="/app">Start a new chat</Link>
              </Button>
            </>
          ) : null}
        </div>
      </div>
    );
  }

  const streaming = streamingId === conversation.id;

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-14 items-center justify-between gap-3 border-b border-border px-4 sm:px-6">
        <h1 className="truncate text-sm font-medium">{conversation.title}</h1>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 rounded-lg text-muted-foreground hover:text-foreground"
          onClick={() => void navigate({ to: "/app" })}
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">New chat</span>
        </Button>
      </header>

      <div className="scroll-slim min-h-0 flex-1 overflow-y-auto">
        <MessageList
          messages={conversation.messages}
          streaming={streaming}
          onRegenerate={() => regenerate(conversation.id)}
        />
      </div>

      <div className="border-t border-border px-4 py-4 sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          <Composer
            autoFocus
            streaming={streaming}
            onStop={stop}
            onSubmit={(value) => sendMessage(conversation.id, value)}
          />
        </div>
      </div>
    </div>
  );
}
