# Integrate the Anomalous Matter hero visual

## Goal
Add the supplied animated Three.js form to NOVA’s existing homepage hero without replacing its messaging, navigation, calls to action, or command-center preview.

## Implementation
- Install `three` and its TypeScript definitions; the project already has the required shadcn structure, Tailwind CSS v4, TypeScript, and the standard `src/components/ui` path.
- Rebuild the incomplete pasted snippet as a typed, reusable `AnomalousMatterHero` component in `src/components/ui/anomalous-matter-hero.tsx`.
- Keep browser-only work inside effects, cap pixel density, resize safely, respect reduced-motion preferences, respond subtly to pointer movement, and fully dispose WebGL resources on unmount.
- Use NOVA’s semantic theme tokens for the shader colors and update them when light/dark mode changes.
- Place the visual as a subtle, non-interactive atmospheric layer behind the existing homepage hero copy, preserving readability and the current layout.
- Repair the existing one-character syntax error in the unfinished Reputation Check route so the project can build; no other Reputation Check behavior will be changed.

## Validation
- Confirm TypeScript and the preview build are clean.
- Verify the homepage at desktop and mobile widths, including light and dark themes.
- Confirm the canvas is visible, the headline and buttons remain readable/clickable, and there are no console or hydration errors.
