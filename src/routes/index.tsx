import { createFileRoute } from "@tanstack/react-router";

import { StudioHomepage } from "@/components/landing/studio-home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVA — AI Marketing Intelligence for Youth Brands" },
      {
        name: "description",
        content:
          "NOVA turns emerging youth-culture signals into clear marketing opportunities, campaign strategy, and on-brand content.",
      },
      { property: "og:title", content: "NOVA — AI Marketing Intelligence for Youth Brands" },
      {
        property: "og:description",
        content:
          "See what youth culture is becoming and create what belongs next with NOVA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudioHomepage,
});
