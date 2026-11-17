# Extracted Design Instructions & Web-Dev Golden Nuggets

This playbook consolidates every rule from [DESIGN_PRINCIPLES.md](file:///C:/Users/Hp/Downloads/better-find-deslop/DESIGN_PRINCIPLES.md), adds the non-overlapping guardrails from `/design-taste-frontend` (`tasteskill 2.5`), and captures 40 design lessons, bug fixes, and user taste overrides extracted across web-dev sessions (`spiral-lab-deslop`, `better-find-deslop`, `guitar-practice-webapp`, `life-lessons`, `herdr-multitasking`, and `design-collections`).

---

## Part 1: All Instructions Extracted from `DESIGN_PRINCIPLES.md`

### 1.1 Agent Operating Rules
1. **Derive, never clone.** Never copy a reference project's domain copy or green palette onto another product. Derive a fresh Five-Line Direction and color triad for each product.
2. **Write direction before code.** Lock the Five-Line Direction and color triad before creating components or stylesheets.
3. **Execute in strict pass order.** Complete each pass across the full screen before moving to the next:
   `1. Spacing -> 2. Color -> 3. Icons -> 4. Copy -> 5. Type -> 6. Layout -> 7. Details -> 8. Visuals -> 9. Motion`
   - Spacing first (rhythm and alignment govern everything).
   - Copy before Type and Layout (word counts dictate scale, line breaks, and columns).
   - Visuals and Motion last (the static frame must work first).
4. **Verify programmatically.** Treat contrast ratios, `4px` spacing, `tabular-nums`, `:focus-visible`, `prefers-reduced-motion`, and anti-slop bans as hard pass/fail checks.

### 1.2 The Five-Line Direction (Write Before Coding)
1. **Product:** What it does and for whom, in one plain sentence.
2. **Character:** Two or three concrete words (`calm, exact, a little warm` or `architectural, direct, technical`). **Banned adjectives:** `clean`, `modern`, `sleek`, `minimal`, `premium`.
3. **World:** Physical environment or material (paper and ink, night-shift instruments, deep forest and obsidian). Dictates neutral tint, accent hue, and lighting.
4. **Moments:** One or two places where rich color, 3D material, or dense data lives.
5. **Signature:** One small, product-specific detail used consistently—and only one.

### 1.3 Color Architecture: Two Quiet + One Loud
Let **two quiet colors** carry `90%` of the layout; assign **one loud color (`--accent-loud`)** to carry focal tension.

- **Three proven quiet-pair structures:**
  1. **Tinted Dark + Warm Off-White:** e.g., `#050B09` + `#FDFDF8` (never pure `#000000` or `#FFFFFF`).
  2. **Two Steps of One Tonal Family:** e.g., `#00226C` + `#0DA2F6`.
  3. **Bold Structural Field + Crisp Off-White:** e.g., `#723CD8` / `#EF5001` / `#FA3802` / `#2293FF` + `#FCFEFF` / `#FDFDFF`.
- **One Loud Color (`--accent-loud`):** High-tension complement (e.g., `#60FD60` Neon Jade, `#CEF302` Yellow Punk, `#ECB159` Sunglow Gold, `#CBFB02` Acid Lime, `#EE3F24` Amber Red, `#F398D4` Bubblegum Pink).
- **"Imagine It Without It" litmus test:** Mute `--accent-loud`; the two quiet colors alone must look balanced and readable. Turn it back on; the eye must lock onto the focal target within `100ms`.
- **Four permitted jobs for `--accent-loud` (1–2 per viewport, never scattered):**
  1. Primary conversion CTA pill (and matching top-right nav CTA).
  2. Climactic headline word + color-blocked conversion slab (or full-bleed chapter canvas in `--accent-loud` with `--ink` text).
  3. Sparse graphic stamps/doodles (`#`, tapered underline swoosh, circular stamp).
  4. Localized backlight or motion streak bounded strictly to the hero focal subject.
- **Dark depth & surface tokens:**
  - Step dark layers (`--bg-void`, `--bg-slab`, `--bg-tone`) with `1px` hairlines at `8%–14%` foreground opacity (`rgba(253, 253, 248, 0.12)`). Reserve box shadows for floating chrome (sticky headers, dropdowns).
  - Live accent switcher: bind `--accent-loud` to `[data-accent]` on `document.documentElement`, persist in `localStorage`, and pre-verify every preset against `--ink` for WCAG AA (`>= 4.5:1` normal, `>= 3:1` large).
  - Flat discipline plates (`CARD_STYLES`): draw fills only from the palette family, pair each with an explicit `ink` token and scoped `--card-bg` custom property so SVG negative-space strokes match their host plate.
  - External partner/tool logos (`BuiltWithSection`): render neutral/monochrome at rest (`--bg-slab` + `8%` hairline); reveal brand color and glow only on hover or explicit toggle.
- **Banned:** gradient-clipped text, multi-hue surface washes, saturated static shadows, blurry radial color blobs behind content.
- **Field-Tested `2 Quiet + 1 Loud` Reference Triads (9-Brand Library):**
  1. **Creative Studio / Streetwear (`SOMA®`):** Deep Plum `#221331` (`#150A20` void) + Electric Violet `#7540F5` spotlight / Paper `#F5F4F8` + Acid Lime `#D6FA4A` (portrait rim glow, `32+` award stat, rectangular CTA slab).
  2. **Neurotech / Biometric Telemetry (`MindVision`):** Cloudy White `#F0F0F4` + Galactic Violet `#5B46FF` + Bubblegum Pink `#F75CC0` (bottom-left dual-hue aurora under white `Outfit 300` display type + chamfered conversion dock CTA).
  3. **Dark Editorial Agency (`Designova`):** Obsidian Black `#0C0C0A` (`#141311` charcoal) + Blaze Orange `#F15419` (jacket + brand mark) + Glacier Blue `#77E7FE` (active nav pill, hero CTAs, cyan glasses).
  4. **Health & Fitness Companion (`Pelmatech`):** Royal Purple `#723CD6` + Crisp White `#FCFFFF` + Sunglow Gold `#EDB158` (golden panning trail behind fluted glass + active session border/dot).
  5. **Kinetic Motion Studio (`Kinetic`):** Tangerine Orange `#EE5001` + Crisp White `#FCFFFF` + Acid Lime `#C8FD03` (horizontal speed streaks + embedded pill thumbnail).
  6. **Creator Growth Agency — Playful (`Upfluence` A):** Lagoon Blue `#7BDFF2` + Cloud White `#F7F7F0` + Bubblegum Pink `#F2B5D4` (centered CTA pill + alternating rect/circle creator strip).
  7. **Creator Growth Agency — Urgent (`Upfluence` B):** Sky Blue `#0099FF` + Cloudy White `#FDFDFE` + Amber Red `#EE3F24` (swapping quiet sky step and loud CTA hue shifts mood from playful to urgent on identical layout).
  8. **Web3 SocialFi Collective (`BASE CLUB`):** Red Orange `#F42902` + Snowy White `#FDFDFF` + Yellow Punk `#CEF302` (`#` doodle, hand-drawn loop arrows, rotating circular stamp over stacked `CLUB / SOCIALFI / PEOPLE`).
  9. **Enterprise Voice AI (`Transform9+`):** Sapphire Blue `#0042AC` + Ocean Blue `#00D3FB` + Neon Jade `#83FD80` (backlit caller silhouette + `Forever.` payoff word + split bottom conversion slab).

### 1.4 Section Cadence, Masks, and Hero Grammar
- **Alternate full-bleed surface registers:** Never stack dark cards on the same dark ground down the whole page. Alternate chapters (e.g., Loud Hero -> Deep Void -> Warm Paper -> Mid-Tone Slab -> Loud CTA -> Deep Void Footer with edge-to-edge display wordmark).
- **Sheet overlap:** Pull dark content sheets over bright heroes (`-mt-10` with `32px–40px` top radii) when the visual language uses layered sheets.
- **Subtle field texture (`.grid-lines`):** `48x48px` grid of `1px` ink lines (or `1px` vertical pinstripes) at `6%–8%` opacity, masked vertically with `mask-image: linear-gradient(to bottom, #000 40%, transparent 100%)`.
- **Alpha-masked marquees (`.marquee-mask`):** `mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)` and pause `.marquee-track` on `:hover`.
- **Six `100dvh` poster hero archetypes (never default to a generic centered stack):**
  1. Asymmetric Split + Crafted Artifact (headline, max 2 CTAs, bottom metrics + right centerpiece).
  2. Monumental Bottom Wordmark (edge-to-edge bottom display wordmark).
  3. Centered Headline + Bottom-Rising Media Strip (2-line headline, 1 loud CTA pill, cropped frames rising from bottom edge).
  4. Atmospheric Dark Split + Color-Blocked Action Slab (1 loud payoff word + solid bottom-right CTA slab).
  5. Symmetrical Bust + Orbital Frosted HUD Widgets (`MindVision`: centered hardware/visor portrait ringed by 5–6 `backdrop-filter: blur(14px)` telemetry cards, bottom-left aurora mesh under light display type, and a chamfered bottom-right conversion dock).
  6. Stacked Display Wall + Tilted Glass Cards & Stamp Counterpoint (`BASE CLUB`: full-bleed `64x64px` grid canvas, 3-line stacked `Archivo Black` `0.9` line-height type, tilted translucent PFP cards, hand-drawn loud-accent doodles, and slow-spinning `22s` SVG circular stamp).
- **Header scroll condensation:** Condense fixed header height (`68px -> 58px`), max-width, and padding past `28px` scroll while deepening backdrop opacity.
- **Standardized subpage poster heroes:** Full-bleed `100dvh` `--accent-loud` + `.grid-lines`, top-right stroke-drawn `LoopArrowTop`, two-line `.reveal-lines > .brk` `<h1>`, split lead (`max-w-[28ch–34ch]`) + max 2 CTAs, and bottom 3-column `<dl>` proof bar with `1px` vertical dividers (`20%–25%` ink opacity).
- **Interactive hero jump-indices:** `4x2` staggered `aspect-square` miniature diagram plates in upper-right hero quadrant; clicking resets category filters to `"All"` and smooth-scrolls to `#cap-01`–`#cap-08` with `scroll-margin-top: 112px`.

### 1.5 Typography, Grid, Ledgers, and States
- **At most three font families:**
  1. **Display (`--font-head`):** `clamp()` fluid sizing, `0.88–1.05` line-height, `-0.03em` to `-0.055em` tracking only at large display sizes.
  2. **Interface Sans (`--font-sans`):** weights `400`, `500`, `600`; `1.5–1.65` line-height; `28ch–56ch` measure.
  3. **Monospace (`--font-mono`):** indices (`01`–`08`), stacks, SLAs, timestamps, phone numbers.
- **Small-text guards:** Never use negative tracking below `16px`, never drop font size below `11px`, avoid italics, default to sentence case, never pair uppercase prose labels with `>= 0.06em` tracking, and enforce `font-variant-numeric: tabular-nums` on every standalone number.
- **`4px` spatial grid & nested radii:** Use multiples of `4px` (`2px` nudges only inside compact controls) inside `1240px–1440px` rails. Nest radii (`inner = outer - padding`, min `4px`): `6–12px` badges/inputs, `16–24px` cards, `28–40px` sheets, full pills for primary CTAs/toggles.
- **No `2px` hairline seams:** In bordered multi-column grids, put `border-t border-l` on the parent grid and `border-r border-b` on each child cell.
- **12-column ledgers & staggered cards:** Full-width hairline rows on a 12-column grid; stagger alternating card columns vertically (`mt-6` / `xl:mt-8`) while keeping padding and baselines identical.
- **Semantic `<dl>` specs:** Use `<dl>`, `<dt>`, `<dd>` for stat bars and spec tables; highlight at most **one** primary metric per group in `--accent-loud`.
- **Complete interactive states:** Wire filters with `role="tablist"` / `role="tab"` (`aria-selected`), design `00` empty states with explanation + CTA, and provide in-place form confirmation with a reset trigger.

### 1.6 Hand-Drawn Counterpoint, 3D Craft, Interaction, and Motion
- **Monochrome vector counterpoint:** Max one ink beat per section (`#`, 3 burst rays, tapered underline, looping arrow). Flat `currentColor`/`--ink`, `stroke-linecap: round`, `aria-hidden="true"`, zero gradients or drop shadows.
- **Procedural WebGL (`ThreeHeroCanvas`):** `36°` studio FOV, `ACESFilmicToneMapping` (`exposure: 1.1`), DPR capped at `2`, 3-point studio lighting + procedural `envMap`, true front/back orbital occlusion (`z > 0` and `z < 0`), background ambient spheres isolated on `renderOrder = -2` with `depthWrite: false`, damped pointer tilt clamped to `±10°` (`0.06` lerp), calm ambient star peak (~75% still), and full `.dispose()` cleanup on unmount.
- **Decisive surface inversion (`.fill-hover`):** On `:hover`, `:focus-within`, and `:active`, flip card/row background to `--accent-loud` and text to `--ink`, overriding `.muted` (`rgba(5,11,9,0.72)`) and `.pop` (`var(--ink)`). Nudge headings `translateX(4px)` and slide `.work-arrow` from `-10px` to `0`.
- **Button press physics (`.btn-interactive`):** Lift `-2px` on hover, `scale(0.98)` on `:active`, glide internal SVG arrows `+4px`. Never scale full cards up on hover.
- **Two shared easing curves:** `--ease: cubic-bezier(0.22, 1, 0.36, 1)` (`150–320ms` interactive) and `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` (`420–480ms` entrances). Explicitly name transitioned properties; ban `transition: all`, bouncy overshoots, and layout-thrashing animations (`width/height/top/left`).
- **Reveal choreography:** Reveal elements inside `innerHeight * 0.92` on the next `rAF`; observe below-the-fold once via `IntersectionObserver` (`threshold: 0.08`, `rootMargin: "0px 0px -36px 0px"`); use `MutationObserver` on `document.body` to bind filtered/dynamically added cards. Stagger with `45ms` increments (`.delay-1` to `.delay-8`), optional `115deg` one-shot `.scan::after` highlight (`0.95s`).
- **Two-tier SVG motion:** Draw strokes once on scroll (`.draw-path`, `.cap-draw`); gate continuous diagram loops (`.cap-flow`, `.cap-pulse`, `.cap-seq`, `.cap-scan`) strictly behind `.cap-card:hover`.
- **Reduced motion & focus rings:** Disable all reveals, sweeps, draws, and marquees under `@media (prefers-reduced-motion: reduce)`. Render a `2px` `:focus-visible` outline (`--accent-loud` on dark, `--ink` on `.on-loud`/`.on-paper`).

### 1.7 Copy, Chrome, and Automated Verification
- **Ban hype words & punctuation noise:** No *seamless, cutting-edge, revolutionize, supercharge, unlock, magic, game-changing, robust, next-gen*. Lead with falsifiable figures and explicit baselines (`99.97% uptime`, `<200ms tool calls`, `+4.2 pts vs prior 30d`). Zero `!`, zero UI emoji, no trailing periods on headlines/subheads/buttons/`<dt>`/short captions.
- **Cohesive chrome:** `1.5px–2px` stroke icons with round caps/joins inheriting `currentColor`; `16px` custom scrollbar (`--bg-void` track, stepped dark thumb, `--accent-loud` `:active`, `@supports` Firefox fallback); `32px–44px` minimum tap targets.
- **Playwright automated audit (`verify-redesign.mjs` at `1440x900` & `390x844`):** Alpha-composited WCAG AA contrast check across ancestor chains; CSS AST + computed-style scan banning `background-clip: text`, saturated shadows, `:hover` `scale(>1)`, overshooting beziers, `transition: all`, layout transitions, UI font weights `> 600` outside display heroes, negative tracking `< 16px`, text `< 11px`, uppercase wide-tracked labels, emoji, `!`, hype copy; plus `scrollWidth <= clientWidth`, single `<h1>`, `<main>`, accessible names, `prefers-reduced-motion`, zero console errors, and visible `:focus-visible` on first `Tab`.

---

## Part 2: Non-Overlapping Guardrails from `/design-taste-frontend` (`tasteskill 2.5`)

When building full client websites with `/design-taste-frontend`, these extra rules sit alongside Part 1:
1. **Business-kind routing:** Classify every brief first (`software`, `gaming`, `tech`, `product`, `service`, `place`). Shaders, WebGL scenes, loops, CSS grounds, and dark heroes belong to `tech`/`software`/`gaming` only; local places (`cafe`, `bakery`, `shop`) get flat color, square photographs (`12–20` full, `8–12` compact), and type-led moments.
2. **One section per screen:** Hero alone on screen 1; every section `1–2` screens tall (`1440x900`) with zero neighboring headings or imagery peeking in at the fold.
3. **Equal left & right edges:** Every block aligns to the `.wrap` rail or grid columns; no one-sided bleeds or sideways scroll at `1440`, `1024`, `820`, `768`, `390`, `320`.
4. **Zero captions under visuals:** Never place captions or descriptions beneath photographs, renders, or visual frames (credits go in one footer line).
5. **Product & object restraint:** One hero object leads at most 3 sections total (`hero` + 2 others). On product pages, show the product large, use a different view per section, picture every headline promise, bind color swatches to image changes, and never repeat a fact.
6. **Real icons & honest placeholders:** Use real full-colour icons for known external tools (`icons.mjs`); strip real house numbers, postcodes, VAT/register numbers, real phone formats, and real contact emails in favor of `.example` stand-ins and street/district only (unless client brief supplies verified public info).

---

## Part 3: Golden Nuggets Extracted from Web-Dev Chats

These rules came directly from user feedback, visual debugging, and multi-agent audits across six real projects.

### 3.1 Minimalism, Copy Restraint & Removing AI Tells
1. **"Less words, more impact" beats comprehensive walls of text** (`fcf33e55`, `b51dd1e4`, `dead4ed5`):
   - Dense multi-line cards, stacked eyebrow pills, and long explanations feel bloated even when technically "unslopped". Trim feature cards down to **title + 1 short phrase + 1 key metric + small visual**, and target ~75% less prose on landing views.
   - Hide dense secondary lists (such as a 14-exercise routine breakdown) behind a clean **Hero Card + Expand/Collapse toggle** by default so the screen breathes (`dead4ed5`).
2. **Avoid over-designed skeuomorphism too** (`dead4ed5`):
   - Swinging from AI glassmorphism to heavy faux-leather tolex, fake screw-heads, and bulky 3D chassis bevels makes an app feel cluttered ("over designed"). Strip decorative hardware chrome down to quiet, high-contrast neutral surfaces with tactile functional feedback only where the user interacts.
3. **Ban fake status dots, top accent strips, and terminal-style punctuation** (`09edf2bb`, `a9b3ce32`, `dc051971`, `dc51177c`, `6d136636`, `5ac5780a`):
   - Remove decorative green indicator dots next to buttons (`Book a call`), footer status lines (`Within 24 hours`), and case-study pills—they read as template AI slop.
   - Remove `1px`–`4px` neon/gradient accent strips along the tops of cards or sections.
   - Purge `//` pseudo-code prefixes (`// 01`, `CASE STUDIES // IN PRODUCTION`), flanking dashes (`— Built With —`), em-dashes (`—`), and green monospace "terminal links" (`Explore full capability catalog`). Use normal sans-serif links with subtle underline draw (`dc51177c`, `b51dd1e4`).
4. **Font selection matters for human feel** (`ae0b1f03`, `b51dd1e4`, `cb0669e4`):
   - Template pairings like `Plus Jakarta Sans` + `Fraunces` or forcing monospace onto prose links signal AI generation (`ae0b1f03`, `b51dd1e4`). Stick to proven geometric/grotesk pairings (`Space Grotesk` + `JetBrains Mono`, or `Inter` + native system stack) and **always inherit `font-family` and `letter-spacing` on `<button>` elements** (browsers do not inherit button fonts by default).

### 3.2 Color Balance & Brand Decoupling
5. **Never copy a winning palette onto another brand** (`cb0669e4`, `2026-11-13-betterfind-landing-design.md`):
   - Even if a palette (`#050B09` Forest Void + `#60FD60` Neon Jade) works brilliantly on one project (`Spiral Lab`), reusing its hexes, `48x48` grid backdrop, rounded sheet overlaps, or 3-dot switcher on a second project (`betterfind.ai`) ruins originality. Build a distinct triad and surface grammar per client (e.g., `Track Black #111313` + `Race Blue #123DD0` + `Volt Yellow #E5FF00` + `Crisp White #F4F6F8` with sharp `0–4px` poster corners).
6. **Minimalism != Colorless** (`fcf33e55`):
   - Cutting bloat does not mean turning the page monochrome grey. Keep strong chapter-level color blocks and a crisp focal accent so the page has visual tension.
7. **Never break section-to-section color rhythm with outlier panels** (`a9b3ce32`, `09edf2bb`):
   - An isolated white inspector block, a stray `#0D3B2E` forest box inside a pure `#050B09` void page, or a bright red badge/panel breaks the rhythm between neighboring bands. Keep every sub-panel anchored inside its section's surface ramp.
8. **Gate partner/tech logo walls off the homepage** (`09edf2bb`, `2a41ae05`):
   - Move "Built With" technology logo grids off the main landing page onto `/work` so they don't break the hero -> offer -> proof color cadence. Never repeat logos, and replace wobbly auto-traced SVGs (e.g., JS/TS icons) with official geometric vector paths.

### 3.3 Typography, Spacing & Viewport Calibration
9. **Fix ascender/descender collisions and missing line breaks** (`dc051971`, `a9b3ce32`, `5a9ec643`):
   - `leading-[0.88]` + `font-extrabold` + `-0.05em` tracking causes **y/h** (`Systems / shipped`) and **p/t** (`Capability / catalog`) collisions. Keep display `line-height` at **`1.02–1.05`**, weight at **`500–600`**, and tracking at **`-0.025em` to `-0.03em`**.
   - Always include explicit `<br />` breaks between `.brk` headline spans so words don't concatenate on one line and collide with top-right corner embellishments (`Let's talkbusiness` under `LoopArrowTop`).
10. **Never fake a zoomed-out look with `html { zoom: 0.9 }`** (`e50be2c3`):
    - Using `zoom: 0.9` with `min-height: 111vh` and `justify-between` creates a massive ~`500px` empty desert inside the hero and stretches horizontal layouts. Design at real `100%` scale using calibrated padding and rail widths (`1240px–1440px`).
11. **Calibrate the hero fold at true viewport dimensions** (`5ac5780a`, `2774b236`, `8ae15504`, `b88016d7`):
    - Leave `~92–126px` clearance below a floating pill navbar and `36–54px` breathing room below the bottom `<dl>` stats bar.
    - Ensure the hero covers `100%` of the fold so zero black bar leaks underneath and Section 2's heading is never sliced in half at the bottom of `1440x900`.
12. **Unify content rail width and panel sizes across every route** (`b51dd1e4`, `a9b3ce32`, `dc051971`):
    - Subpages (`/services`, `/work`, `/about`) must share the landing hero's exact horizontal rail width (`1240–1440px`), never narrower margins.
    - Sibling panels (e.g., engagement models or handover cards) must match in width, height, and inner padding (`p-6 sm:p-8` / `24–32px`), avoiding one oversized box next to compact peers.
13. **Show 4 cards + "View all eight" instead of an 8-card vertical wall** (`b51dd1e4`):
    - Put the best 4 discipline cards in one `1440x900` viewport row with a clean toggle button to expand the remaining 4 on demand.
14. **Protect sticky-header clearance over the footer** (`6d136636`):
    - Size the pre-footer CTA and footer so that at max scroll on desktop (`1920x981`), the sticky header remains inside the CTA band (`~164px` buffer) rather than colliding with the dark footer wordmark, while keeping the monumental footer wordmark unclipped at the bottom.
15. **Order landing sections for story + color alternation** (`b51dd1e4`):
    - Follow *Hero -> Offer ("what we do") -> Proof ("selected work") -> Engagement -> CTA*, alternating surface tones at every seam.

### 3.4 CSS Traps, Motion Restraint & 3D Discipline
16. **Avoid hover flicker and restless motion** (`b51dd1e4`, `8ae15504`, `5ac5780a`):
    - **Never lift a card on `:hover`** (`-translate-y-1`)—if the user's cursor sits near the bottom edge, lifting moves the card away and triggers rapid hover-on/hover-off flickering. Keep card frames stationary (also keep summary stats cards stationary on hover) and animate internal strokes with gentle `3px` bobs instead of `opacity: 0` fades.
    - **Restrain idle animations:** Rapidly oscillating headlines, jittering CSS 3D shadows, and moving `#` / `\|/` doodles feel cheap (`5ac5780a`). Keep headings, doodles, and primary marks **100% static**; if ambient stars twinkle, use an `8s` cycle (`~80%` still rest, `4s` stagger).
17. **Never use inline `style={{ color }}` on `.fill-hover` metrics** (`2774b236`, `5ac5780a`):
    - Inline styles beat `.fill-hover:hover` CSS rules, making accent figures invisible (green-on-green) when the card background fills with `--accent-loud`. Use CSS class `.pop` so `:hover` cleanly flips text to `var(--ink)`.
18. **Scope `clip-path` reveals cleanly** (`5ac5780a`):
    - Apply `clip-path: inset(0 0 0 0)` only to `.reveal--clip.is-visible` so sibling doodles (`CurlyDoodleArrow`) outside the text box are never sliced off.
19. **Chrome 121+ custom scrollbar workaround** (`6d136636`):
    - Declaring `scrollbar-color` disables all `::-webkit-scrollbar` pseudo-elements in Chrome 121+. Wrap `scrollbar-color` inside `@supports not selector(::-webkit-scrollbar)` so Chromium renders the custom `16px` bold scrollbar (`::-webkit-scrollbar-button { display: none }`, active drag thumb in `var(--accent-loud)`) while Firefox gets the standard fallback.
20. **Three.js / WebGL vs Live Coded Product Moments** (`cb0669e4`, `5ac5780a`, `7df7829b`):
    - Prefer a **live coded product UI moment** (e.g., interactive multi-engine Verbatim Answer Capture trace) over a generic spinning 3D prism whenever the product is software (`cb0669e4`).
    - When a WebGL 3D emblem is used: avoid unstable manual drag-to-spin if quaternion/Euler rotation glitches occur (`7df7829b`)—use gentle multi-harmonic idle levitation + clamped cursor parallax, and position background spheres directly behind the tile's vertical midpoint (`y = 0.0`, `renderOrder = -2`, `depthWrite = false`) so foreground orbital rings never clip into them.

### 3.5 Functional UI, Media Cards & Honest UX
21. **Layer dark card background photography with directional scrims** (`b584955d`):
    - When placing domain photos behind dark cards, set image opacity to `0.55` (`0.75` on hover) behind a directional gradient (`rgba(13,18,28,0.88) 0% -> 0.55 55% -> 0.12 100%`) plus subtle `text-shadow` on titles so artwork shows clearly on the right without hurting text contrast on the left.
22. **Replace overwhelming flat collections with 3-level card drill-downs** (`b584955d`):
    - Group large knowledge/content vaults into `4–5 Domain Cards -> 2–4 Sub-branch Cards -> 3–6 Leaf Cards`, and provide a pre-bundled zero-server HTML entry (`data.js` + relative paths) when offline opening is valued.
23. **Label static simulations honestly** (`cb0669e4`):
    - On static hosts without a backend scanner, mark interactive brand checkers explicitly as `Preview simulation · Sampled prompt set` alongside a real app handoff (`Run live scan in app`)—never fake loading spinners or fabricated live audits.
24. **Build real-world ergonomics into utility tools** (`dead4ed5`, `a1c9d09d`, `9d162d44`, `ae0b1f03`, `391aa3ad`):
    - Countdowns must track wall-clock target timestamps (`Date.now() + remainingMs` + `visibilitychange` sync) so switching browser tabs never freezes or drifts time.
    - Support direct click-to-edit on timer values, pair `Next` with `Prev`, add `Eye`/`EyeOff` visibility toggles for optional video cards, and size primary figures (`tabular-nums`) for **4–6 ft** viewing distance when users' hands are occupied (e.g., holding an instrument).
    - Checklists and drills (`Routine` / `Exercises`) need generous font scale (`text-2xl sm:text-3xl` titles, `text-neutral-300` descriptions) and balanced 2-column grids so dense items stay scannable.

### 3.6 Multi-Brand Reference Replication & Hero Craft (Nuggets 25–40, `design-collections`)
25. **Sample actual UI pixels over video swatch captions:** Short-form design reels often mislabel hex codes or swap color names on intro cards (for example, printing `#E0F354` lime text on an Amber Red `#EE3F24` swatch). Always sample hexes and verify contrast directly from the rendered website frame.
26. **Use multi-lobe silhouette masks and `mix-blend-mode` on studio portraits (`SOMA®`, `MindVision`):** Replace single-ellipse box masks on waist-up portraits (`SOMA®`) with a two-lobe additive `radial-gradient` mask—head (`radial-gradient(ellipse 25% 23% at 45.5% 23.5%, #000 60%, transparent 97%)`) plus shoulders (`radial-gradient(ellipse 48% 35% at 50% 66%, #000 56%, transparent 97%)`)—paired with `transform: rotate(-4deg); transform-origin: center bottom;`, a blurred `.hero-center::before` backlight (`filter: blur(26px)`), and a stitched micro-badge (`.beanie-badge` with `1px dashed` accent border). On pale studio grounds (`MindVision`), pair circular radial masks (`radial-gradient(circle at 50% 48%, #000 46%, transparent 74%)`) with `mix-blend-mode: multiply` so neutral backgrounds vanish without PNG cutouts.
27. **Anchor hero columns to architectural hairlines and scale bottom wordmarks (`SOMA®`):** Inset a `1px solid rgba(255,255,255,0.14)` frame (`inset: 16px 24px 18px`) with asymmetric internal lines (`left: 36.2%`, `top: 42px`, `top: 66.8%`) and `✦` crosshair nodes centered via `transform: translate(-50%, -50%)`, coloring the CTA-corner node in `--accent-loud`. Anchor left/right columns directly above `.grid-hline--mid` (`justify-content: flex-end; padding-bottom: max(254px, 33.8dvh);`), omit vertical lines crossing the portrait shoulder, and widen the `Space Grotesk` `700` bottom wordmark with `transform: translateX(-50%) scaleX(1.12); transform-origin: center bottom;` (resetting `transform: none; position: static;` on mobile).
28. **Wire SVG HUD callout connectors, lobe ticks, and chamfered docks on light pages (`MindVision`):** Place a localized bottom-left dual-hue aurora (`--pink-loud` at `6% 88%` + `--violet` at `38% 92%`) behind white `Outfit 300` display type on light `#ECEEF2` grounds, paired with a bottom-right chamfered dock (`clip-path: polygon(36px 0, 100% 0, 100% 100%, 0 100%, 0 36px)`) and octangular-clipped CTA (`12px` cuts). Overlay a `<svg class="hud-connectors" viewBox="0 0 1440 900" preserveAspectRatio="none">` linking glass widgets (`r="3.5"` anchor dot) via `1px` orthogonal `<polyline>` paths to concentric target reticles (`r="9"` ring + `r="3.5"` dot) on the visor (hidden below `1120px`), add `52%`-wide `1.5px solid var(--ink)` `.lobe-tick` bars inside `.widget-lobes`, keep `.hamburger-btn` visible (`display: inline-flex`) beside `Let's Connect` on desktop, and hide `.corner-hatch` stripes below `960px`.
29. **Combine right-anchored dark portraits, screen-blended motion streaks, and Glacier Blue L-brackets (`Designova`):** Layer a `90deg` obsidian scrim (`0% -> 32% -> 56%`) and `0deg` bottom fade (`0% -> 28%`) over right-positioned portraits (`object-position: 70% 25%`), then overlay `.hero-motion-streaks` on the lower-right jacket (`left: 35%; right: 6%; top: 55%; bottom: 12%`) using warm white and `#F15419` Blaze Orange `linear-gradient` + `repeating-linear-gradient` bands with `filter: blur(4px); mix-blend-mode: screen;` and an elliptical mask. Size `.hero-copy` (`max-width: 680px`, `clamp(2.4rem, 3.7vw, 3.45rem)`) so two-line headlines never orphan prepositions (`in`), color `10×10px` `.corner-mark` L-brackets in `--glacier-blue` (`#77E7FE`), and separate `.strip-col:not(:last-child)` with `1px` borders.
30. **Render vertical fluted glass with dual-lobe runner aura, signal bars, and barcode ticks (`Pelmatech`):** Stack a blurred motion photo (`filter: blur(4px) saturate(1.15); transform: scale(1.04)`), a dual-lobe wash pairing Sunglow Gold (`ellipse 34% 58% at 46% 56%, rgba(237,177,88,0.78)`) with an adjacent deep-indigo silhouette (`ellipse 22% 54% at 60% 48%, rgba(24,8,66,0.72)`), and `repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.01) 4px, rgba(30,10,74,0.16) 14px, rgba(255,255,255,0.07) 22px)` with `backdrop-filter: blur(2px)`. Inside `.session-box`, prefix difficulty tags (`Beginners`, `Advanced`) with a `12×10px` 3-bar SVG signal icon (`fill-opacity="0.4"` on inactive bars), add a `6px` bottom barcode tick strip (`::after` with `repeating-linear-gradient(90deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 4px)`), and align `.pillar.is-active::before` flush (`top: -1px; left: 0; right: 0;`) across vertical pillar dividers.
31. **Set tall `scaleY(1.08)` wordmarks, Acid Lime speed streaks, and pill-embedded thumbs (`Kinetic`):** Set `Kinetic` in `Space Grotesk` `700` (`clamp(4.8rem, 27.5vw, 25.2rem)`, `justify-content: center`, `letter-spacing: -0.045em`, `line-height: 0.78`, `transform: scaleY(1.08); transform-origin: bottom center;`) with a `0.075em × 0.16em` `skewX(-24deg)` acute bar (`top: -0.02em; left: -0.145em`) on `.t-acute::before`. Stack narrow horizontal Acid Lime (`rgba(200,253,3,0.85–0.92)`) elliptical radial gradients (`ellipse 14% 2.6%`, `ellipse 16% 1.6%`) flanking the runner's torso and inside `.detail-card`'s `.card-scrim`, embed a `68×36px` rounded thumbnail inside white pill CTAs (`padding: 6px 24px 6px 6px`), and tuck a `1.5px` outlined under-card (`bottom: -14px; inset-inline: 16px`) beneath floating cards.
32. **Crop exact frame portraits and overscale masked creator strips (`Upfluence`):** Extract exact reference card portraits via `ffmpeg -vf "crop=...,scale=560:-1:flags=lanczos,unsharp=5:5:0.4:5:5:0.0"`. Align the 4-column `.creator-strip` to `align-items: start; gap: 16px;` over a sky-to-cloud vertical gradient (`--lagoon`/`--sky-blue` down to `--cloud`), alternating `.media-card--rect` (`border-radius: 16px; aspect-ratio: 1 / 1.15;`) and `.media-card--circle` (`border-radius: 50%; aspect-ratio: 1 / 1;`). Scale `.media-card--rect img` to `1.04` (`1.07` hover) and `.media-card--circle img` to `1.12` (`1.15` hover) so zero crop-corner background pixels bleed inside the circular or rounded masks, collapsing to `2` columns below `900px`.
33. **Give tilted frosted cards a radial inner glow and N-curve vector doodle (`BASE CLUB`):** Over a `64×64px` hairline grid and 3-line stacked `Archivo Black` display type, float counter-tilted translucent cards (`pearl.eth` at `left: 52%; top: 19%; rotate(7deg)` and `baseclub.eth` at `left: 29.5%; bottom: -10%; rotate(-8deg)`) using `background: radial-gradient(circle at 50% 38%, rgba(255,255,255,0.55), rgba(244,41,2,0.58) 72%)`, `backdrop-filter: blur(12px)`, and subtle dark-red `text-shadow` (`0 1px 8px rgba(130,16,0,0.35)`). Pair with a tall diagonal N-shaped cubic-bezier `.doodle--bot-arrow` (`viewBox="0 0 130 150"`, `stroke-width="10"`), a speech-bubble dual pill logo (`::after` CSS triangle tail), and a `22s` linear-spinning circular `<textPath>` stamp paused under `prefers-reduced-motion: reduce`.
34. **Split bottom hero conversion bars and deepen silhouette contrast (`Transform9+`):** Deepen backlit profile photos into crisp dark silhouettes with `filter: brightness(0.68) contrast(1.45)` on `.caller-bg`, and anchor the hero with a full-width, `215px`-tall `1fr 1fr` bottom bar: a dark frosted left slab (`backdrop-filter: blur(8px)`) holding an inline phone input and `32px` underlined trigger (`Call Alex`), paired with a solid `--accent-loud` right slab holding a bottom-right `32px` underlined `Book a Demo` link and a flush full-height navbar CTA (`height: 100%`).
35. **De-float rotated overlays and scale down monumental wordmarks on mobile (`<= 900px`):** Keep floating overlays and edge-to-edge display text readable at `390×844` without overlap: stack `.hero-stage` vertically (`flex-direction: column`), reset rotated cards to `position: static; transform: rotate(0deg); width: min(260px, 82vw)` (`BASE CLUB`), hide colliding corner hatches/bottom arrows (`MindVision`, `BASE CLUB`), clamp edge-to-edge wordmarks down (`clamp(3rem, 15vw, 4.6rem)`, `Kinetic`), and enforce `min-height: 100dvh; justify-content: space-between` on `.hero-main` (`Transform9+`).
36. **Verify every build with a zero-dependency headless Chrome CDP harness (`verify_and_shoot.mjs`):** Serve each folder over `127.0.0.1` (never `file://`), await `document.fonts.ready` and all image loads, shoot desktop (`1440×900`), full-page, and mobile (`390×844`) views, and assert zero overflow (`scrollWidth <= clientWidth`), single `<h1>`, `<main>` landmark, zero broken images, zero `transition: all`, `@media (prefers-reduced-motion)` coverage, and zero runtime exceptions. Wait `250ms` after `chrome.kill()` before `rmSync` on Windows temp profiles to prevent `EPERM` lock errors.
37. **Partition multi-design visual refinements across disjoint `self` subagents:** When auditing multiple designs in parallel (`invoke_subagent` with `TypeName: "self"`, `Workspace: "inherit"`), assign strictly non-overlapping folders per subagent (`2–3` folders each) to avoid edit conflicts, and require every subagent to inspect its updated `screenshots/hero-desktop.png` against the reference frame and pass `verify_and_shoot.mjs` before reporting back.
38. **Protect thin SVG HUD overlays with non-scaling strokes and white halos on light grounds:** Set `vector-effect: non-scaling-stroke` on responsive `<svg preserveAspectRatio="none">` overlays so `1px` callout lines never thicken unevenly across aspect ratios, and apply `filter: drop-shadow(0 0 1px rgba(255,255,255,0.95))` so translucent accent lines stay crisp over both cloudy backgrounds and dark foreground edges.
39. **Rotate border dividers from vertical to horizontal at stacked mobile breakpoints:** When a horizontal multi-column hero strip (`.hero-strip`, `.hero-pillars`) uses `border-right: 1px solid` on `:not(:last-child)` and collapses to `grid-template-columns: 1fr` below `960px`, explicitly clear `border-right: none` and switch `:not(:last-child)` to `border-bottom: 1px solid ...; padding-bottom: 16px–20px;` so seams rotate cleanly.
40. **Center hero headlines optically between fixed headers and bottom docks/slabs:** In `100dvh` flex-column heroes bounded by a fixed navbar (`48px–76px`) and a bottom conversion slab (`215px`), apply `padding-top: <header-height>` on the flex container and `margin-top: auto; margin-bottom: auto;` (removing asymmetric top padding from the headline wrapper) so the display title sits at the true vertical midpoint of the open canvas.
