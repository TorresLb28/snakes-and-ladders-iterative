# CSS Best Practices

Mandatory standards for styling in this project.

## 1. CSS Custom Properties (Required)

- All theming must be done using **CSS Custom Properties**. Repeating color, spacing, typography, or border radius values literally in components is prohibited.
- Define variables in `:root`, grouped by category:

```css
:root {
  /* Colors */
  --color-bg: #f5f7fa;
  --color-surface: #ffffff;
  --color-primary: #2563eb;
  --color-text: #1f2937;
  --color-snake: #dc2626;
  --color-ladder: #16a34a;

  /* Typography */
  --font-family-base: system-ui, sans-serif;
  --font-size-base: 1rem;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 2rem;

  /* Borders and shadows */
  --radius-md: 8px;
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 10%);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-smooth: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

- Components must consume variables using `var(--name)` and, when appropriate, with fallback values: `var(--color-primary, #2563eb)`.
- Facilitate theming (dark mode, alternative palettes) by overriding variables, not by rewriting rules.

## 2. Clean and Descriptive Class Names

- Use lowercase names with `kebab-case`: `.game-board`, `.player-token`, `.dice-button`.
- Prefer the BEM convention for reusable components:
  - Block: `.dice`
  - Element: `.dice__face`
  - Modifier: `.dice--rolling`
- Avoid ambiguous abbreviations, generic names (`.box`, `.red`), and overly nested selectors.
- Do not use ID selectors for styling; IDs are reserved for anchors and accessibility.
- Keep specificity low: avoid `!important` unless documented justification exists.

## 3. Responsive Design

- Use a **mobile-first** approach: base styles for mobile, then `@media (min-width: ...)` for larger screens.
- Use **Flexbox** for one-dimensional alignment and distribution (controls, player bar, rows).
- Use **CSS Grid** for two-dimensional layouts, especially the board:

```css
.game-board {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: var(--space-1);
  aspect-ratio: 1 / 1;
}
```

- Use relative units (`rem`, `%`, `fr`, `clamp()`) for fluid typography and spacing.
- Define consistent breakpoints (e.g., 480px, 768px, 1024px).
- Avoid fixed pixel widths that break on small screens.

## 4. Transitions and Animations

- Animate tokens and dice rolls with smooth transitions of moderate duration (150–400 ms).
- Prioritize properties that do not cause expensive repaints: `transform` and `opacity`.

```css
.player-token {
  transition: transform var(--transition-smooth);
  will-change: transform;
}

.dice--rolling {
  animation: dice-roll 600ms var(--transition-smooth);
}

@keyframes dice-roll {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}
```

- Respect accessibility preferences and reduce motion when requested:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- Do not animate layout properties (`width`, `height`, `top`, `left`) when `transform` is sufficient.

## 5. Organization and Quality

- Recommended structure: `reset` → `variables` → `base` → `layout` → `components` → `utilities` → `media queries`.
- One responsibility per file or block, clearly separated with section comments.
- Consistent indentation (2 spaces) and property order.
- Check for duplicate rules and dead code before delivery.
