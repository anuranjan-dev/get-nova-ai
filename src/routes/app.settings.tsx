import { createFileRoute, redirect } from "@tanstack/react-router";

// Replaced in the workspace redesign; old links keep working.
export const Route = createFileRoute("/app/settings")({
  beforeLoad: () => {
    throw redirect({ to: "/app/profile", replace: true });
  },
});
