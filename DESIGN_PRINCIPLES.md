# Universal Design Principles

This document is a portable design operating system for AI agents and engineers. It combines the craft rules from Spiral Lab, the Unslop redline methodology, and the **Two Quiet + One Loud** color system. Every rule is brand-agnostic: derive a fresh palette and direction for each new product while enforcing the exact structural, typographic, spatial, motion, and verification standards below.

### Agent Operating Rules

1. **Derive, never clone.** Never copy a reference project's domain copy or default green palette onto an unrelated product. Derive the **Five-Line Direction** and **Two Quiet + One Loud** palette from the product in front of you.
2. **Write direction before code.** Lock the five-line direction and color triad before creating components or stylesheets.
3. **Execute in pass order.** Apply the nine passes sequentially across the whole screen rather than tweaking random components in isolation.
4. **Verify programmatically.** Treat contrast ratios, `4px` spacing, `tabular-nums`, `:focus-visible`, `prefers-reduced-motion`, and anti-slop bans as hard pass/fail checks.

---

## 1. Direction-First Workflow and the Nine-Pass Order

Design fails when code starts before intent. Establish a five-line direction derived from what the product actually does—never from generic visual trends—and apply changes in nine strict passes across the entire screen.

### The Five-Line Direction

Write these five lines before editing a single component:

1. **Product:** What it does and for whom, in one plain sentence.
2. **Character:** Two or three concrete words (`calm, exact, a little warm` or `architectural, direct, technical`). Ban template adjectives that describe anything: *clean, modern, sleek, minimal, premium*.
3. **World:** The physical environment or material the product belongs to (paper and ink, night-shift instruments, deep forest and obsidian). This world dictates the neutral tint, accent hue, and lighting.
4. **Moments:** One or two specific places where rich color, physical 3D material, or dense data lives.
5. **Signature:** One small, product-specific detail used consistently—and only one.

### The Strict Nine-Pass Order

Complete each pass across the full screen before starting the next:

`1. Spacing` → `2. Color` → `3. Icons` → `4. Copy` → `5. Type` → `6. Layout` → `7. Details` → `8. Visuals` → `9. Motion`

- **Spacing first:** Rhythm and alignment change how every element on the page reads.
- **Copy before Type and Layout:** Headline word count and label length dictate font scale, line breaks, and column proportions.
- **Visuals and Motion last:** Both must enrich a screen whose hierarchy and layout already work as a static frame.

