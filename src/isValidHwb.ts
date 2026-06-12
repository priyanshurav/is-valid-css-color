import { HUE, VALUE } from './patterns.js';

const hwbRegex = new RegExp(`^hwb\\(\\s*${HUE}\\s+${VALUE}\\s+${VALUE}\\s*(?:\\/\\s*${VALUE}\\s*)?\\)$`, 'i');

/**
 * Tests whether a string is a valid CSS `hwb()` color.
 *
 * `hwb()` only exists in the modern space-separated syntax introduced in CSS
 * Color Level 4; there is no legacy comma-separated form. Any channel —
 * hue, whiteness, blackness, or alpha — may be the keyword `none`. Hue
 * accepts an explicit angle unit (`deg`, `rad`, `grad`, `turn`) or a plain
 * unitless number; whiteness and blackness must be percentages. The optional
 * alpha is separated by `/` and may be a number or a percentage.
 *
 * The check is case-insensitive and ignores leading/trailing whitespace.
 *
 * @param hwb - The string to validate.
 * @returns `true` if `hwb` is a valid CSS `hwb()` color, `false` otherwise.
 *
 * @example
 * isValidHwb('hwb(270 0% 0%)');           // true
 * isValidHwb('hwb(270 0% 0% / 0.5)');     // true
 * isValidHwb('hwb(270deg 30% 10%)');      // true — explicit angle unit
 * isValidHwb('hwb(none 30% 10% / 50%)');  // true — `none` in any channel
 * isValidHwb('hwb(270, 0%, 0%)');         // false — commas not valid in hwb()
 */
export const isValidHwb = (hwb: string): boolean => {
  if (typeof hwb !== 'string') return false;
  return hwbRegex.test(hwb.trim());
};
