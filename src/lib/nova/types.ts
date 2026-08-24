/** Domain types for NOVA — AI marketing intelligence for youth brands. */

export interface BrandProfile {
  brandName: string;
  personality: string[];
  audience: string;
  tone: string;
  useWords: string;
  avoidWords: string;
  updatedAt: number | null;
}

export type ContentPlatform =
  | "TikTok"
  | "Instagram"
  | "YouTube Shorts"
  | "X"
  | "Email"
  | "Landing page";

export type MarketingGoal =
  | "Awareness"
  | "Engagement"
  | "Followers"
  | "Sales"
  | "Launch hype"
  | "Community";

export interface ContentBrief {
  brandName: string;
  product: string;
  audience: string;
  platform: ContentPlatform;
  goal: MarketingGoal;
  tone: string;
}

export interface ContentResult {
  postIdeas: string[];
  hooks: string[];
  captions: string[];
  adCopy: string[];
  ctas: string[];
  hashtags: string[];
}

export interface TrendItem {
  title: string;
  summary: string;
  momentum: number;
  window: string;
}

export interface TrendReport {
  category: string;
  generatedAt: number;
  risingTopics: TrendItem[];
  contentIdeas: string[];
  hashtags: { tag: string; volume: string; trend: "up" | "flat" }[];
  conversations: { audience: string; quote: string; takeaway: string }[];
}

export type ActivityKind = "trend" | "content" | "voice";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  title: string;
  detail: string;
  createdAt: number;
}

/**
 * Contract the UI depends on. Fulfilled today by the local demo client
 * (`src/lib/nova/nova-client.ts`). Later, point `novaClient` at a Python
 * (FastAPI) backend — e.g. `POST /api/trends` and `POST /api/content` — without
 * touching any UI code. No API keys ever live in the frontend.
 */
export interface NovaClient {
  scanTrends(input: { category: string; signal?: AbortSignal }): Promise<TrendReport>;
  generateContent(input: {
    brief: ContentBrief;
    profile?: BrandProfile | null;
    signal?: AbortSignal;
  }): Promise<ContentResult>;
}
