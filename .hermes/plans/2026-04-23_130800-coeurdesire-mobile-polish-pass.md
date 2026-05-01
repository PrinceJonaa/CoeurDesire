# CoeurDesire Mobile Polish Pass Implementation Plan

> **For Hermes:** Use software-engineering discipline and execute this as a focused second-pass mobile responsiveness polish, not a broad redesign.

**Goal:** Fix the remaining narrow-screen Mission/header layout problems in the local `CoeurDesire` repo while preserving the already-completed easy mobile fixes.

**Architecture:** Keep the existing structure intact and make a conservative responsive pass in two places: the shared layout shell (`components/Layout.tsx`) and the Mission page (`pages/Mission.tsx`). The main move is to make the mobile breakpoint behavior kick in earlier where needed and to reduce oversized hero composition on narrow screens rather than rewriting page structure.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind-style utility classes, Framer Motion, React Router.

---

## Current Context / Assumptions

- Repo path: `/tmp/CoeurDesire`
- The first grouped mobile fixes are already applied and build successfully.
- Confirmed changed areas from prior pass:
  - `components/Layout.tsx`
  - `pages/Mission.tsx`
  - `index.css`
- Current QA signal:
  - the page still feels too desktop-like on narrow/mobile-like widths
  - remaining concern is mainly Mission/header polish, not a broken build
- Existing build verification command:
  - `npm run build`
- Existing local preview server is/was on:
  - `http://127.0.0.1:4173`

---

## Proposed Approach

1. **Tighten shared header behavior first**
   - Ensure inline desktop nav does not appear in widths where it still crowds the logo/title.
   - Prefer earlier collapse to the mobile menu over trying to squeeze more inline links into narrow space.

2. **Reduce Mission hero density on mobile**
   - Lower mobile hero height.
   - Reduce icon and heading scale slightly.
   - Add tighter width and padding constraints so the hero reads cleanly in a phone viewport.

3. **Polish Mission content spacing where needed**
   - Keep the existing quote-card fix.
   - If needed, stack or center supporting icon rows more gracefully on narrow screens.

4. **Rebuild and browser-QA**
   - Confirm build still passes.
   - Re-open Home and Mission in browser tools and inspect mobile-like output.

---

## Files Likely to Change

### Modify
- `/tmp/CoeurDesire/components/Layout.tsx`
- `/tmp/CoeurDesire/pages/Mission.tsx`

### Likely unchanged unless needed
- `/tmp/CoeurDesire/index.css`
- `/tmp/CoeurDesire/pages/Home.tsx`

---

## Bite-Sized Execution Plan

### Task 1: Tighten header breakpoint behavior

**Objective:** Prevent the shared top nav from feeling crowded on narrow widths by collapsing to the mobile toggle earlier or otherwise reducing header density.

**Files:**
- Modify: `/tmp/CoeurDesire/components/Layout.tsx`

**Planned edits:**
- Inspect the current `hidden md:flex` desktop nav and `md:hidden` mobile toggle pairing.
- Change the breakpoint pair if needed so the inline nav does not appear until a wider viewport.
- Keep the current mobile drawer approach; do not introduce a new navigation system.
- Preserve the current logo truncation protections.

**Verification:**
- Header should show logo + menu button cleanly on narrow/mobile-like view.
- No right-side nav truncation in Mission QA.

---

### Task 2: Reduce Mission hero density on mobile

**Objective:** Make the Mission hero look intentionally mobile-scaled instead of like a desktop hero squeezed into a phone viewport.

**Files:**
- Modify: `/tmp/CoeurDesire/pages/Mission.tsx`

**Planned edits:**
- Reduce mobile hero height from the current fixed composition if it still feels too tall.
- Slightly reduce the icon circle and heading scale on the smallest breakpoint.
- Tighten hero container padding and max-width behavior.
- Keep desktop/tablet sizing intact as much as possible.

**Verification:**
- Heading should fit naturally without looking clipped or over-dominant.
- Hero should feel balanced vertically on a mobile-like screenshot.

---

### Task 3: Polish Mission content row behavior on narrow screens

**Objective:** Ensure supporting Mission content does not create subtle mobile awkwardness after hero improvements.

**Files:**
- Modify: `/tmp/CoeurDesire/pages/Mission.tsx`

**Planned edits:**
- Review the `Radiance / Softness` icon row.
- If spacing looks cramped, allow better stacking/wrapping/centering on mobile.
- Keep quote card safely inside viewport bounds.

**Verification:**
- No obvious cramped row or horizontal pressure in the first Mission content section.

---

### Task 4: Rebuild after the second pass

**Objective:** Confirm the polish pass does not break production build output.

**Files:**
- No code changes in this step

**Run:**
- `npm run build`

**Expected:**
- Vite build succeeds with no errors.

---

### Task 5: Browser QA on Home and Mission

**Objective:** Confirm the updated layout looks better in a mobile-like browser view and that prior fixes still hold.

**Targets:**
- `http://127.0.0.1:4173/`
- `http://127.0.0.1:4173/mission`

**Check for:**
- Header/logo readability
- Menu toggle visibility / no truncated inline nav
- Mission hero scale and spacing
- Sticky CTA fit on pages where shown
- Footer text still clear and not hidden

**Expected:**
- No obvious top-nav truncation
- Mission hero feels intentionally mobile-scaled
- No regression in footer/CTA behavior

---

## Risks / Tradeoffs

- **Breakpoint tradeoff:** collapsing the desktop nav earlier may slightly increase hamburger-menu use on small tablets, but that is better than visible crowding.
- **Hero tradeoff:** if mobile sizing is reduced too aggressively, the Mission page may lose some visual drama. Favor readability over drama on phones.
- **Scope control:** do not broaden this into a full redesign of the Home hero unless QA reveals a real regression there.

---

## Definition of Done

This pass is done when all of the following are true:

- shared header no longer looks crowded or truncated in narrow/mobile-like QA
- Mission hero no longer reads like a desktop composition squeezed into mobile
- project still passes `npm run build`
- prior sticky CTA/footer protections remain intact

---

## Recommended Immediate Next Action

Implement **Task 1** and **Task 2** together first, because they address the visible remaining issue with the least code churn. Then rebuild and QA before touching anything else.
