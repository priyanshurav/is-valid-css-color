import { NUM } from './patterns.js';

const legacyNumBase = `${NUM}\\s*,\\s*${NUM}\\s*,\\s*${NUM}`;
const legacyPctBase = `${NUM}%\\s*,\\s*${NUM}%\\s*,\\s*${NUM}%`;
const legacyAlpha = `(?:\\s*,\\s*${NUM}%?)?`;

const legacy = `(?:${legacyNumBase}|${legacyPctBase})${legacyAlpha}`;

const modernChannel = `(?:${NUM}%?|none)`;
const modernAlpha = `(?:\\s*\\/\\s*${modernChannel})?`;

const modern = `${modernChannel}\\s+${modernChannel}\\s+${modernChannel}${modernAlpha}`;

const innerColors = `(?:${legacy}|${modern})`;

export const rgbRegex = new RegExp(`^rgba?\\(\\s*${innerColors}\\s*\\)$`, 'i');

/**
 * Tests whether a string is a valid CSS `rgb()` or `rgba()` color.
 *
 * Both syntaxes defined in the CSS Color Level 4 specification are supported:
 *
 * - **Legacy** (comma-separated): channels are all numbers or all percentages
 *   and must be consistent — mixing is not allowed; `none` is not permitted;
 *   the optional alpha is a number or percentage.
 * - **Modern** (space-separated): channels are numbers or percentages (and may
 *   be mixed), or the keyword `none`; the optional alpha is separated by `/`.
 *
 * Both `rgb()` and `rgba()` function names are accepted. The check is
 * case-insensitive and ignores leading/trailing whitespace.
 *
 * @param rgb - The string to validate.
 * @returns `true` if `rgb` is a valid CSS `rgb()`/`rgba()` color, `false` otherwise.
 *
 * @example
 * // Legacy syntax
 * isValidRgb('rgb(255, 0, 128)');            // true
 * isValidRgb('rgb(100%, 0%, 50%)');          // true
 * isValidRgb('rgba(255, 0, 128, 0.5)');      // true
 * isValidRgb('rgb(255, 0%, 128)');           // false
 * isValidRgb('rgb(255, 0, none)');           // false
 *
 * // Modern syntax
 * isValidRgb('rgb(255 0 128)');              // true
 * isValidRgb('rgb(255 0 128 / 50%)');        // true
 * isValidRgb('rgb(none 0 128 / 0.5)');       // true
 */
export const isValidRgb = (rgb: string): boolean => {
  if (typeof rgb !== 'string') return false;
  return rgbRegex.test(rgb.trim());
};
