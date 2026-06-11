const hexRegex = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}(?:[0-9a-f]{2})?)$/i;

/**
 * Tests whether a string is a valid CSS hex color.
 *
 * Accepts the `#RGB`, `#RGBA`, `#RRGGBB`, and `#RRGGBBAA` forms.
 * The leading `#` is required. The check is case-insensitive and
 * ignores leading/trailing whitespace.
 *
 * @param hex - The string to validate.
 * @returns `true` if `hex` is a valid CSS hex color, `false` otherwise.
 *
 * @example
 * isValidHex('#f00');       // true — shorthand RGB
 * isValidHex('#f00f');      // true — shorthand RGBA
 * isValidHex('#ff0000');    // true — full RGB
 * isValidHex('#ff0000ff');  // true — full RGBA
 * isValidHex('ff0000');     // false — missing leading #
 * isValidHex('#ff000');     // false — odd-length (5 digits)
 */
export const isValidHex = (hex: string): boolean => {
  if (typeof hex !== 'string') return false;
  return hexRegex.test(hex.trim());
};
