import { generateContent, scanTrends } from "./nova.functions";
import type { NovaClient } from "./types";

export const novaClient: NovaClient = {
  scanTrends: ({ category, brandName }) => scanTrends({ data: { category, brandName } }),
  generateContent: ({ brief, profile }) => generateContent({ data: { brief, profile } }),
};
