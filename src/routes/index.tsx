import { createFileRoute } from "@tanstack/react-router";

import { ReferenceHomepage } from "@/components/landing/reference-home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVA — AI Marketing Intelligence for Youth Brands" },
      {
        name: "description",
        content:
          "Discover emerging trends, create on-brand content, and make smarter marketing decisions with NOVA.",
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
  component: ReferenceHomepage,
});
