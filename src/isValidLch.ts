import { VALUE, HUE } from './patterns.js';

export const lchRegex = new RegExp(
  String.raw`^lch\(\s*${VALUE}\s+${VALUE}\s+${HUE}\s*(?:\/\s*${VALUE}\s*)?\)$`,
  'i'
);

/**
 * Tests whether a string is a valid CSS `lch()` color.
 *
 * `lch()` is the cylindrical form of the CIE L*a*b* color space, defined in
 * CSS Color Level 4. Its three channels are lightness (`L`), chroma (`C`), and
 * hue (`H`). Lightness and chroma accept a number, a percentage, or the keyword
 * `none`. Hue accepts a number, an explicit angle unit (`deg`, `grad`, `rad`,
 * `turn`), or `none`. The optional alpha is separated by `/` and follows the
 * same rules as lightness and chroma.
 *
 * There is no legacy comma-separated form; only the modern space-separated
 * syntax is valid. The check is case-insensitive and ignores leading/trailing
 * whitespace.
 *
 * @param lch - The string to validate.
 * @returns `true` if `lch` is a valid CSS `lch()` color, `false` otherwise.
 *
 * @example
 * isValidLch('lch(50 30 270)');           // true
 * isValidLch('lch(50% 30% 270deg)');      // true
 * isValidLch('lch(50 30 270 / 0.5)');     // true
 * isValidLch('lch(none 30 270 / 50%)');   // true
 * isValidLch('lch(50, 30, 270)');         // false
 */
export const isValidLch = (lch: string): boolean => {
  if (typeof lch !== 'string') return false;
  return lchRegex.test(lch.trim());
};
