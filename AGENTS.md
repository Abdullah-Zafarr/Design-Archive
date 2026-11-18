# Repository Rules for Agents

Follow these rules on every task in this repository.

## 1. Workflow

1. Inspect the local `.mp4` reference videos in the repository root.
2. Extract key frames into `temp/` (never into the repository root) to study every section, layout, color, font, and interaction shown in the video.
3. Create a completely separate top-level folder for each design. Never reuse or overwrite another design's folder.
4. Recreate the design shown in the video as closely as possible: match the layout, grid, proportions, palette, typography, visual hierarchy, and components to the video frames.
5. Apply the engineering and craft standards in [DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md) and [DESIGN_GOLDEN_NUGGETS.md](./DESIGN_GOLDEN_NUGGETS.md) wherever they support clean execution without overriding faithful replication of the reference video.

## 2. Folder Naming Convention

Name every design folder with this exact format:

```text
<brandutility>_<colorscheme>
```

- Use lowercase with no spaces.
- Separate the brand utility and the color scheme with a single underscore (`_`).
- Join multiple colors in the color scheme with `+`.
- Example: `clothingbrand_navyblue+cyan`

## 3. Repository Hygiene

- Never commit `.mp4` files. They stay local and are ignored via `.gitignore`.
- Place temporary scripts, frame extractions, and scratch files inside `temp/` only. Keep the repository root clean.
- Each design folder must be self-contained and runnable on its own.
- Each design folder must include its own `README.md` with screenshots of the recreated design (for example, saved under `<folder>/screenshots/` and embedded in `<folder>/README.md`).
- **Branch curation:** Keep only distinct, highest-quality flagship designs on `main`. Push oddly similar color swaps or template-twin designs to the `similar-designs` branch.
