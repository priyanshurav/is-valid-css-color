# is-valid-css-color

[![CI](https://github.com/priyanshurav/is-valid-css-color/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/priyanshurav/is-valid-css-color/actions)
[![npm version](https://img.shields.io/npm/v/is-valid-css-color.svg)](https://www.npmjs.com/package/is-valid-css-color)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/is-valid-css-color)](https://bundlephobia.com/result?p=is-valid-css-color)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](/LICENSE)

> A fast, lightweight validator for modern CSS color strings.

- **Broad format coverage:** hex, color keywords, `rgb()`, `hsl()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()`, and `color()`
- **Legacy + modern syntax:** `rgb()` and `hsl()` accept both comma-separated legacy and space-separated modern forms, including `none` channels and `/`-delimited alpha
- **Per-format exports:** each validator is individually exported and tree-shakeable, so you only import what you need
- **Safe by default:** non-string input returns `false` without throwing
- **Zero dependencies**

## Install

```sh
npm install is-valid-css-color
# or
pnpm add is-valid-css-color
# or
yarn add is-valid-css-color
```

This package is ESM-only (since [v3.0.0](https://github.com/priyanshurav/is-valid-css-color/releases/tag/v3.0.0)). It cannot be `require()`d from CommonJS.

## Usage

```ts
import { isValidCssColor } from 'is-valid-css-color';

isValidCssColor('rebeccapurple'); // true
isValidCssColor('#ff0000ff'); // true
isValidCssColor('rgb(255 0 0 / 50%)'); // true
isValidCssColor('not-a-color'); // false
```

## API

### `isValidCssColor(color: string): boolean`

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

## Supported formats

| Format             | Validator              | Example                                      |
| ------------------ | ---------------------- | -------------------------------------------- |
| Color keywords     | `isValidColorKeyword`  | `red`, `rebeccapurple`, `transparent`        |
| Hex                | `isValidHex`           | `#f00`, `#f00f`, `#ff0000`, `#ff0000ff`      |
| `rgb()` / `rgba()` | `isValidRgb`           | `rgb(255, 0, 0)`, `rgb(255 0 0 / 50%)`       |
| `hsl()` / `hsla()` | `isValidHsl`           | `hsl(0, 100%, 50%)`, `hsl(0 100% 50% / 0.5)` |
| `hwb()`            | `isValidHwb`           | `hwb(270 0% 0%)`                             |
| `lab()`            | `isValidLab`           | `lab(50 -20 30)`                             |
| `lch()`            | `isValidLch`           | `lch(50 30 270deg)`                          |
| `oklab()`          | `isValidOklab`         | `oklab(0.5 -0.1 0.1)`                        |
| `oklch()`          | `isValidOklch`         | `oklch(0.63 0.26 29)`                        |
| `color()`          | `isValidColorNotation` | `color(display-p3 1 0 0)`                    |

### Legacy vs modern syntax

`rgb()` and `hsl()` support both syntaxes. All other functions are modern-only.

**Legacy** (comma-separated): no `none`, alpha as a bare number or percentage.

```ts
isValidCssColor('rgb(255, 0, 0)');
isValidCssColor('rgba(255, 0, 0, 0.5)');
isValidCssColor('hsl(0, 100%, 50%)');
isValidCssColor('hsla(0, 100%, 50%, 0.5)');
```

**Modern** (space-separated): `none` allowed in any channel, alpha after `/`.

```ts
isValidCssColor('rgb(255 0 0)');
isValidCssColor('rgb(255 0 0 / 50%)');
isValidCssColor('hsl(none 100% 50% / 0.5)');
```

### `color()` color spaces

Supported: `srgb`, `srgb-linear`, `display-p3`, `display-p3-linear`, `a98-rgb`, `prophoto-rgb`, `rec2020`, `xyz`, `xyz-d50`, `xyz-d65`.

```ts
isValidCssColor('color(srgb 1 0 0)');
isValidCssColor('color(prophoto-rgb 0.9 0.1 0.1 / 80%)');
```

**Note**: This library validates static, literal color strings only. Dynamic CSS constructs (`calc()`, `var()`, `color-mix()`, relative color syntax, and custom color spaces) are not supported. CSS comments inside a color string are also not ignored and will cause validation to fail.

## License

This software is licensed under the MIT License. See the [LICENSE](/LICENSE) for more info.
