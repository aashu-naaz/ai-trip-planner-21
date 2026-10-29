# SmartJourney

AI-assisted travel planning built with Next.js, React, Clerk, Convex, Mapbox, Google Places, and Gemini. The interface uses a shared violet theme, scroll reveals and spring hover effects with Motion, locally bundled fonts, and the SmartJourney logo for browser and home-screen icons.

## Local setup

Use Node.js 24 (the version used for verification).

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local`, then fill in the development values for your accounts.
3. In Clerk, create a JWT template named `convex`, using the Convex template with audience `convex`. Include the standard email claim. Copy its issuer URL to `CLERK_JWT_ISSUER_DOMAIN` in your Convex environment as well as your local environment.
4. Run `npx convex dev` to deploy the schema, authentication configuration, and functions to your development Convex project.
5. Run `npm run dev`. Open http://localhost:3000.

The Next.js development indicator is disabled. Authentication forms use `/sign-in` and `/sign-up`; new accounts continue to the planner. Pricing comes from the plans configured in Clerk, rather than hardcoded prices.

## Verification

- `npm run lint -- --max-warnings=0` — strict linting.
- `npm test` — request deduplication, concurrency limits, map coordinates, trip saves, ownership checks, contact validation, and production configuration tests.
- `npm run build` — production compilation and type checking.
- `npm run check` — runs all of the above in sequence.
- `npm run verify:production` — checks production configuration without printing secrets. This intentionally fails when using development Clerk keys or missing production services.

The scroll effects run once as sections enter view, animate opacity and transforms, and respect reduced-motion preferences. Maps do not rotate continuously. Photo requests share a cache and run at most four at a time. Fonts and decorative effects require no third-party asset requests.

## Deploy

The code is prepared for a Next.js host that supports Node.js 24. Configure the production services before opening it to public traffic:

1. Create/select production Clerk and Convex instances. Configure the Clerk production domain, allowed redirect URLs, sign-in methods, and the `convex` JWT template. Set `CLERK_JWT_ISSUER_DOMAIN` in the **Convex production environment**. Deploy `convex/` to production with `npx convex deploy` using the appropriate Convex credentials.
2. Set the host's environment variables from `.env.example`, using the production `NEXT_PUBLIC_CONVEX_URL`, live Clerk keys, Gemini, Arcjet, Google Places, and Mapbox credentials. Set `GEMINI_MODEL` if your Google AI account requires a different supported model. Enable Places API (New). Restrict the public Mapbox token to the domains that serve this app. Weather is optional.
3. Configure `CONTACT_WEBHOOK_URL` with an HTTPS service that accepts JSON `{ name, email, message }` and delivers support requests. Set `CONTACT_WEBHOOK_TOKEN` if that service expects a bearer token. Only a successful HTTP response displays a sent confirmation. Failed/unconfigured delivery preserves the visitor's draft.
4. Configure and publish your actual plans and payment settings in Clerk. The app does not create pricing plans or payment-provider accounts.
5. Set the build command to `npm run build:production`, and the start command to `npm start` for a Node server. On a host with automatic Next.js detection, use its Next.js preset and Node.js 24. Public environment variables are embedded at build time, so rebuild after changing them.
6. Check sign-in, sign-up, a full generated trip, save/reload, public sharing, PDF printing, a test-mode subscription, and contact delivery with your own production service setup before taking real payments.

`npm run verify:production` validates configuration shape, not external account permissions or payment delivery. No public deployment or external account changes are performed by these commands until you run the relevant deployment command.

Personal collections and saved places require a verified Clerk token and enforce ownership in Convex. Trip viewing and printing remain public by unguessable trip link, so only share trip links you intend others to view. Guest chat drafts also use random trip identifiers. Keep service secrets on the server; use `GOOGLE_PLACE_API_KEY` for new deployments rather than the legacy public variable.

## Useful paths

- `components/ui/motion.tsx` — lazy-loaded reveal and hover motion system.
- `app/globals.css` — theme, shared styles, reduced-motion behavior.
- `app/icon.svg`, `app/favicon.ico`, `public/apple-touch-icon.png` — logo icons.
- `next.config.mjs` — deployment headers and development indicator settings.
- `convex/auth.ts` — server-side ownership rules.
- `.env.example` — configuration template without credentials.

Bundled fonts retain their licenses in `app/fonts/`.
