import { validCSSColorNames } from './validCSSColorNames';

/**
 * Returns true if a CSS color name is valid otherwise if it is invalid then it returns false
 * @param colorName The CSS color name to validate
 */
export const isValidColorName = (colorName: string): boolean => {
  if (!colorName) return false;
  return validCSSColorNames.includes(colorName.toLowerCase());
};
