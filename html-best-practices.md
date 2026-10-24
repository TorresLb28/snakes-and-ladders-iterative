# HTML Best Practices

Mandatory standards for the structure and markup of HTML in this project.

## 1. Semantic HTML5 Structure

- Every document must start with `<!DOCTYPE html>` and declare a `lang` attribute on the `<html>` element (e.g., `lang="en"`).
- Use semantic tags instead of generic `<div>` elements whenever an alternative exists:
  - `<header>` for the page or section header.
  - `<nav>` for navigation blocks.
  - `<main>` for the main content (only one per document).
  - `<section>` for grouping related content with its own heading.
  - `<article>`, `<aside>`, `<footer>` as appropriate.
- Maintain a coherent heading hierarchy: only one `<h1>` per page and do not skip heading levels (`<h2>` → `<h3>`).
- The Snakes and Ladders board must be built with a clear structure, for example:

```html
<main>
  <section aria-labelledby="board-title">
    <h2 id="board-title">Board</h2>
    <div class="board" role="grid" aria-label="Snakes and Ladders Board">
      <!-- cells -->
    </div>
  </section>

  <section aria-labelledby="controls-title">
    <h2 id="controls-title">Controls</h2>
    <button type="button" class="btn btn--roll">Roll Dice</button>
  </section>
</main>
```

- Use **CSS Grid** for the board layout (defined in stylesheets, never inline).
- Board cells must be represented by elements that preserve the logical DOM order, regardless of their visual position.

## 2. Accessibility

- Every image must include a descriptive `alt` attribute. If decorative, use `alt=""`.
- Interactive controls must use native elements (`<button>`, `<a>`) instead of `<div>` elements with click handlers.
- Only add ARIA attributes when native HTML does not already convey the meaning:
  - `aria-label` or `aria-labelledby` for regions and controls without visible text.
  - `aria-live="polite"` to announce game state changes (turn, dice result).
  - `aria-pressed`, `aria-disabled`, and `aria-current` when appropriate.
- Maintain a logical and visible tab order: do not remove focus outlines (`outline: none` is prohibited without an alternative focus style).
- Basic keyboard navigation:
  - All controls must be reachable via `Tab`.
  - Must be activatable with `Enter` and `Space`.
  - Focus must always be clearly visible.
- Associate labels with inputs using `<label for="...">` and provide textual instructions for complex actions.
- Ensure sufficient contrast between text and background (minimum WCAG AA).

## 3. Strict Separation of Responsibilities

- **Inline styles are prohibited** (`style="..."`).
- **Inline scripts are prohibited** (`<script>...</script>` with logic) and event attributes are prohibited (`onclick`, `onchange`, etc.).
- All CSS must reside in external `.css` files linked from the `<head>`.
- All JavaScript must reside in external `.js` files loaded with `<script type="module">` (or `defer`).
- HTML should only declare structure and semantics; it must not contain presentation or behavior.

## 4. Additional Best Practices

- Use lowercase attributes with double-quoted values.
- Use consistent indentation (2 spaces).
- Avoid unnecessary nesting and container elements with no semantic purpose.
- Validate markup with the W3C validator before delivery.
