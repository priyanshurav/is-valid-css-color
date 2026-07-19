import { VALUE } from './patterns.js';

export const oklabRegex = new RegExp(
  String.raw`^oklab\(\s*${VALUE}\s+${VALUE}\s+${VALUE}(?:\s*\/\s*${VALUE})?\s*\)$`,
  'i'
);

/**
 * Tests whether a string is a valid CSS `oklab()` color.
 *
 * `oklab()` uses the Oklab perceptual color space defined in CSS Color Level 4.
 * It is structurally identical to `lab()` but operates in a different color
 * space designed for more perceptually uniform lightness and hue. All three
 * channels — lightness (`L`), green-red axis (`a`), and blue-yellow axis (`b`)
 * — accept a number, a percentage, or the keyword `none`. The optional alpha is
 * separated by `/` and follows the same rules.
 *
 * There is no legacy comma-separated form; only the modern space-separated
 * syntax is valid. The check is case-insensitive and ignores leading/trailing
 * whitespace.
 *
 * @param oklab - The string to validate.
 * @returns `true` if `oklab` is a valid CSS `oklab()` color, `false` otherwise.
 *
 * @example
 * isValidOklab('oklab(0.5 -0.1 0.1)');          // true
 * isValidOklab('oklab(50% -20% 30%)');           // true
 * isValidOklab('oklab(0.5 -0.1 0.1 / 0.5)');    // true
 * isValidOklab('oklab(none -0.1 0.1 / 50%)');   // true
 * isValidOklab('oklab(0.5, -0.1, 0.1)');        // false
 */
export const isValidOklab = (oklab: string): boolean => {
  if (typeof oklab !== 'string') return false;
  return oklabRegex.test(oklab.trim());
};
