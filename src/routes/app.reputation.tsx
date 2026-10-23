import { createFileRoute, redirect } from "@tanstack/react-router";

// Replaced in the workspace redesign; old links keep working.
export const Route = createFileRoute("/app/reputation")({
  beforeLoad: () => {
    throw redirect({ to: "/app/captions", replace: true });
  },
});
