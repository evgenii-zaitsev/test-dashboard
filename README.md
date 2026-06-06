# Channels Dashboard

A small SPA for managing Telegram channels and their posts. There is no real
backend — all data is mocked on the client, but accessed through an async API
layer as if it were real.

## Stack

- **React 19 + TypeScript** (strict mode, `noUncheckedIndexedAccess`)
- **Vite** — bundler / dev server
- **styled-components** — styling + theming (light/dark)
- **Zustand** — UI state
- **@tanstack/react-query** — all server data (channels, posts, delete)
- **Vitest + Testing Library** — unit tests

## Scripts

```bash
pnpm install
pnpm dev         # start the dev server
pnpm build       # typecheck + production build
pnpm test        # run unit tests
pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint (incl. FSD boundary rules)
pnpm lint:boundaries  # eslint over src — focuses the architectural boundary checks
```

## Architecture (FSD-lite)

```
src/
  app/         # entry, providers (Query + Theme), global styles (GlobalStyle)
  shared/      # domain-agnostic: ui kit, lib (useDebounce, formatDate), theme tokens
  entities/    # channel, post — types + react-query + domain UI (cards, badges)
  features/    # delete-post (mutation + confirm), post-filters, theme-toggle
  widgets/     # channels-grid, channel-drawer, dashboard-page — compose entities + features
  store/       # zustand UI stores (ui/, theme/) split by domain, with selectors
  api/         # mock API split per resource (channels/, posts/) + db/ + lib/ (latency, failure)
```

Each slice exposes a public `index.ts`; cross-slice imports must go through it.

### Enforced boundaries

`eslint-plugin-boundaries` makes the FSD rules executable, not just convention:

- **Layer hierarchy** (low → high): `shared → entities → {store, api} → features → widgets → app`.
  A layer may only depend on lower ones — e.g. `shared` can't import `entities`,
  `entities` can't import `features`.
- **Public API**: a slice (widget/feature/entity) can only be imported through its
  `index.ts`. Reaching into another slice's internals fails lint with
  *"Import a slice through its public index, not its internals."*

Two refactors fell out of turning the rules on (which is the point — they caught real
smells): theme tokens moved `app → shared`, and `StatusBadge`/`ModeBadge` moved from
`shared/ui` into their owning entities (a status badge is post-domain UI, not generic).

## State separation (the key design point)

- **Server state** lives in TanStack Query: `['channels']` and `['posts', channelId]`.
  Deletion is a `useMutation` with an **optimistic update** (the post disappears
  immediately and is rolled back on error); channel counters are invalidated on settle.
  `staleTime` / `gcTime` are tuned so re-opening a drawer within 30s serves cache
  without a skeleton flash.
- **UI state** lives in Zustand: `selectedChannelId`, `isDrawerOpen`, `statusFilter`,
  `searchQuery`, `sortDirection`. No server data is ever stored here. Components read
  through **selectors** to avoid unnecessary re-renders. The theme has its own
  dedicated store (separate UI domain), persisted to `localStorage`.

## Mock API (`src/api/`)

- `fetchChannels()` (channels/), `fetchPostsByChannel(channelId)` / `deletePost(postId)` (posts/)
- 600–800ms artificial latency; reads fail ~10% of the time (`Math.random`) to
  exercise the error/Retry state. Deletes update the in-memory db so changes persist
  for the session.
- 6 channels (one intentionally empty for the empty state), ~36 posts across statuses.

## States handled

Loading (skeletons for channels + posts), empty (no posts vs. no filter matches —
distinct messages), error (with Retry), and disabled (delete button while the
mutation is pending).

## Extras

Responsive (grid → 1 column, drawer → full-screen on mobile), CSS animations
(card stagger, drawer slide-in, modal pop), dark theme via `ThemeProvider`,
optimistic delete with rollback, delete confirmation modal, Escape-to-close drawer,
date sorting, and unit tests for `useDebounce`, the `filterPosts` reducer, and the
Zustand store + selectors.
