import { NUM } from './patterns.js';

// Legacy (comma-separated) syntax predates `none`; it is not allowed there.
const legacyHue = `(?:${NUM}(?:deg|grad|rad|turn)?)`;
const legacyPct = `(?:${NUM}%)`;
const legacyAlpha = `(?:${NUM}%?)`;

// Modern (space-separated) syntax supports `none` in any channel position.
const hue = `(?:${NUM}(?:deg|grad|rad|turn)?|none)`;
const pct = `(?:${NUM}%|none)`;
const alpha = `(?:${NUM}%?|none)`;

const legacy = `${legacyHue}\\s*,\\s*${legacyPct}\\s*,\\s*${legacyPct}(?:\\s*,\\s*${legacyAlpha})?`;
const modern = `${hue}\\s+${pct}\\s+${pct}(?:\\s*\\/\\s*${alpha})?`;

const hslRegex = new RegExp(`^(?:hsl|hsla)\\(\\s*(?:${legacy}|${modern})\\s*\\)$`, 'i');

/**
 * Tests whether a string is a valid CSS `hsl()` or `hsla()` color.
 *
 * Both syntaxes defined in the CSS Color Level 4 specification are supported:
 *
 * - **Legacy** (comma-separated): channels are numbers or percentages; `none` is
 *   not permitted; the optional alpha is a number or percentage.
 * - **Modern** (space-separated): channels are numbers, percentages, or the
 *   keyword `none`; the optional alpha is separated by `/`.
 *
 * Hue may carry an explicit angle unit (`deg`, `grad`, `rad`, `turn`) in both
 * syntaxes, or be a plain unitless number. Both `hsl()` and `hsla()` function
 * names are accepted. The check is case-insensitive and ignores leading/trailing
 * whitespace.
 *
 * @param hsl - The string to validate.
 * @returns `true` if `hsl` is a valid CSS `hsl()`/`hsla()` color, `false` otherwise.
 *
 * @example
 * // Legacy syntax
 * isValidHSL('hsl(270, 60%, 50%)');          // true
 * isValidHSL('hsla(270, 60%, 50%, 0.5)');    // true
 * isValidHSL('hsl(270, 60%, none)');         // false — `none` not allowed in legacy
 *
 * // Modern syntax
 * isValidHSL('hsl(270 60% 50%)');            // true
 * isValidHSL('hsl(270 60% 50% / 50%)');      // true
 * isValidHSL('hsl(none 60% 50% / 0.5)');     // true — `none` allowed in modern
 * isValidHSL('hsl(270deg 60% 50%)');         // true — explicit angle unit
 */
export const isValidHSL = (hsl: string): boolean => {
  if (typeof hsl !== 'string') return false;
  return hslRegex.test(hsl.trim());
};
