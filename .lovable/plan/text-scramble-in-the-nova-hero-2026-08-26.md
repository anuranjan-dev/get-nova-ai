# Text Scramble in the NOVA hero

## Does it fit?

Yes — with one condition. NOVA's positioning is premium B2B trend intelligence, and a scramble/decode effect reads as "signal resolving into meaning", which is on-message for cultural signal detection. It stops fitting if it loops, runs on every element, or delays readability. So: one run, on mount, ~0.8s, then the real text stays put permanently.

## Where it goes

Homepage hero heading only (`src/routes/index.tsx`):

```text
AI Marketing Intelligence      <- scrambles once on load
for Youth Brands.              <- static, never scrambles
```

Only the first line animates. The subheadline, badge, buttons, workspace preview and every `/app` screen stay exactly as they are. No scramble anywhere else in the product.

## Behaviour

- Runs once per page load, never on scroll or hover.
- Duration ~0.8s, character set limited to letters + a few glyphs so it stays legible mid-flight.
- Spaces preserved so the line never reflows or jumps layout.
- Final state is plain text — screen readers and SEO see the real heading (the `<h1>` text content is present from the first render).
- Respects `prefers-reduced-motion`: renders the final text immediately, no animation.

## Dependencies

None required. Motion Primitives ships Text Scramble as a copy-paste component whose only real dependency is `motion` for a wrapper element — the scramble itself is a `requestAnimationFrame` timer over the string. NOVA has no `motion`/`framer-motion` installed, so I'll port the same effect as a small dependency-free component instead of adding a ~50KB animation library for one heading. Same visual result, no bundle cost, nothing else in the app changes.

## Technical detail

- New file `src/components/nova/text-scramble.tsx`: `<TextScramble>` client component, props `children` (string), `duration`, `speed`, `className`, `as`. Uses `useEffect` + `requestAnimationFrame`, cleans up its frame on unmount, and skips animating under reduced motion.
- Hydration safety: initial render outputs the final string, and scrambling only starts in `useEffect`, so SSR and client markup match (no hydration mismatch).
- `src/routes/index.tsx`: wrap the first hero line in `<TextScramble>`; the `<span className="block text-muted-foreground">for Youth Brands.</span>` line is untouched. Existing classes, spacing and metadata unchanged.

## The prompt you asked for

> Add the Motion Primitives Text Scramble effect to the NOVA homepage hero `<h1>`. Only the first line ("AI Marketing Intelligence") animates; the second line stays static. It must run exactly once on mount (~0.8s), never loop or replay on hover/scroll, and end on the real readable text. Implement it as a dependency-free `requestAnimationFrame` component at `src/components/nova/text-scramble.tsx` rather than installing `motion`. Render the final string on first paint so SSR/hydration and SEO are unaffected, preserve spaces so the layout never shifts, and honour `prefers-reduced-motion` by skipping the animation. Do not change any other styling, route, or component.
