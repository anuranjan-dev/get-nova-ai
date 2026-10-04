import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { ContentResult, ReputationReport, TrendReport } from "./types";

const profileSchema = z.object({
  brandName: z.string(),
  personality: z.array(z.string()),
  audience: z.string(),
  tone: z.string(),
  useWords: z.string(),
  avoidWords: z.string(),
  updatedAt: z.number().nullable(),
});

const contentSchema = z.object({
  brief: z.object({
    brandName: z.string(),
    product: z.string(),
    audience: z.string(),
    platform: z.enum(["TikTok", "Instagram", "YouTube Shorts", "X", "Email", "Landing page"]),
    goal: z.enum(["Awareness", "Engagement", "Followers", "Sales", "Launch hype", "Community"]),
    tone: z.string(),
  }),
  profile: profileSchema.optional().nullable(),
});

async function saveResult(
  context: { supabase: any; userId: string },
  kind: "trend" | "content" | "reputation",
  title: string,
  input: Record<string, unknown>,
  output: unknown,
) {
  const { error } = await context.supabase.from("ai_results").insert({
    user_id: context.userId,
    kind,
    title,
    input,
    output,
  });
  if (error) throw new Error("The result was generated but could not be saved.");
  await context.supabase.from("activity").insert({
    user_id: context.userId,
    kind,
    title,
    detail: "AI-generated ideas based on your business",
  });
}

export const generateContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => contentSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { generateJson } = await import("./ai.server");
    const output = (await generateJson(`Create a content idea set for this brief: ${JSON.stringify(data)}.
Return this exact JSON shape with string arrays: {"postIdeas":[],"hooks":[],"captions":[],"adCopy":[],"ctas":[],"hashtags":[]}.
Keep ideas concise, useful, and honest. Hashtags must begin with #.`)) as ContentResult;
    await saveResult(context, "content", `${data.brief.platform}: ${data.brief.product}`, data.brief, output);
    return output;
  });

export const scanTrends = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ category: z.string(), brandName: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    const { generateJson } = await import("./ai.server");
    const output = (await generateJson(`Create strategic trend hypotheses for category ${JSON.stringify(data.category)}${data.brandName ? ` and brand ${JSON.stringify(data.brandName)}` : ""}.
These are ideas, not live trend observations. Return JSON: {"category":"","brandName":"","generatedAt":0,"risingTopics":[{"title":"","summary":"","brandAngle":"","momentum":0,"window":""}],"contentIdeas":[],"hashtags":[{"tag":"","trend":"up"}],"conversations":[{"audience":"","theme":"","takeaway":""}]}.
Provide 4 topics, 4 ideas, 6 hashtags, and 3 audience themes. Momentum is a clearly labeled AI relevance score from 0 to 100, not measured activity. Set generatedAt to ${Date.now()}. Use no quotes attributed to people and no hashtag volumes.`)) as TrendReport;
    await saveResult(context, "trend", `${data.category} ideas`, data, output);
    return output;
  });

export const checkReputation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ category: z.string(), brandName: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    const { generateJson } = await import("./ai.server");
    const output = (await generateJson(`Create a reputation planning exercise for ${JSON.stringify(data.brandName)} in ${JSON.stringify(data.category)}, based only on the business names supplied. Do not state what real people think.
Return JSON: {"brandName":"","category":"","strengths":[{"title":"","context":""}],"risks":[{"title":"","context":""}],"fixes":[{"title":"","action":""}]}. Provide 3 of each and make every item explicitly hypothetical or a validation question.`)) as ReputationReport;
    await saveResult(context, "reputation", `${data.brandName} reputation ideas`, data, output);
    return output;
  });