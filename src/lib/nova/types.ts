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
  /** Brand-specific "why this matters" line, already personalised. */
  brandAngle: string;
  momentum: number;
  window: string;
}

export interface TrendReport {
  category: string;
  /** Brand the scan was run for. */
  brandName: string;
  generatedAt: number;
  risingTopics: TrendItem[];
  contentIdeas: string[];
  hashtags: { tag: string; trend: "up" | "flat" }[];
  conversations: { audience: string; theme: string; takeaway: string }[];
}

export interface ReputationReport {
  brandName: string;
  category: string;
  strengths: { title: string; context: string }[];
  risks: { title: string; context: string }[];
  fixes: { title: string; action: string }[];
}

export type ActivityKind = "trend" | "content" | "reputation" | "voice" | "profile";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  title: string;
  detail: string;
  createdAt: number;
}

/**
 * Contract the UI depends on. Implemented through authenticated server functions;
 * model credentials and prompts never enter the browser bundle.
 */
export interface NovaClient {
  scanTrends(input: {
    category: string;
    brandName: string;
    signal?: AbortSignal;
  }): Promise<TrendReport>;
  generateContent(input: {
    brief: ContentBrief;
    profile?: BrandProfile | null;
    signal?: AbortSignal;
  }): Promise<ContentResult>;
}
