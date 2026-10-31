import { NUM, VALUE, WS, VALUE_THEN_SEP, HUE_THEN_SEP } from './patterns.js';
import { trim } from './utils.js';

const legacyHue = `(?:${NUM}(?:deg|grad|rad|turn)?)`;
const legacyPct = `(?:${NUM}%)`;
const legacyAlpha = `(?:${WS}*,${WS}*${NUM}%?)?`;

const legacy = `${legacyHue}${WS}*,${WS}*${legacyPct}${WS}*,${WS}*${legacyPct}${legacyAlpha}`;
const modern = String.raw`${HUE_THEN_SEP}${VALUE_THEN_SEP}${VALUE}(?:${WS}*\/${WS}*${VALUE})?`;

export const legacyHslRegex = new RegExp(String.raw`^hsla?\(${WS}*${legacy}${WS}*\)$`, 'i');
export const modernHslRegex = new RegExp(String.raw`^hsla?\(${WS}*${modern}${WS}*\)$`, 'i');

/**
 * Tests whether a string is a valid CSS `hsl()` or `hsla()` color.
 *
 * Both syntaxes defined in the CSS Color Level 4 specification are supported:
 *
 * - **Legacy** (comma-separated): hue is a number or an angle; saturation and
 *   lightness must be percentages (plain numbers are rejected); `none` is not
 *   permitted; the optional alpha is a number or percentage.
 * - **Modern** (space-separated): hue is a number, an angle, or `none`;
 *   saturation and lightness are percentages, numbers, or `none` and may be
 *   mixed; the optional alpha is separated by `/` and is a number, a
 *   percentage, or `none`.
 *
 * Hue may carry an explicit angle unit (`deg`, `grad`, `rad`, `turn`) in both
 * syntaxes, or be a plain unitless number. Both `hsl()` and `hsla()` function
 * names are accepted. The check is case-insensitive and ignores leading/trailing
 * whitespace. Validates syntax only; component values are not range-checked.
 *
 * @param hsl - The string to validate.
 * @returns `true` if `hsl` is a valid CSS `hsl()`/`hsla()` color, `false` otherwise.
 *
 * @example
 * // Legacy syntax
 * isValidHsl('hsl(270, 60%, 50%)');          // true
 * isValidHsl('hsla(270, 60%, 50%, 0.5)');    // true
 * isValidHsl('hsl(270deg, 60%, 50%)');       // true
 * isValidHsl('hsl(270, 60, 50)');            // false
 * isValidHsl('hsl(270, 60%, none)');         // false
 *
 * // Modern syntax
 * isValidHsl('hsl(270 60% 50%)');            // true
 * isValidHsl('hsl(270 60% 50% / 50%)');      // true
 * isValidHsl('hsl(none 60% 50% / 0.5)');     // true
 * isValidHsl('hsl(270deg 60% 50%)');         // true
 * isValidHsl('hsl(270 60 50)');              // true
 *
 * // Values are not range-checked (valid syntax)
 * isValidHsl('hsl(0 999% 50%)');             // true
 */
export const isValidHsl = (hsl: string): boolean => {
  if (typeof hsl !== 'string') return false;
  hsl = trim(hsl);
  return legacyHslRegex.test(hsl) || modernHslRegex.test(hsl);
};
