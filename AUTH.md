# Authentication and Security

## Current authentication method

The application uses Better Auth with the Prisma adapter and PostgreSQL. The login
interface currently offers Google sign-in. A successful first Google sign-in can
create the user's account. Email/password sign-in and registration are not enabled
by the current configuration.

## Environment variables

Copy `.env.example` to `.env` and set real local values:

- `DATABASE_URL`: PostgreSQL connection string.
- `BETTER_AUTH_URL`: application origin, for example `http://localhost:3000`.
- `BETTER_AUTH_SECRET`: a long, random secret. Generate a different value for
  every environment.
- `AUTH_GOOGLE_CLIENT_ID` and `AUTH_GOOGLE_CLIENT_SECRET`: credentials from the
  Google OAuth client configured for the application.
- `ADMIN_EMAILS`: comma-separated email allowlist for administrators. Do not
  expose this variable to client-side code.

Never commit `.env`, production secrets, OAuth credentials, or database passwords.

## Session and authorization rules

- `getSession()` reads the Better Auth session from request headers.
- `requireUser()` redirects signed-out page requests to `/login`.
- `requireAdmin()` requires a signed-in user whose email is in `ADMIN_EMAILS`.
- `isAdminAuthorized()` provides a boolean check for server actions that should
  return an authorization error instead of redirecting.
- Destination mutations must check admin authorization inside each server action,
  even if the page containing the form is protected.
- Trip operations must derive the owner ID from the authenticated session and
  constrain reads, updates, and deletes by that owner ID.
- `safeNextPath()` permits only internal absolute paths and falls back to `/` for
  external or ambiguous redirect inputs.

The Prisma `User.role` field exists, but this implementation deliberately keeps
the existing `ADMIN_EMAILS` policy to avoid silently changing the team's role
assignment model. If the team adopts database roles, update role assignment,
session typing, and authorization tests together.

## Local verification

1. Configure `.env` and ensure PostgreSQL is available.
2. Install dependencies with `npm install`.
3. Generate the Prisma client with `npx prisma generate` if needed.
4. Run `npm test`, `npm run lint`, and `npm run build`.
5. Sign in with an authorized Google account and verify sign-out works.
6. Try `/login?next=/dashboard` and confirm successful login returns to the
   internal path.
7. Try `/login?next=https://example.com` and `/login?next=//example.com`; both
   should fall back to `/`.
8. While signed out, attempt a protected admin page and a trip server action.
   Both must deny access.
9. Sign in as a non-admin and verify `/admin` and destination mutation actions are denied.
10. Verify a user cannot update or delete another user's trip.

## Scope notes

This guide documents the current Google sign-in flow. It does not claim that
email/password registration, password reset, email verification, or multi-factor
authentication are enabled.
