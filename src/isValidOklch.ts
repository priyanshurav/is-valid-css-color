import { VALUE, HUE } from './patterns.js';

const oklchRegex = new RegExp(`^oklch\\(\\s*${VALUE}\\s+${VALUE}\\s+${HUE}\\s*(?:\\/\\s*${VALUE}\\s*)?\\)$`, 'i');

/**
 * Tests whether a string is a valid CSS `oklch()` color.
 *
 * `oklch()` is the cylindrical form of the Oklab color space, defined in CSS
 * Color Level 4. It is structurally identical to `lch()` but operates in the
 * Oklab color space for more perceptually uniform lightness and hue. Its three
 * channels are lightness (`L`), chroma (`C`), and hue (`H`). Lightness and
 * chroma accept a number, a percentage, or the keyword `none`. Hue accepts a
 * number, an explicit angle unit (`deg`, `grad`, `rad`, `turn`), or `none`.
 * The optional alpha is separated by `/` and follows the same rules as
 * lightness and chroma.
 *
 * There is no legacy comma-separated form; only the modern space-separated
 * syntax is valid. The check is case-insensitive and ignores leading/trailing
 * whitespace.
 *
 * @param oklch - The string to validate.
 * @returns `true` if `oklch` is a valid CSS `oklch()` color, `false` otherwise.
 *
 * @example
 * isValidOklch('oklch(0.5 0.15 270)');           // true — numbers
 * isValidOklch('oklch(50% 30% 270deg)');         // true — percentages and angle unit
 * isValidOklch('oklch(0.5 0.15 270 / 0.5)');    // true — with alpha
 * isValidOklch('oklch(none 0.15 270 / 50%)');   // true — `none` in any channel
 * isValidOklch('oklch(0.5, 0.15, 270)');        // false — commas not valid in oklch()
 */
export const isValidOklch = (oklch: string): boolean => {
  if (typeof oklch !== 'string') return false;
  return oklchRegex.test(oklch.trim());
};
