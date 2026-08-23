import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { mockClient } from "./mock-client";
import type { Conversation, Message, NovaAIClient } from "./types";

const STORAGE_KEY = "nova.conversations.v1";

/** Swap this for a FastAPI-backed client later; nothing else changes. */
const client: NovaAIClient = mockClient;

const uid = () => Math.random().toString(36).slice(2, 10);

interface ChatContextValue {
  conversations: Conversation[];
  streamingId: string | null;
  ready: boolean;
  startConversation: (prompt: string) => string;
  sendMessage: (conversationId: string, prompt: string) => void;
  regenerate: (conversationId: string) => void;
  stop: () => void;
  renameConversation: (conversationId: string, title: string) => void;
  deleteConversation: (conversationId: string) => void;
  createEmptyConversation: () => string;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setConversations(JSON.parse(raw) as Conversation[]);
    } catch {
      /* ignore corrupted local state */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    } catch {
      /* storage may be unavailable */
    }
  }, [conversations, ready]);

  const patch = useCallback(
    (id: string, fn: (c: Conversation) => Conversation) => {
      setConversations((prev) => prev.map((c) => (c.id === id ? fn(c) : c)));
    },
    [],
  );

  const run = useCallback(
    async (conversationId: string, history: Message[]) => {
      const controller = new AbortController();
      abortRef.current = controller;
      setStreamingId(conversationId);

      const assistantId = uid();
      patch(conversationId, (c) => ({
        ...c,
        updatedAt: Date.now(),
        messages: [
          ...c.messages,
          { id: assistantId, role: "assistant", content: "", createdAt: Date.now() },
        ],
      }));

      try {
        await client.streamReply({ messages: history, signal: controller.signal }, (text) => {
          patch(conversationId, (c) => ({
            ...c,
            messages: c.messages.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + text } : m,
            ),
          }));
        });
      } finally {
        abortRef.current = null;
        setStreamingId(null);
      }
    },
    [patch],
  );

  const startConversation = useCallback(
    (prompt: string) => {
      const id = uid();
      const now = Date.now();
      const first: Message = { id: uid(), role: "user", content: prompt, createdAt: now };
      const conversation: Conversation = {
        id,
        title: prompt.replace(/\s+/g, " ").split(" ").slice(0, 6).join(" ").slice(0, 48),
        messages: [first],
        createdAt: now,
        updatedAt: now,
      };
      setConversations((prev) => [conversation, ...prev]);
      void run(id, [first]);
      return id;
    },
    [run],
  );

  const createEmptyConversation = useCallback(() => {
    const id = uid();
    const now = Date.now();
    setConversations((prev) => [
      { id, title: "New conversation", messages: [], createdAt: now, updatedAt: now },
      ...prev,
    ]);
    return id;
  }, []);

  const sendMessage = useCallback(
    (conversationId: string, prompt: string) => {
      const message: Message = {
        id: uid(),
        role: "user",
        content: prompt,
        createdAt: Date.now(),
      };
      let history: Message[] = [message];
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== conversationId) return c;
          history = [...c.messages, message];
          const title =
            c.messages.length === 0
              ? prompt.replace(/\s+/g, " ").split(" ").slice(0, 6).join(" ").slice(0, 48)
              : c.title;
          return { ...c, title, messages: history, updatedAt: Date.now() };
        }),
      );
      void run(conversationId, history);
    },
    [run],
  );

  const regenerate = useCallback(
    (conversationId: string) => {
      let history: Message[] = [];
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== conversationId) return c;
          const messages = [...c.messages];
          while (messages.length && messages[messages.length - 1]!.role === "assistant") {
            messages.pop();
          }
          history = messages;
          return { ...c, messages, updatedAt: Date.now() };
        }),
      );
      if (history.length) void run(conversationId, history);
    },
    [run],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreamingId(null);
  }, []);

  const renameConversation = useCallback(
    (conversationId: string, title: string) => {
      patch(conversationId, (c) => ({ ...c, title: title.trim() || c.title }));
    },
    [patch],
  );

  const deleteConversation = useCallback((conversationId: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== conversationId));
  }, []);

  const value = useMemo(
    () => ({
      conversations,
      streamingId,
      ready,
      startConversation,
      sendMessage,
      regenerate,
      stop,
      renameConversation,
      deleteConversation,
      createEmptyConversation,
    }),
    [
      conversations,
      streamingId,
      ready,
      startConversation,
      sendMessage,
      regenerate,
      stop,
      renameConversation,
      deleteConversation,
      createEmptyConversation,
    ],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside <ChatProvider>");
  return ctx;
}
