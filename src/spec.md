# Specification

## Summary
**Goal:** Add a new “Daily Pollution” content feature that can be publicly browsed by day and managed by admins.

**Planned changes:**
- Create a new backend content model and persistent store for Daily Pollution entries keyed by numeric day, including fields: id, day, title, description, optional sourceUrl.
- Expose public (unauthenticated) backend read methods to list all Daily Pollution entries and list entries by day key.
- Add admin-only backend methods (allowlist-based) to create and delete Daily Pollution entries.
- Seed the Daily Pollution store with a small starter dataset (at least 5 entries across at least 3 different day keys).
- Add a new “Daily Pollution” section on the public landing page with a day selector (matching the existing Daily Test Series day-selector pattern) plus loading, error, and empty states.
- Extend the Admin Content Manager with a “Daily Pollution” tab to create entries (select date + required fields) and delete entries (with confirmation), following existing admin-guard and UX patterns.

**User-visible outcome:** Visitors (including anonymous users) can browse Daily Pollution entries by day on the landing page, and admins can add/delete Daily Pollution entries from the Admin Content Manager.
