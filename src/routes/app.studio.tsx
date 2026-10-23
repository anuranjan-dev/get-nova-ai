import { createFileRoute, redirect } from "@tanstack/react-router";

// Replaced in the workspace redesign; old links keep working.
export const Route = createFileRoute("/app/studio")({
  beforeLoad: () => {
    throw redirect({ to: "/app/scheduler", replace: true });
  },
});
