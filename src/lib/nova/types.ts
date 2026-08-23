export type Role = "user" | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

/**
 * Contract the UI depends on. Today it is fulfilled by the local mock client
 * (`src/lib/nova/mock-client.ts`). Later, swap in an implementation that calls
 * a FastAPI backend (`POST /api/chat` -> Gemini) without touching any UI code.
 */
export interface NovaAIClient {
  streamReply(
    input: { messages: Message[]; signal?: AbortSignal },
    onChunk: (text: string) => void,
  ): Promise<string>;
  suggestTitle(firstUserMessage: string): Promise<string>;
}
