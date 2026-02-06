# Specification

## Summary
**Goal:** Populate the existing Study Material section with a starter set of NCERT and GCRT textbook entries without requiring any admin upload.

**Planned changes:**
- Add backend seed data for Study Material including at least one NCERT textbook item and at least one GCRT textbook item, using a book-like content type and non-empty titles.
- Ensure seeding runs only when the Study Material store is empty to avoid duplicates on repeated canister starts within the same deployment.
- Keep all user-facing UI text in English while making the seeded items visible in the existing Study Material section (without login).

**User-visible outcome:** Visitors (not logged in) can open the Landing Page, scroll to Study Material, and see Study Material cards for at least one NCERT textbook and at least one GCRT textbook immediately after deployment.
