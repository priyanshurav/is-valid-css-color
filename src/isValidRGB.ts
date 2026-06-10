import { NUM } from './patterns.js';

// Legacy (comma-separated) syntax predates `none`; it is not allowed there.
const ln = NUM;
const lp = `${NUM}%`;
const la = `${NUM}%?`;

// Modern (space-separated) syntax supports `none` in any channel position.
const n = `(?:${NUM}|none)`;
const p = `(?:${NUM}%|none)`;
const a = `(?:${NUM}%?|none)`;

const legacyNum = `${ln}\\s*,\\s*${ln}\\s*,\\s*${ln}(?:\\s*,\\s*${la})?`;
const legacyPct = `${lp}\\s*,\\s*${lp}\\s*,\\s*${lp}(?:\\s*,\\s*${la})?`;
const modernNum = `${n}\\s+${n}\\s+${n}(?:\\s*\\/\\s*${a})?`;
const modernPct = `${p}\\s+${p}\\s+${p}(?:\\s*\\/\\s*${a})?`;

const innerColors = `(?:${legacyNum}|${legacyPct}|${modernNum}|${modernPct})`;
const rgbRegex = new RegExp(`^rgba?\\(\\s*${innerColors}\\s*\\)$`, 'i');

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
 * isValidRGB('rgb(255, 0, 128)');            // true — numbers
 * isValidRGB('rgb(100%, 0%, 50%)');          // true — percentages
 * isValidRGB('rgba(255, 0, 128, 0.5)');      // true — with alpha
 * isValidRGB('rgb(255, 0%, 128)');           // false — mixed numbers and percentages
 * isValidRGB('rgb(255, 0, none)');           // false — `none` not allowed in legacy
 *
 * // Modern syntax
 * isValidRGB('rgb(255 0 128)');              // true
 * isValidRGB('rgb(255 0 128 / 50%)');        // true — with alpha
 * isValidRGB('rgb(none 0 128 / 0.5)');       // true — `none` allowed in modern
 */
export const isValidRGB = (rgb: string): boolean => {
  if (typeof rgb !== 'string') return false;
  return rgbRegex.test(rgb.trim());
};
