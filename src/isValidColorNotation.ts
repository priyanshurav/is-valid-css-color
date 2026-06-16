import { VALUE } from './patterns.js';

const colorSpaces = '(?:srgb(?:-linear)?|display-p3|a98-rgb|prophoto-rgb|rec2020|xyz(?:-d(?:50|65))?)';

const colorNotationRegex = new RegExp(
  `^color\\(\\s*${colorSpaces}\\s+${VALUE}\\s+${VALUE}\\s+${VALUE}(?:\\s*\\/\\s*${VALUE})?\\s*\\)$`,
  'i'
);

/**
 * Tests whether a string is a valid CSS `color()` function.
 *
 * Accepts values in the following predefined color spaces:
 * `srgb`, `srgb-linear`, `display-p3`, `a98-rgb`, `prophoto-rgb`,
 * `rec2020`, `xyz`, `xyz-d50`, `xyz-d65`.
 *
 * Each channel accepts a number, a percentage, or the keyword `none`.
 * The optional alpha is separated by `/`. The check is case-insensitive
 * and ignores leading/trailing whitespace.
 *
 * **Only absolute color syntax is supported.** Relative color syntax
 * (`color(from <origin> ...)`) is not recognised and will return `false`.
 *
 * @param colorNotation - The string to validate.
 * @returns `true` if `colorNotation` is a valid CSS `color()` function, `false` otherwise.
 *
 * @example
 * isValidColorNotation('color(srgb 0.5 0.3 0.1)');             // true — srgb, numbers
 * isValidColorNotation('color(display-p3 50% 30% 10% / 80%)'); // true — display-p3, percentages, with alpha
 * isValidColorNotation('color(srgb none 0.3 0.1 / 0.5)');      // true — `none` in a channel
 * isValidColorNotation('color(hsl 0.5 0.3 0.1)');              // false — hsl is not a predefined color space
 * isValidColorNotation('rgb(255 0 0)');                        // false — wrong function
 * isValidColorNotation('color(from red srgb r g b)');          // false — relative syntax not supported
 */
export const isValidColorNotation = (colorNotation: string): boolean => {
  if (typeof colorNotation !== 'string') return false;
  return colorNotationRegex.test(colorNotation.trim());
};
