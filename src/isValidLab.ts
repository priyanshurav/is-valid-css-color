import { VALUE } from './patterns.js';

export const labRegex = new RegExp(
  `^lab\\(\\s*${VALUE}\\s+${VALUE}\\s+${VALUE}(?:\\s*\\/\\s*${VALUE})?\\s*\\)$`,
  'i'
);

/**
 * Tests whether a string is a valid CSS `lab()` color.
 *
 * `lab()` uses the CIE L*a*b* color space defined in CSS Color Level 4.
 * All three channels — lightness (`L`), green-red axis (`a`), and
 * blue-yellow axis (`b`) — accept a number, a percentage, or the keyword
 * `none`. The optional alpha is separated by `/` and follows the same rules.
 *
 * There is no legacy comma-separated form; only the modern space-separated
 * syntax is valid. The check is case-insensitive and ignores leading/trailing
 * whitespace.
 *
 * @param lab - The string to validate.
 * @returns `true` if `lab` is a valid CSS `lab()` color, `false` otherwise.
 *
 * @example
 * isValidLab('lab(50 -20 30)');           // true
 * isValidLab('lab(50% -20% 30%)');        // true
 * isValidLab('lab(50 -20 30 / 0.5)');     // true
 * isValidLab('lab(none -20 30 / 50%)');   // true
 * isValidLab('lab(50, -20, 30)');         // false
 */
export const isValidLab = (lab: string): boolean => {
  if (typeof lab !== 'string') return false;
  return labRegex.test(lab.trim());
};
