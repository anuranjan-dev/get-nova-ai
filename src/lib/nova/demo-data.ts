/** Sample data for the Insights dashboard until a real data source is connected. */

export const insightsDemo = {
  kpis: [
    { label: "Content produced", value: "128", delta: "+34%", positive: true },
    { label: "Avg. engagement rate", value: "6.8%", delta: "+1.2pt", positive: true },
    { label: "Saves per post", value: "412", delta: "+18%", positive: true },
    { label: "Time to first draft", value: "3m", delta: "−72%", positive: true },
  ],
  engagement: [
    { week: "W1", value: 38 },
    { week: "W2", value: 44 },
    { week: "W3", value: 41 },
    { week: "W4", value: 56 },
    { week: "W5", value: 63 },
    { week: "W6", value: 59 },
    { week: "W7", value: 74 },
    { week: "W8", value: 82 },
  ],
  formats: [
    { name: "Short-form video", score: 88 },
    { name: "Carousel", score: 71 },
    { name: "Creator collab", score: 66 },
    { name: "Static post", score: 39 },
    { name: "Story poll", score: 33 },
  ],
  slots: [
    { day: "Tuesday", time: "18:00–20:00", note: "Highest saves from 18–24 audience" },
    { day: "Thursday", time: "12:00–13:00", note: "Peak comment activity mid-week" },
    { day: "Sunday", time: "20:00–22:00", note: "Best window for longer storytelling" },
  ],
  recommendations: [
    "Shift two static posts per week into short-form video — it earns 2.3× the engagement in your category.",
    "Your captions drift formal after 40 words. Keep them under 30 to match your defined brand voice.",
    "Creator collabs peak in week 4 of a launch, not week 1. Hold budget back for the follow-through.",
  ],
};
