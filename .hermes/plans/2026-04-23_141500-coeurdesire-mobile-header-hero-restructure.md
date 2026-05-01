# CoeurDesire Mobile Header + Hero Restructure Plan

> **For Hermes:** Use subagent-driven-development discipline if executing this later. The current hardening pass reached diminishing returns; the remaining issues require a structural responsive rewrite, not more spacing tweaks.

**Goal:** Eliminate persistent narrow-screen header clipping and the unstable/empty-looking Mission hero by restructuring the mobile behavior in `components/Layout.tsx` and `pages/Mission.tsx`.

**Architecture:** Stop trying to preserve a desktop header shape into ambiguous intermediate widths. Make mobile behavior explicit below a chosen breakpoint, with a real two-mode header: compact logo + toggle on mobile/tablet, full inline nav only on clearly wide desktop. On the Mission page, separate mobile hero composition from desktop hero composition so phone layout is intentionally stacked and centered instead of being a squeezed desktop scene.

**Tech Stack:** React 19, TypeScript, Vite, Framer Motion, React Router, utility-class styling.

---

## Why planning is needed now

The repo is build-safe, but browser QA still reports the same two structural failures after multiple polish passes:
- top nav remains inline/clipped at narrow/mobile-like widths
- Mission hero still renders poorly in the browser capture and reads as unstable or blank/overly sparse

That means the problem is no longer about micro-adjustments to spacing, padding, or typography. The next change should be a deliberate responsive rewrite with explicit mobile-first rendering rules.

---

## Current verified state

**Repo:** `/tmp/CoeurDesire`

**Files already touched in prior passes:**
- `/tmp/CoeurDesire/components/Layout.tsx`
- `/tmp/CoeurDesire/pages/Mission.tsx`
- `/tmp/CoeurDesire/index.css`

**Still failing in QA:**
- Home header/nav can still appear as clipped inline desktop nav at narrow width
- Mission header shows the same behavior
- Mission hero is still not trustworthy in narrow-browser QA

**Still passing:**
- `npm run build`

---

## Target design decision

### Header
Use a strict split:
- **Mobile/tablet (< desktop threshold):**
  - logo only
  - menu toggle only
  - no inline nav links at all
- **Desktop (wide only):**
  - full inline nav
  - CTA button

Do not rely on incremental breakpoint nudging alone.

### Announcement bar
Use explicit message tiers:
- **mobile:** one short message only
- **tablet:** one medium message only
- **desktop:** full promotional message

### Mission hero
Create two intentional compositions:
- **mobile hero:**
  - stacked, centered
  - small icon
  - compact headline
  - no fragile offset composition
  - quote card either below the visual or fully in-flow
- **desktop hero:**
  - may keep richer composition and offsets

---

## Files to modify

### Primary
- `/tmp/CoeurDesire/components/Layout.tsx`
- `/tmp/CoeurDesire/pages/Mission.tsx`

### Optional
- `/tmp/CoeurDesire/index.css` (only if a tiny global helper is needed)

---

## Bite-sized execution plan

### Task 1: Replace ambiguous header responsiveness with explicit two-mode behavior

**Objective:** Ensure no sub-desktop viewport can render the inline nav.

**Files:**
- Modify: `/tmp/CoeurDesire/components/Layout.tsx`

**Steps:**
1. Keep the desktop nav in a wrapper that is only visible at a clearly wide breakpoint.
2. Keep the menu toggle visible at all widths below that breakpoint.
3. Remove any class combinations that still allow partial header crowding at intermediate widths.
4. Verify the logo block has a strict max-width budget when toggle is present.

**Acceptance:**
- Browser snapshot/vision should no longer show clipped inline nav on narrow widths.

---

### Task 2: Tier the announcement bar by viewport instead of squeezing one message

**Objective:** Stop announcement text from overflowing/cropping at narrow widths.

**Files:**
- Modify: `/tmp/CoeurDesire/components/Layout.tsx`

**Steps:**
1. Define a short mobile-only string.
2. Define a medium tablet-only string.
3. Keep the full string only for wide desktop.
4. Do not rely on truncation as the primary mobile behavior.

**Acceptance:**
- Browser QA should show a fully readable top message at narrow width.

---

### Task 3: Rebuild the Mission mobile hero as a distinct stacked layout

**Objective:** Make the Mission hero obviously intentional on phones instead of an adapted desktop composition.

**Files:**
- Modify: `/tmp/CoeurDesire/pages/Mission.tsx`

**Steps:**
1. Introduce a mobile-first hero layout with centered stack order.
2. Keep the icon and heading in normal flow.
3. Make the decorative circular visual smaller and directly below the text.
4. Move the quote card below the visual or inside the flow on mobile.
5. Preserve richer offset composition only from a larger breakpoint upward.

**Acceptance:**
- Hero must look populated and balanced in narrow-browser QA.
- No empty-looking top section.

---

### Task 4: Re-check first content section spacing after hero restructure

**Objective:** Ensure the mobile hero rewrite does not leave awkward jumps into “Our Philosophy.”

**Files:**
- Modify: `/tmp/CoeurDesire/pages/Mission.tsx`

**Steps:**
1. Re-check spacing between hero and content.
2. Ensure icon row still wraps cleanly.
3. Keep quote behavior in-bounds.

---

### Task 5: Rebuild and QA

**Run:**
- `npm run build`

**QA targets:**
- `http://127.0.0.1:4173/`
- `http://127.0.0.1:4173/mission`

**Check for:**
- no inline-nav clipping on narrow widths
- readable announcement bar text
- Mission hero visually populated and centered
- no footer/CTA regressions

---

## Risks / tradeoffs

- This will make the site feel more overtly mobile-adapted below desktop widths, which is correct.
- The Mission hero may lose some decorative drama on phones, but the current alternative is instability and perceived breakage.
- This is no longer a polish pass; it is a responsive structure pass.

---

## Definition of done

Done means:
- narrow-width QA never shows clipped inline desktop nav
- announcement bar is readable without truncation at narrow width
- Mission hero no longer appears blank, broken, or off-balance in browser QA
- build still passes