> *Credit: The five-line direction and nine-pass redline sequence adapt the [Unslop](https://heydamir.design/unslop) methodology by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), licensed under CC BY 4.0.*

---

## 2. Two Quiet Colors + One Loud Color

Two harmonious colors make a website look clean and finished, yet forgettable. Adding **one high-tension loud color** makes the entire design feel intentional, stops the scroll, and dictates where the eye lands first. Let the two quiet colors carry `90%` of the layout, and let the single loud color do the heavy lifting.

### Building the Triad

- **Choose Two Quiet Colors (`Quiet 1` + `Quiet 2`) for structure and calm.** "Quiet" means low chromatic conflict, not lifeless grey. Build the quiet pair from one of three proven structures:
  1. **Tinted Dark + Warm Off-White:** Deep forest-obsidian (`#050B09`) paired with warm paper (`#FDFDF8`), avoiding synthetic `#000000` and `#FFFFFF`.
  2. **Two Steps of One Tonal Family:** Deep sapphire (`#00226C`) paired with ocean blue (`#0DA2F6`) for atmospheric depth without hue clash.
  3. **Bold Structural Field + Crisp Off-White:** Royal purple (`#723CD8`), tangerine (`#EF5001`), red-orange (`#FA3802`), or sky blue (`#2293FF`) paired with clean white (`#FCFEFF` / `#FDFDFF`).
- **Choose One Loud Color (`--accent-loud`) for chromatic and luminance tension.** Pick a third hue that snaps sharply against both quiet colors—an electric complement, acid highlight, or solar pop (`#60FD60` Neon Jade, `#CEF302` Yellow Punk, `#ECB159` Sunglow Gold, `#CBFB02` Acid Lime, `#EE3F24` Amber Red, `#F398D4` Bubblegum Pink).
- **Pass the "Imagine It Without It" litmus test.** Mute `--accent-loud` temporarily: the two quiet colors alone must already look balanced, finished, and readable. Turn `--accent-loud` back on: your eye must lock onto the focal target within `100ms`, and turning it off again should make the screen feel noticeably flat.

### Four Permitted Jobs for the Loud Color

Assign `--accent-loud` to one or two deliberate focal jobs per viewport—never scatter it across random borders, icons, or body text:

1. **Primary Conversion Magnet:** Color only the primary CTA pill (and matching top-right nav CTA) over a two-quiet-color hero so the eye path jumps straight to the action.
2. **Climactic Word + Color-Blocked Slab:** Set the single payoff word of a headline in `--accent-loud` (*"Skip the Hold Music. **Forever.**"*) paired with a solid `--accent-loud` conversion slab set in `--ink`—or invert the ratio on chapter-break heroes where `--accent-loud` becomes the full-bleed canvas and `--ink` becomes the high-contrast anchor.
3. **Graphic Stamps and Hand-Drawn Marks:** Paint sparse editorial doodles—a `#` hash mark, tapered underline swoosh, or circular stamp badge—in the loud color over oversized stacked display typography.
4. **Localized Subject Backlight or Motion Streak:** Place a tight rim aura or directional light trail directly behind the hero's focal subject—strictly bounded to the subject, never washed across UI cards or chrome.

### Proven `2 Quiet + 1 Loud` Reference Triads

Use these field-tested triads as structural examples when deriving a new palette from a product's `World`:

| World / Mood | Quiet 1 (Canvas / Field) | Quiet 2 (Contrast / Tone) | Loud (`--accent-loud`) | Focal Deployment |
| :--- | :--- | :--- | :--- | :--- |
| **Technical Studio (Spiral Lab)** | Forest Void `#050B09` | Warm Paper `#FDFDF8` | Neon Jade `#60FD60` | Full-bleed hero slab, hover fills, payoff figures |
| **Creative Studio / Streetwear (`SOMA®`)** | Deep Plum `#221331` (`#150A20`) | Electric Violet `#7540F5` / Paper `#F5F4F8` | Acid Lime `#D6FA4A` | Portrait rim glow, `32+` stat, `BOOK A CALL` slab |
| **Neurotech / Telemetry (`MindVision`)** | Cloudy White `#F0F0F4` | Galactic Violet `#5B46FF` | Bubblegum Pink `#F75CC0` | Dual-hue aurora under light display type + chamfered CTA |
| **Dark Editorial Agency (`Designova`)** | Obsidian Black `#0C0C0A` (`#141311`) | Blaze Orange `#F15419` | Glacier Blue `#77E7FE` | Active nav pill, hero CTAs, cyan glasses, L-brackets |
| **Deep Systems / Voice AI (`Transform9+`)** | Sapphire Blue `#0042AC` | Ocean Blue `#00D3FB` | Neon Jade `#83FD80` | Climactic headline word + color-blocked CTA slab |
| **Editorial / Social Club (`BASE CLUB`)** | Red Orange `#F42902` | Snowy White `#FDFDFF` | Yellow Punk `#CEF302` | `#` doodle, loop arrows, rotating circular stamp |
| **Kinetic / Performance (`Kinetic`)** | Tangerine `#EE5001` | Crisp White `#FCFFFF` | Acid Lime `#C8FD03` | Horizontal speed streaks + embedded pill thumbnail |
| **Calm Health / Consumer (`Pelmatech`)** | Royal Purple `#723CD6` | Crisp White `#FCFFFF` | Sunglow Gold `#EDB158` | Panning runner trail behind fluted glass + active session ring |
| **Creator / Growth SaaS — Urgent (`Upfluence`)** | Sky Blue `#0099FF` | Cloudy White `#FDFDFE` | Amber Red `#EE3F24` | Centered hero CTA magnet over 4-frame portrait strip |
| **Creator / Growth SaaS — Playful (`Upfluence`)** | Lagoon Blue `#7BDFF2` | Cloud White `#F7F7F0` | Bubblegum Pink `#F2B5D4` | Single centered hero CTA pill over alternating rect/circle strip |
| **High-Altitude Ski Resort (`ALTAVAL`)** | Baby Blue `#4DBEFF` | Indigo Navy `#001F59` / Snow `#FFFFFF` | Bumblebee Yellow `#FFF800` | Split `POW`/`DER` headline across terrain curve, suspended gondolas, `SKI PASSES` orb |
| **AI Video Editor (`FluxEdit`)** | Midnight Black `#02070A` | Electric Blue `#0297DE` | Cantaloupe Orange `#FC734D` | Rising horizon bloom, concentric `Try Now` orb CTA, warm glass rims on 3-card UI deck |
| **Architectural Studio (`FORME`)** | Persian Blue `#16284C` | Warm Cream `#EFE8DA` | Amber Glow `#FFB92E` | `Step inside.` serif payoff with SVG swash & `✦` star, interior window glow, `Create` button |
| **Fashion Editorial (`VOGUE`)** | Skeleton Cream `#FDFDFD` | Deep Black `#060606` | Pine Green `#016030` | `Bodoni Moda` `scaleX(0.94) scaleY(1.44)` masthead, `3×4` `4px` portrait grid + barcode cutout |
| **AI Consulting (`Visionary Intelligence`)** | Seal Blue `#DBF2FC` | Navy Blue `#072D59` | Crimson Pink `#FD6E88` | `240px` `5`-rib bottom-masked fluted glass strip refracting 3D sphere + crimson ribbon CTA |
| **Graphic Assets (`Rawables.`)** | Onyx Black `#01010D` | Electric Indigo `#6331FB` | Tropical Mint `#88F9C0` | Center backlit bust, flanking split `Anton`+italic `Instrument Serif` headline, 4-row hairline specs |
| **Kinetic Motion — Vermin (`Kinetic` B, `similar-designs`)** | Vermin Red `#7E100D` | Snowy White `#FEFEFE` | Citrus Yellow `#FEF650` | `hue-rotate(-20deg) saturate(1.25) contrast(1.08)` grading + citrus speed streaks |
| **Sparkling Beverage (`YUZU`, `similar-designs`)** | Mandarin Orange `#FD550A` / Cream `#EDE8D8` | Forest Green `#015D47` | Crest Yellow `#E0F354` | `objectBoundingBox` `clipPath` wave headline split, keyed portrait, `16px 16px` checkerboard awning |
| **Dance House (`Fold`)** | Deep Teal `#001B1E` (`#05282C` slab) | Ice White `#F6FBFE` | Magenta Pink `#FF60B5` | Silk-veil radial/edge-vignetted dancer frame, italic Playfair `Soft Current` headline, Magenta booking trigger |
| **Performance Marketing (`Flowform`)** | Linen Cream `#FBF1E7` | Deep Black `#040203` | Psychedelic Blue `#002CFE` | SVG `<filter id="speed-blur">` directional motion-blur `Marketing` wordmark + `#002CFE` audit pill CTA |
| **Climbing Rope (`CRUX`)** | Midnight Blue `#040915` (`#0A1326` slab) | Moonlight White `#EEF0EB` | Leafy Lemon `#BBF600` | Corner-bracketed HUD nav, split-italic `PITCH NINE.` lockup, `Ø 9.0 MM` leader callout |
| **Web3 Validator Security (`Recognito.`)** | Obsidian Black `#050404` | Crisp White `#F8F8F8` | Flame Orange `#FF5400` (`#FF8C32` glow) | 12-rib `backdrop-filter` fluted fire-glass curtain + elevated obsidian eclipse medal + SVG circuit chips |
| **Electronic Music Label (`Enormous Tunes / Nora En Pure`)** | Cobalt Blue `#2E61B4` | Snow White `#F2F4F7` (`#F5F2EC` card) | Signal Red `#E1252C` | Monumental lowercase `nora en / pure` over alpine slope + Signal Red Swiss tour card |
| **Streetwear Capsule (`Yankee`)** | Warm Paper `#F1ECE5` | Cobalt Blue `#19346B` | Hot Pink `#FF4FA3` | Four-plane `z-index` poster stacking Cobalt display wall, keyed walker cutout, and Hot Pink `Yankee` script |
| **Tactile Health Companion (`Pelmatech Tactile`)** | Pearl White `#EFEAEF` | Deep Plum `#2E071F` (`#441130` nested) | Berry Pink `#E93E8A` | Tactile blurred runner wash + Deep Plum session cards with `6px` bottom barcode strips |
| **Collective & Strategy Firm (`Ventura`)** | Void Black `#050506` (`#0E0E11` slab) | Crisp White `#F7F7F7` | Chromatic Spectrum `#FF1A00`–`#0037FF` | 14-plane stepped CRT extrusion sculpture (`our / experience`) + per-span colored headline phrases |
| **Architectural Eyewear (`SILENT POWER`)** | Egyptian Blue `#03203D` | Stone Blue `#639CC5` | Scarlet Red `#EB2F33` | `56fr / 44fr` vertical split pairing airbrushed spray + scarlet splatter dots with brushstroke portrait marks |
| **Atelier Tailoring Lookbook (`Yankees`)** | Soft Sand `#F0E5DB` | Mocha Green `#474329` | Watermelon Pink `#FC75B4` | Mocha Green `EVERYBODY KNOWS ME & YOU` display wall layered behind keyed model and diagonal Watermelon Pink script |
| **Corporate Treasury (`ARC`)** | Flamingo Pink `#FAC7E1` | Plum Pink `#A5467C` (`#240B1B` ink) | Electric Blue `#004AFD` | Brushed rose-titanium 3D card framed in dark stone with Electric Blue edge rim and pill CTA |
| **Monthly Vinyl Club (`SIDE A SOCIETY`)** | Dusty Purple `#6B5B7B` | Charcoal `#2B2B2E` | Gold `#F2C14E` | Split `DROP / THE / NEEDLE` display type, gloss vinyl LP with Gold center label, and tilted `JOIN CLUB` circle badge |
| **Statement Plant Shop (`Big Leaf Energy`)** | Warm Cream `#F3EBDD` | Forest `#2F4A3A` | Coral `#FF7F5A` | Two-tone `Shrikhand` `Go / big` lockup, Coral sun circle framing layered Monstera leaves and terracotta pot, and `XL SIZES` badge |
| **Bali Surf Sandals (`BAREFOOT`)** | Deep Navy `#1B2A4A` | Warm Sand `#E8D8B9` | Tangerine `#FF8C2B` | High-contrast `KICK / BACK` `Anton` stack, angled natural-rubber sandal pair with Tangerine Y-straps, and `NEW COLOUR` badge |
| **Jazz Cellar (`BASEMENT SEVEN`)** | Cream Paper `#F8DBC1` | Riso Teal `#1D646C` | Fluorescent Pink `#EA4F88` | Risograph-grained `Late Sets` display, bottom-left set-times teal slab, pink saxophone overprint, and flush `Get tickets` tab |
| **Ceramics Studio (`ATELIER RUO`)** | Raw Clay `#D0BCAC` | Iron Brown `#461C0C` | Turquoise `#269991` | Editorial `Fired / twice` serif stack, outline `Book a class` pill, and close-up stoneware vessel dripping with turquoise copper glaze |
| **Rhythmic Gymnastics (`RITMO LISBOA`)** | Petrol Blue `#002D37` | Ivory `#FEF0DD` | Saffron Gold `#F7A724` | Split diagonal italic `RIBBON` / roman `FINALS` display framing a leaping gymnast and sweeping Saffron Gold satin ribbon |

### System Token Architecture & Exceptions

- **Build dark depth from surface steps and hairlines.** Separate dark layers with stepped background values (`--bg-void`, `--bg-slab`, `--bg-tone`) and `1px` borders at `8%–14%` foreground opacity (`rgba(253, 253, 248, 0.12)`). Reserve drop shadows for floating chrome such as sticky headers and dropdown panels.
- **Support live multi-preset accents.** Bind `--accent-loud` to `[data-accent="jade" | "punk" | "gold"]` on `document.documentElement` and persist user choice in `localStorage`. Pre-verify every preset (`#60FD60`, `#CEF302`, `#ECB159`) against `--ink` (`#050B09`) for WCAG AA contrast (`>= 4.5:1` normal text, `>= 3:1` large display) so switching accents at runtime never breaks legibility.
- **Curate flat discipline plates (`CARD_STYLES`).** When a multi-item catalog needs distinct visual plates, draw flat fills exclusively from the existing palette family (loud accent, forest, gold, paper, dark slab, punk, soft mint). Assign each plate an explicit foreground `ink` token, an optional `hairline` border flag for dark-on-dark cards, and a scoped `--card-bg` CSS custom property so negative-space SVG strokes (such as cutout checkmarks) match their host plate automatically.
- **Gate external brand hues behind interaction.** In partner or technology grids (`BuiltWithSection`), render tiles neutral and quiet at rest (`--bg-slab` with an `8%` hairline). Reveal per-logo brand border colors and drop-shadow glows only on hover or explicit toggle—optionally paired with a user-controlled `Illuminate All / Reset` switch—so external brand colors never pollute default chrome.
- **Ban decorative color soup.** Never use gradient-clipped text, multi-hue surface washes, saturated box-shadows on static chrome, or blurry radial color blobs behind content.

```css
:root {
  /* Loud color: carries focal tension and primary interaction */
  --accent-loud: #60FD60;

  /* Quiet 1: deep tinted canvas + surface steps */
  --bg-void: #050B09;
  --bg-slab: #091612;
  --bg-tone: #0D3B2E;
  --hairline: rgba(253, 253, 248, 0.12);

  /* Quiet 2: warm off-white contrast surface */
  --paper: #FDFDF8;
  --text-secondary: #94A39C;
  --ink: #050B09;
}

[data-accent="jade"] { --accent-loud: #60FD60; }
[data-accent="punk"] { --accent-loud: #CEF302; }
[data-accent="gold"] { --accent-loud: #ECB159; }
```

---

## 3. Full-Bleed Section Cadence, Atmospheric Grids, and Edge Masking

Long pages flatten out when every section renders as dark cards on the same dark background. Treat sections as distinct architectural chapters with controlled surface textures and masked edges.

- **Alternate full-bleed surface registers.** Sequence high-energy and quiet chapters deliberately: **Loud Hero** (`--accent-loud`), **Deep Void** (`--bg-void`), **Warm Paper** (`--paper`), **Mid-Tone Slab** (`--bg-tone`), **Loud Call-to-Action**, and **Deep Void Footer** anchored by an edge-to-edge display wordmark in `--accent-loud`.
- **Overlap major surface transitions.** Pull dark content sheets slightly over bright heroes (`-mt-10` with `32px–40px` top radii) to establish physical depth and invite scrolling.
- **Texture solid fields subtly (`.grid-lines` or pinstripes).** Flat saturated or dark fields look plastic without micro-structure. Overlay hero fields with a `48x48px` grid of `1px` ink lines—or subtle `1px` vertical pinstripes—at `6%–8%` opacity (`rgba(5, 11, 9, 0.08)`), dissolve vertically with `mask-image: linear-gradient(to bottom, #000 40%, transparent 100%)`, and optionally drift background position over a slow `16s` linear cycle.
- **Dissolve marquee edges with alpha masks (`.marquee-mask`).** Soften horizontal ticker boundaries with `mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)` rather than hard box edges, and pause `.marquee-track` on `:hover`.

---

## 4. Poster Heroes, Subpage Architecture, and Visual Jump-Indices

Every route should open with a composed `100dvh` poster viewport that orients the reader, proves capability with hard numbers, and provides immediate navigation into the page.

- **Pick one deliberate `100dvh` poster archetype—never default to a generic stacked column:**
  1. **Asymmetric Split + Crafted Artifact:** Left-aligned display headline, dual CTAs, and bottom metrics bar balanced against a right-side 3D or product centerpiece (`Spiral Lab`).
  2. **Monumental Bottom Wordmark:** Mid-frame split copy and focal visual anchored along the bottom viewport edge by an oversized, edge-to-edge display wordmark (`Kinetic`, `SOMA®`, or the `Spiral Lab` footer).
  3. **Centered Headline + Bottom-Rising Media Strip:** Short two-line centered headline over a single loud CTA pill at optical center, with alternating rectangular and circular portrait frames rising from the bottom edge (`Upfluence`).
  4. **Atmospheric Dark Split + Color-Blocked Action Slab:** Tonal dark hero with a single `--accent-loud` payoff word in the headline and a solid `--accent-loud` conversion slab anchored to the bottom-right corner (`Transform9+`).
  5. **Symmetrical Bust + Orbital Frosted HUD Widgets:** Centered hardware or visor portrait linked by non-scaling SVG callout reticles to 5–6 `backdrop-filter: blur(14px)` telemetry widgets, a localized bottom-left aurora under light display type, and a chamfered bottom-right conversion dock (`MindVision`).
  6. **Stacked Display Wall + Tilted Glass Cards & Stamp Counterpoint:** Full-bleed `64×64px` grid canvas with 3-line stacked `Archivo Black` display type, counter-tilted frosted glass PFP cards (`rotate(7deg)` / `rotate(-8deg)`), hand-drawn loud-accent vector doodles, and a slow-spinning `22s` circular `<textPath>` stamp (`BASE CLUB`).
  7. **Diagonal Terrain Split + Color-Split Display Type & Suspended Depth Pair:** Sweeping SVG terrain curve dividing `#4DBEFF` sky from `#FFFFFF` snow slope, condensed `Anton` `<h1>` splitting color across the boundary (`POW` `#FFF800` / `DER` `#001F59`), and foreground/distant cutout objects suspended along a diagonal SVG cable across `z-index` depth layers (`ALTAVAL`).
  8. **Centered Editorial Serif + Concentric Orb CTA & Fanned 3-Card UI Deck:** Masked vertical fluted light curtain over a bottom horizon bloom, centered `Instrument Serif` headline flanked by glass carousel arrows and metric pairs on a `1fr auto 1fr` band, concentric glowing `Try Now` orb CTA, and 3 bottom-clipped product UI preview cards fanned at `-2.5deg`, `0deg`, and `+2.5deg` (`FluxEdit`).
  9. **Editorial Masthead + `3×4` Windowpane Portrait & Barcode Cutout:** Monumental high-contrast `Bodoni Moda` masthead paired with flex-grow `1px` header rules, a right-column monochrome portrait overlaid with a `3×4` `4px solid var(--bg)` internal border grid, and an opaque `#FDFDFD` bottom-right cell `(3, 4)` barcode cutout (`VOGUE`).
  10. **Left Mixed-Weight Editorial Stack + Right Sphere Under Localized Fluted Strip:** Asymmetric split pairing left-aligned mixed-weight editorial copy and dark pill CTA against a right-anchored 3D sphere whose left hemisphere sits behind a `240px` `5`-rib bottom-masked frosted `.fluted-curtain` (`Visionary Intelligence`).
  11. **Center Backlit Silhouette + Flanking Mixed-Font Split Headline & Spec Stack:** Centered backlit bust silhouette over `#6331FB -> #01010D` vignette flanked by uppercase `Anton` stacked above italic `Instrument Serif` display lines, balanced below by a loud mint pill CTA on the left and a 4-row `1px` hairline spec list on the right (`Rawables.`).
  12. **Silk-Veil Stage Portrait + Editorial Serif Split:** Edge-vignetted dancer photography framed in Deep Teal (`#001B1E`), italic `Playfair Display` hero title (`Soft Current`), and a single Magenta Pink (`#FF60B5`) booking action (`Fold`).
  13. **Directional Motion-Blur Wordmark + Visor Asymmetric Split:** Linen Cream (`#FBF1E7`) split layout pairing an SVG `<filter id="speed-blur">` `Marketing` display mark, monochrome partner strip, and `<dl>` customer metric cards against a masked visor portrait (`Flowform`).
  14. **Corner-Bracketed HUD Nav + Split-Italic Knot Hero:** Full-viewport Midnight Blue (`#040915`) slate holding masked cord photography, monospace `[MENU]` corner brackets, split-italic `Archivo` `PITCH NINE.` lockup, and Leafy Lemon (`#BBF600`) `Ø 9.0 MM` leader callout (`CRUX`).
  15. **Full-Bleed 12-Rib Fluted Fire-Glass Curtain + Eclipse Medal:** Pure-CSS `backdrop-filter` vertical ribs refracting Flame Orange (`#FF5400`) U-shaped light columns behind an elevated Obsidian Black eclipse medal and orthogonal SVG circuit node chips (`Recognito.`).
  16. **Swiss Alpine Lowercase Poster + Floating Label Card:** Full-bleed sky-to-slope photograph overlaid with giant lowercase `nora en / pure` `Inter` display type and a Signal Red (`#E1252C`) Swiss tour specification card (`Enormous Tunes / Nora En Pure`).
  17. **Four-Plane Keyed Cutout Poster + Angled Script Overlay:** Stacked Cobalt Blue (`#19346B`) display wall (`z-index: 1`), `///` manifesto and `EST. 2022` corner stamps (`z-index: 2`), perimeter-keyed street portrait (`z-index: 3`), and tilted Hot Pink (`#FF4FA3`) `Great Vibes` signature (`z-index: 4`) (`Yankee`).
  18. **Pearl-to-Plum Tactile Motion Split + Barcode Schedule Cards:** Pearl White (`#EFEAEF`) hero over Berry Pink (`#E93E8A`) blurred runner trails anchored by Deep Plum (`#2E071F`) day-session cards featuring 3-bar signal icons and `6px` bottom barcode strips (`Pelmatech Tactile`).
  19. **14-Plane Stepped CRT Extrusion Sculpture + Multi-Span Phrases:** Void Black (`#050506`) canvas layering 14 offset chromatic display planes (`our / experience`) with clamped pointer parallax alongside per-span spectrum-colored headline phrases (`Ventura`).
  20. **56/44 Split + Airbrush Spray & Splatter Overlays:** Asymmetric Egyptian Blue (`#03203D`) manifesto and vertical `SILENT POWER` stack paired with an airbrushed Stone Blue (`#639CC5`) vector sweep, Scarlet Red (`#EB2F33`) splatter drops, and annotated model frame (`SILENT POWER`).
  21. **Mocha Tailoring Display Wall + Diagonal Watermelon Script:** Soft Sand (`#F0E5DB`) poster layering Mocha Green (`#474329`) `Anton` typography beneath a keyed full-length portrait and sweeping Watermelon Pink (`#FC75B4`) `Yankees` calligraphy (`Yankees`).
  22. **Rose-Titanium Studio Card + Locale-Pill Hero:** Flamingo Pink (`#FAC7E1`) studio canvas pairing a geometric `ARC` wordmark, live locale dropdown, and Electric Blue (`#004AFD`) pill CTA against an edge-lit metallic card asset feathered on mobile (`ARC`).
  23. **Complementary-Wheel Graphic Poster + Bespoke Vector Product Centerpiece:** Opposite-hue color-wheel triads (`Dusty Purple + Gold`, `Forest + Coral`, `Navy + Tangerine`) pairing a two-tone left display lockup and monospace metadata footer with a pure-SVG/CSS hero object (`vinyl LP + tonearm`, `potted Monstera over Coral circle`, `angled rubber sandals`) and a `-10deg` tilted circular loud-accent stamp badge (`SIDE A SOCIETY`, `Big Leaf Energy`, `BAREFOOT`).
  24. **60-30-10 Tactile Poster & Editorial Frame Hero:** Strict `60%` primary quiet ground, `30%` structural contrast ink/slab, and `10%` loud focal subject detail or conversion tab—blending risograph overprints (`mix-blend-mode: multiply`), scrimmed studio ceramic glaze, or diagonal italic/roman typography framing a stage silhouette (`BASEMENT SEVEN`, `ATELIER RUO`, `RITMO LISBOA`), capped with `height: clamp(680px, 100dvh, 960px)` so full-page captures preserve single-screen fold proportions.
- **Condense persistent chrome on scroll.** Narrow fixed header height (`68px` to `58px`), max-width, and padding past `28px` scroll while deepening backdrop opacity so content owns the viewport.
- **Standardize subpage poster heroes.** Across secondary routes (`/services`, `/work`, `/about`, `/blog`, `/faq`, `/join`), share one coherent hero grammar:
  1. Full-bleed `100dvh` `--accent-loud` canvas overlaid with `.grid-lines`.
  2. Top-right monochrome stroke-drawn `LoopArrowTop` (`draw-path`).
  3. Two-line `.reveal-lines > .brk` display `<h1>`.
  4. Split row pairing a concise lead statement (`max-w-[28ch–34ch]`) with one solid primary CTA and one outlined secondary CTA.
  5. Bottom-anchored 3-column `<dl>` proof bar separated by `1px` vertical ink dividers (`border-[#050B09]/20` to `/25`).
- **Turn dense hero visuals into interactive jump-indices.** On catalog pages (`/services`), place a staggered `4x2` grid of `aspect-square` miniature diagram plates in the hero's upper-right quadrant. Clicking a plate resets active category filters to `"All"` and smooth-scrolls directly to its ledger row (`#cap-01`–`#cap-08`), using `scroll-margin-top: 112px` so the target clears the sticky header.

---

## 5. Three-Role Typography and Tabular Figures

Hierarchy comes from scale, proportion, and tonal contrast—not from proliferating font sizes or heavy weights on body text.

- **Assign at most three typefaces to strict jobs:**
  1. **Display (`--font-head`):** Headlines, callouts, and key figures. Scale fluidly via `clamp()`, tighten line-height (`0.88–1.05`), and apply negative tracking (`-0.03em` to `-0.055em`) exclusively at large display sizes.
  2. **Interface Sans (`--font-sans`):** Body prose, buttons, and navigation in weights `400`, `500`, and `600`. Maintain `1.5–1.65` body line-height and cap measure between `28ch` and `56ch`.
  3. **Monospace (`--font-mono`):** Row indices (`01`–`08`), technical stacks, SLAs, timestamps, and phone numbers.
- **Guard small-text legibility.** Never apply negative letter-spacing below `16px`, never drop font size below `11px`, and avoid italic emphasis.
- **Default to sentence case.** Set headings, buttons, tabs, and navigation items in sentence case (`Selected work`, `See capabilities`). Never pair uppercase prose labels with wide tracking (`>= 0.06em`).
- **Enforce `tabular-nums` on every standalone figure.** Apply `font-variant-numeric: tabular-nums` to all metrics, percentages, latencies, counts, and prices so vertical columns align to the pixel.

---

## 6. Spatial Grid, Hairline Matrices, `<dl>` Ledgers, and State Completeness

Strict geometric alignment builds engineering credibility; varied structural cadence prevents template fatigue.

- **Align spacing to a `4px` grid.** Use multiples of `4px` for padding, gaps, margins, and control heights (`2px` nudges permitted only inside compact controls), bounded within `1240px` and `1440px` max-width rails.
- **Nest radii proportionally.** Scale border radius with element size (`inner radius = outer radius - padding`, minimum `4px`): `6px–12px` for badges and inputs, `16px–24px` for cards, `28px–40px` for large sheets, and full pills reserved for primary CTAs and toggles.
- **Prevent `2px` seams in hairline matrix grids.** When building bordered multi-column cell matrices (`/about` principles, `/join` disciplines, `/services` engagements), put `border-t border-l` on the parent grid container and `border-r border-b` on each cell so `1px` hairlines never double up across breakpoints.
- **Prefer `12-column` ledger rows and staggered card cadences.** Present case studies and capability specs as full-width hairline rows on a `12-column` grid. When using multi-card rows, stagger alternating columns vertically (`mt-6` or `xl:mt-8`) while keeping internal padding and baselines identical.
- **Markup metrics with semantic `<dl>` blocks.** Use `<dl>`, `<dt>`, and `<dd>` for every stat bar and spec table. Highlight at most one primary metric per group in `--accent-loud` (`sp.highlight`), keeping companion figures in `--paper` so the eye knows where to land first.
- **Design every interactive state.** Wire filter bars with `role="tablist"` and `role="tab"` (`aria-selected`). Build intentional zero-result empty states (such as a monospaced `00` badge, plain explanation, and direct CTA on `/join`) and in-place form confirmation states with a reset trigger (`/contact`).

---

## 7. Hand-Drawn Counterpoint and Procedural 3D Craft

Pair hard architectural grids with sparse human ink marks and physically grounded procedural 3D—never stock clip-art or generic AI renders.

### Monochrome Vector Counterpoint

- **Limit ink annotations to one focal beat per section.** Accents such as a chunky `#` mark (`HashDoodle`), three burst rays (`BurstRays`), a tapered underline (`TitleSwoosh`), or a looping arrow (`CurlyDoodleArrow`, `LoopArrowTop`) inject human warmth next to tight geometric display type.
- **Keep marks flat and accessible-safe.** Draw in solid `currentColor` or `--ink` with `stroke-linecap: round`, set `aria-hidden="true"`, and never add gradients or drop shadows to doodles.

### Procedural WebGL Discipline (`ThreeHeroCanvas`)

- **Use a narrow `36°` studio FOV.** Set `PerspectiveCamera` FOV around `36°` to eliminate wide-angle fisheye distortion, paired with `ACESFilmicToneMapping` (`exposure: 1.1`) and device pixel ratio capped at `2`.
- **Light with a 3-point studio rig and procedural reflections.** Combine a warm key light, mint accent rim light, and cool fill light with beveled `MeshPhysicalMaterial` clearcoat surfaces and procedural `envMap` reflections so dark geometry reads with crisp specular edges.
- **Engineer true 3D depth occlusion without mesh clipping.** Route orbital curves (`OrbitalEllipseCurve`) across both positive (`z > 0`, passing in front of the central tile) and negative (`z < 0`, passing behind it) space. Isolate background ambient spheres on `renderOrder = -2` with `depthWrite: false` so foreground geometry never intersects them.
- **Dampen pointer tracking and pace ambient pulses.** Clamp normalized pointer tilt within `±10°` and interpolate smoothly per frame (`0.06` damped lerp factor). Keep sparkle stars calm for ~`75%` of their cycle before a brief sinusoidal peak.
- **Dispose GPU resources on unmount.** Explicitly call `.dispose()` on every geometry, material, texture, and `WebGLRenderer` instance during cleanup to prevent WebGL context leaks across client-side route transitions.

---

## 8. Decisive Surface Inversion on Interaction

Timid hover effects—slight opacity changes, blurry glows, or `scale(1.05)` card zooms—feel hesitant. Interactive surfaces should commit to crisp state inversions.

- **Flood interactive rows and cells with `--accent-loud` (`.fill-hover`).** On `:hover`, `:focus-within`, and `:active`, flip background to `--accent-loud` and foreground text to `--ink`, simultaneously overriding `.muted` (`rgba(5, 11, 9, 0.72)`) and `.pop` (`var(--ink)`) child tokens so contrast holds.
- **Pair inversion with `4px` directional shifts.** Nudge headings `translateX(4px)` inside hovered cards, expand horizontal padding on hovered `.work-row` items, and slide trailing `.work-arrow` icons from `translateX(-10px)` (`opacity: 0`) to `0` (`opacity: 1`).
- **Give buttons crisp press physics (`.btn-interactive`).** Lift `-2px` on hover, compress to `scale(0.98)` on `:active`, and glide internal SVG arrows `+4px` along the x-axis. Never scale full cards up on hover.

---

## 9. Scroll-Reveal Choreography, Specular Sweeps, and Two-Tier SVG Motion

Choreograph motion on two shared curves so the page feels responsive on load and scroll while staying completely calm at rest.

- **Lock to two easing curves and explicit properties.** Use `--ease: cubic-bezier(0.22, 1, 0.36, 1)` (`150ms–320ms`) for interactive transitions and `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` (`420ms–480ms`) for entrances. Name transitioned properties explicitly; ban `transition: all`, bouncy overshoots, and layout-thrashing width/height/top/left animations.
- **Reveal above-the-fold immediately and observe dynamic DOM (`ScrollAnimations`).** Elements already inside `window.innerHeight * 0.92` on mount receive `.is-visible` on the next `requestAnimationFrame` without waiting for scroll. Below-the-fold elements trigger once via `IntersectionObserver` (`threshold: 0.08`, `rootMargin: "0px 0px -36px 0px"`) and `unobserve` immediately. A `MutationObserver` watches `document.body` so cards mounted after client-side category filtering (`/services`, `/blog`, `/faq`, `/join`) bind and reveal automatically.
- **Use a structured reveal vocabulary with `45ms` staggers:**
  - `.reveal--up`: `translate3d(0, 34px, 0)` standard vertical entrance.
  - `.reveal--rise`: `translate3d(0, 52px, 0)` deeper section-heading entrance.
  - `.reveal--left` / `.reveal--right`: `translate3d(±44px, 0, 0)` lateral split-column entrance.
  - `.reveal--scale`: `scale(0.92) translate3d(0, 20px, 0)` tactile tile/banner entrance.
  - `.reveal--blur`: `filter: blur(12px)` with `22px` rise for lead copy and CTAs.
  - `.reveal--clip`: `clip-path: inset(0 0 100% 0)` architectural wipe.
  - `.reveal-lines .brk`: per-line headline entrance (`translate3d(0, 75%, 0) rotate(1.5deg)` settling to `0deg` with `95ms` line-by-line stagger).
  - `.delay-1` through `.delay-8`: `45ms` increments (`45ms` to `360ms`).
- **Add one-shot diagonal scan sweeps (`.reveal.scan::after`).** Sweep a single `115deg` specular highlight (`rgba(253, 253, 248, 0.14)`, `0.95s`) across dark cards when they first enter the viewport.
- **Split SVG motion into two tiers.** Run `stroke-dashoffset` draw-in animations once on scroll reveal (`.draw-path`, `.cap-draw`), and gate all continuous diagram loops—dashed data flows (`.cap-flow`), node pulses (`.cap-pulse`), staggered step bounces (`.cap-seq`), and bounding-box scans (`.cap-scan`)—strictly behind `.cap-card:hover`.
- **Enforce reduced motion and context-aware focus rings.** Neutralize all reveals, sweeps, stroke draws, and infinite marquees inside `@media (prefers-reduced-motion: reduce)`. Render a `2px` `:focus-visible` outline in `--accent-loud` on dark surfaces, switching automatically to `--ink` inside `.on-loud` and `.on-paper` sections.

---

## 10. Proof-First Copy, Cohesive Icons, and Finished Chrome

Visual discipline collapses when paired with puffed-up copy or unstyled browser defaults.

- **Ban hype words and AI clichés.** Strip *seamless, cutting-edge, revolutionize, supercharge, unlock, magic, game-changing, robust,* and *next-gen*. State concrete mechanisms and operational terms (`Fixed scope, fixed price, weekly invoices`).
- **Lead with falsifiable metrics and explicit baselines.** Write `99.97% uptime`, `<200ms tool calls`, and `42% MAE reduction`—never vague claims like `blazing fast` or `42% better`.
- **Eliminate punctuation noise.** Use zero exclamation marks (`!`) and zero emoji in UI chrome. Drop trailing periods from headlines, subheads, buttons, `<dt>` labels, and short captions; keep periods only in multi-sentence prose.
- **Unify iconography and browser seams.** Draw vector icons at `1.5px–2px` stroke with round caps/joins, inheriting `currentColor`. Theme the `16px` custom scrollbar (`--bg-void` track, stepped dark thumb, `--accent-loud` `:active` thumb, plus `@supports` Firefox fallback) and maintain `32px–44px` minimum tap targets.

---

## 11. Automated Craft and Accessibility Verification

Human review misses edge-case regressions. Enforce design rules programmatically in CI or pre-release using a headless Playwright audit (`verify-redesign.mjs`) across desktop (`1440x900`) and mobile (`390x844`):

- **Alpha-composited luminance contrast:** Walk each text node's ancestor chain, alpha-blend translucent backgrounds over the root canvas, and fail any element below WCAG AA (`4.5:1` normal, `3:1` large).
- **Stylesheet AST and computed-style scans:** Walk `document.styleSheets` and live `getComputedStyle` values to fail builds on gradient-clipped text, saturated shadows/glows, `:hover` scale-ups (`scale(>1)`), overshooting `cubic-bezier` values, `transition: all`, layout-property transitions, UI font-weight limits (`<= 600` outside display heroes), negative tracking under `16px`, font sizes under `11px`, uppercase wide-tracked labels, emoji, exclamation marks, or hype vocabulary.
- **Structural and keyboard assertions:** Verify zero horizontal overflow (`scrollWidth <= clientWidth`), exactly one `<h1>`, a `<main>` landmark, accessible names on all interactive elements, `@media (prefers-reduced-motion)` rule presence, zero console/page errors, and a visible `:focus-visible` outline or ring on the first `Tab` keypress.

---

## Pre-Ship Audit Checklist

- [ ] **Direction & Passes:** Five-line direction (Product, Character, World, Moments, Signature) written without template adjectives; all nine passes completed in order.
- [ ] **Two Quiet + One Loud:** Two harmonious quiet colors carry `90%` of surfaces; one high-tension `--accent-loud` color passes the *"Imagine It Without It"* focal test; all live `[data-accent]` presets pass WCAG AA against `--ink`; `CARD_STYLES` plates use palette-family flat fills with `--card-bg` cutouts; partner logos stay monochrome at rest.
- [ ] **Cadence & Masks:** Full-bleed sections alternate registers (`loud`, `void`, `paper`, `mid-tone`); `.grid-lines` and `.marquee-mask` dissolve cleanly via CSS `mask-image`.
- [ ] **Hero & Subpages:** `clamp(680px, 100dvh, 960px)` poster composition with max two CTAs, zero horizontal overflow, unified subpage `<dl>` proof bar, and `scroll-margin-top` on jump-index targets.
- [ ] **Typography:** At most three font families; `tabular-nums` on every figure; sentence case throughout; zero negative tracking under `16px`; zero text under `11px`.
- [ ] **Grid & States:** `4px` spacing grid; nested radii; `border-t border-l` + `border-r border-b` hairline matrices without `2px` seams; semantic `<dl>` specs with one highlighted metric; complete `tablist`, empty (`00`), and form-submitted states.
- [ ] **3D & Vector Craft:** Monochrome `aria-hidden` ink marks limited to one beat per section; `36°` FOV WebGL camera, true front/back orbital occlusion (`z > 0` and `z < 0`), clamped damped tilt, and full `.dispose()` cleanup.
- [ ] **Interaction & Motion:** `.fill-hover` surface inversion with child token overrides; immediate above-the-fold reveal + `MutationObserver` filter re-binding; full reveal vocabulary + `115deg` scan sweep; stroke draw-in once on scroll and loops gated on `:hover`.
- [ ] **Copy & Automated Audit:** Zero emoji, zero `!`, zero hype words, no trailing periods on short strings; Playwright audit exits with `0` failures on desktop and mobile, including first-`Tab` `:focus-visible` verification.
