# Make NOVA fully account-backed

## Scope
- Replace the mock login and signup flows with real email/password and Google authentication.
- Protect the workspace and source the sidebar, greetings, and settings identity from the signed-in account.
- Store each user's business profile, generated content, scan results, and activity in Lovable Cloud with private per-user access rules.
- Replace local demo generators and fixed dashboard analytics with authenticated backend AI calls and saved user results.
- Remove sample badges, fake metrics, quotations, sessions, integrations, billing records, and placeholder identities from every app page.
- Add a consistent loading, empty, and retryable error experience to every workspace page.
- Label all AI output exactly “AI-generated ideas based on your business” and avoid live-data claims.
- Preserve the existing purple workspace layout and make both light and dark themes use shared design tokens.

## User experience
- A signed-out visitor uses real signup or login; Google is also available.
- A new user lands on an empty overview with one primary next step: complete their business profile.
- Completed profiles automatically personalize forms and AI requests.
- Generated results are saved to the user's account and power recent activity and insights; empty accounts show guidance instead of invented values.
- Settings shows only verified account/profile data. Unsupported billing, session, connection, and API-key controls are replaced by honest empty or unavailable states.

## Technical details
- Add private `profiles`, `brand_profiles`, `ai_results`, and `activity` tables with row-level ownership policies.
- Use authenticated TanStack server functions for all reads, writes, and AI calls.
- Call the Lovable AI Gateway only on the server with `openai/gpt-6-astra`; no key or endpoint UI is exposed.
- Register the authentication middleware, use the managed protected-route layout, and migrate app routes under it without changing their public URLs.
- Keep public homepage marketing content separate from user data; remove any fake in-product preview values that imply real account results.

## Verification
- Test signup/login and signed-out route protection.
- Verify a fresh account sees only empty states, then verify profile saving and AI generation persist after refresh.
- Check all workspace routes in light and dark modes on desktop and mobile.
- Confirm the build, runtime console, and network requests are clean.
