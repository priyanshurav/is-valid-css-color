import { isValidRgb } from './isValidRgb.js';
import { isValidHsl } from './isValidHsl.js';
import { isValidHex } from './isValidHex.js';
import { isValidHwb } from './isValidHwb.js';
import { isValidLab } from './isValidLab.js';
import { isValidLch } from './isValidLch.js';
import { isValidOklab } from './isValidOklab.js';
import { isValidOklch } from './isValidOklch.js';
import { isValidColorKeyword } from './isValidColorKeyword.js';
import { isValidColorNotation } from './isValidColorNotation.js';

/**
 * Tests whether a string is a valid CSS color value.
 *
 * This is the top-level validator. It delegates to format-specific functions
 * and returns `true` if the input matches any of the following:
 *
 * - Named color (`red`, `rebeccapurple`, `transparent`, …)
 * - Hex (`#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`)
 * - `rgb()` / `rgba()`
 * - `hsl()` / `hsla()`
 * - `hwb()`
 * - `lab()`
 * - `lch()`
 * - `oklab()`
 * - `oklch()`
 * - `color()` with a predefined color space
 *
 * @param color - The string to validate.
 * @returns `true` if `color` is a valid CSS color in any supported format, `false` otherwise.
 *
 * @example
 * isValidColor('red');                          // true — named color
 * isValidColor('#f00');                         // true — hex
 * isValidColor('rgb(255 0 0)');                 // true — rgb
 * isValidColor('hsl(0 100% 50%)');              // true — hsl
 * isValidColor('oklch(0.63 0.26 29)');          // true — oklch
 * isValidColor('color(display-p3 1 0 0)');      // true — color()
 * isValidColor('notacolor');                    // false — not a recognized color format
 */
const isValidColor = (color: string): boolean => {
  if (typeof color !== 'string') return false;

  const trimmed = color.trim();
  if (trimmed.length === 0) return false;

  // if the color does not contain a '(' then it is almost certainly either a color keyword or hex
  if (!trimmed.includes('(')) return isValidColorKeyword(trimmed) || isValidHex(trimmed);

  switch (trimmed[0]) {
    case 'r':
    case 'R':
      return isValidRgb(trimmed);
    case 'c':
    case 'C':
      return isValidColorNotation(trimmed);
    case 'h':
    case 'H':
      return isValidHwb(trimmed) || isValidHsl(trimmed);
    case 'l':
    case 'L':
      return isValidLab(trimmed) || isValidLch(trimmed);
    case 'o':
    case 'O':
      return isValidOklab(trimmed) || isValidOklch(trimmed);
    default:
      return false;
  }
};

export {
  isValidColor,
  isValidRgb,
  isValidHsl,
  isValidHwb,
  isValidHex,
  isValidLab,
  isValidLch,
  isValidOklch,
  isValidOklab,
  isValidColorKeyword,
  isValidColorNotation,
};
