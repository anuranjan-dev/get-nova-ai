import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

import { createLovableAiGatewayRunIdFetch } from "./run-id.server";

const MODEL = "openai/gpt-6-astra";
const BASE_URL = "https://ai.gateway.lovable.dev/v1";

function safeMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  return "NOVA could not generate ideas right now.";
}

function parseJson(text: string): unknown {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = (match?.[1] ?? text).trim();
  return JSON.parse(candidate);
}

export async function generateJson(prompt: string) {
  const apiKey = process.env['LOVABLE_API_KEY']!;
  const runIdFetch = createLovableAiGatewayRunIdFetch();
  const provider = createOpenAI({
    baseURL: BASE_URL,
    apiKey,
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
    fetch: runIdFetch.fetch,
  });

  try {
    const result = streamText({
      model: provider.responses(MODEL),
      system:
        "You are NOVA, a careful marketing strategist for youth-focused brands. Return only valid JSON. Never claim live, real-time, scraped, measured, or verified social data. Frame every output as AI-generated strategic ideas based only on the supplied business context. Do not invent customer quotes, audience statistics, volumes, performance, or factual claims.",
      prompt,
      maxRetries: 0,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "medium",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });
    return parseJson(await result.text);
  } catch (error) {
    throw new Error(safeMessage(error));
  }
}