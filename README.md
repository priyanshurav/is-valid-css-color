# is-valid-css-color

[![CI](https://github.com/priyanshurav/is-valid-css-color/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/priyanshurav/is-valid-css-color/actions)
[![npm version](https://img.shields.io/npm/v/is-valid-css-color.svg)](https://www.npmjs.com/package/is-valid-css-color)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/is-valid-css-color)](https://bundlephobia.com/result?p=is-valid-css-color)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](/LICENSE)

> A fast, lightweight validator for modern CSS color strings.

## Install

```sh
npm install is-valid-css-color
# or
pnpm add is-valid-css-color
# or
yarn add is-valid-css-color
```

Requires Node.js ≥ 18. This package is ESM-only (since v3.0.0) — it cannot be `require()`d from CommonJS.

## Usage

```ts
import { isValidColor } from 'is-valid-css-color';

isValidColor('rebeccapurple'); // true
isValidColor('#ff0000ff'); // true
isValidColor('rgb(255 0 0 / 50%)'); // true
isValidColor('not-a-color'); // false
```

## Features

- **Broad format coverage** — hex, named colors, `rgb()`, `hsl()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()`, and `color()` with nine color spaces
- **Blazing fast** — won't slow you down even in tight loops
- **Legacy + modern syntax** — `rgb()` and `hsl()` accept both comma-separated legacy and space-separated modern forms, including `none` channels and `/`-delimited alpha
- **Per-format exports** — each validator is individually exported so you only import what you need
- **Safe by default** — non-string input returns `false` without throwing
- **Zero dependencies** — nothing to audit, nothing to update
- **Lightweight** — ESM-only, tree-shakeable

## Supported formats

| Format             | Example                                      |
| ------------------ | -------------------------------------------- |
| Named colors       | `red`, `rebeccapurple`, `transparent`        |
| Hex                | `#f00`, `#f00f`, `#ff0000`, `#ff0000ff`      |
| `rgb()` / `rgba()` | `rgb(255, 0, 0)`, `rgb(255 0 0 / 50%)`       |
| `hsl()` / `hsla()` | `hsl(0, 100%, 50%)`, `hsl(0 100% 50% / 0.5)` |
| `hwb()`            | `hwb(270 0% 0%)`                             |
| `lab()`            | `lab(50 -20 30)`                             |
| `lch()`            | `lch(50 30 270deg)`                          |
| `oklab()`          | `oklab(0.5 -0.1 0.1)`                        |
| `oklch()`          | `oklch(0.63 0.26 29)`                        |
| `color()`          | `color(display-p3 1 0 0)`                    |

### Legacy vs modern syntax

`rgb()` and `hsl()` support both syntaxes. All other functions are modern-only.

**Legacy** (comma-separated): no `none`, alpha as a bare number or percentage.

```ts
isValidColor('rgb(255, 0, 0)');
isValidColor('rgba(255, 0, 0, 0.5)');
isValidColor('hsl(0, 100%, 50%)');
isValidColor('hsla(0, 100%, 50%, 0.5)');
```

**Modern** (space-separated): `none` allowed in any channel, alpha after `/`.

```ts
isValidColor('rgb(255 0 0)');
isValidColor('rgb(255 0 0 / 50%)');
isValidColor('hsl(none 100% 50% / 0.5)');
```

### `color()` color spaces

Supported: `srgb`, `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`, `rec2020`, `xyz`, `xyz-d50`, `xyz-d65`.

```ts
isValidColor('color(srgb 1 0 0)');
isValidColor('color(prophoto-rgb 0.9 0.1 0.1 / 80%)');
```

**Note**: This library validates static/literal color strings. It does not parse CSS math functions (e.g., calc(), max()) or CSS variables (var()).

## API

### `isValidColor(color: string): boolean`

Returns `true` if the string is a valid CSS color in any supported format.

### Per-format validators

Each format is also exported individually:

```ts
import {
  isValidHex,
  isValidRgb,
  isValidHsl,
  isValidHwb,
  isValidLab,
  isValidLch,
  isValidOklab,
  isValidOklch,
  isValidColorKeyword,
  isValidColorNotation,
} from 'is-valid-css-color';
```

All validators accept a `string` and return a `boolean`. Non-string input returns `false` without throwing.

## License

This software is licensed under the MIT License. See the [LICENSE](/LICENSE) for more info.
