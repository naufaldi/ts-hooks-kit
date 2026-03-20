# Dark mode `--muted-foreground` contrast (issue #27)

Cross-check for [issue #27](https://github.com/naufaldi/ts-hooks-kit/issues/27): WCAG 2.1 contrast for docs theme tokens in [`apps/docs/app/styles.css`](../apps/docs/app/styles.css) (`.dark`).

## Tokens (dark)

| Token              | HSL components              |
| ------------------ | --------------------------- |
| `--background`     | `224 71% 4%`                |
| `--muted`          | `223 47% 11%`               |
| `--muted-foreground` | `215.4 16.3% 56.9%`       |

## Contrast ratios (normal text)

Computed with WCAG 2.1 [relative luminance](https://www.w3.org/TR/WCAG21/#dfn-relative-luminance) and sRGB conversion per [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/#hsl-to-rgb) (same methodology as [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)).

| Foreground / background                         | Ratio  | WCAG AA (4.5:1) |
| ----------------------------------------------- | ------ | --------------- |
| `--muted-foreground` on `--background`          | **6.04:1** | Pass        |
| `--muted-foreground` on `--muted`               | **5.38:1** | Pass        |

AAA (7:1) is not required for these secondary-text surfaces; current tokens already meet AA for normal text.

## Code change

None: `--muted-foreground` lightness does not need adjustment for AA.

## Verification commands (local)

- `pnpm build:docs` — ensures docs and `styles.css` compile.
- `pnpm dev:docs` — manual: enable dark mode and spot-check sidebar, TOC, and hook descriptions.
