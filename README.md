# NumberSense

A React app for generating and proctoring NumberSense-style mental math timed tests. Deployed to GitHub Pages.

## Features

- **Problem generation** across 3 difficulty tiers: basic arithmetic, intermediate (fractions, percentages, squares), and advanced (large squares, cube roots, decimal-to-fraction, order of operations)
- **Timed test proctoring** with configurable duration and problem count
- **Presets**: Quick Practice (20 problems / 4 min), Half Test (40 / 5 min), Full Test (80 / 10 min)
- **Keyboard navigation**: Enter to advance, arrow keys to move between problems
- **Progress tracking**: visual grid showing answered/unanswered/current problem
- **Scoring**: +5 correct, −4 incorrect, 0 skipped — matching UIL Number Sense rules
- **Results review**: see every problem, your answer, and the correct answer

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build      # builds to dist/
```
