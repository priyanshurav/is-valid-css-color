import { HUE, VALUE } from './patterns.js';

const hwbRegex = new RegExp(`^hwb\\(\\s*${HUE}\\s+${VALUE}\\s+${VALUE}\\s*(?:\\/\\s*${VALUE}\\s*)?\\)$`, 'i');

/**
 * Tests whether a string is a valid CSS `hwb()` color.
 *
 * `hwb()` only exists in the modern space-separated syntax introduced in CSS
 * Color Level 4; there is no legacy comma-separated form. Any channel —
 * hue, whiteness, blackness, or alpha — may be the keyword `none`. Hue
 * accepts an explicit angle unit (`deg`, `rad`, `grad`, `turn`) or a plain
 * unitless number. Whiteness, blackness, and alpha each accept either a
 * `<number>` or a `<percentage>`, per the CSS Color 4 modern-syntax rule
 * that number and percentage component values may be freely mixed.
 *
 * The check is case-insensitive and ignores leading/trailing whitespace.
 *
 * @param hwb - The string to validate.
 * @returns `true` if `hwb` is a valid CSS `hwb()` color, `false` otherwise.
 *
 * @example
 * isValidHwb('hwb(270 0% 0%)');           // true
 * isValidHwb('hwb(270 0% 0% / 0.5)');     // true
 * isValidHwb('hwb(270deg 30% 10%)');      // true
 * isValidHwb('hwb(270 30 10)');           // true
 * isValidHwb('hwb(none 30% 10% / 50%)');  // true
 * isValidHwb('hwb(270, 0%, 0%)');         // false
 */
export const isValidHwb = (hwb: string): boolean => {
  if (typeof hwb !== 'string') return false;
  return hwbRegex.test(hwb.trim());
};
