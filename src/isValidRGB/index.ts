import { validateFunctionalRGB } from './validateFunctionalRGB';
import { validateHexRGB } from './validateHexRGB';

/**
 * Returns true if a CSS RGB or RGBA or hex color string is valid otherwise if it is invalid then it returns false
 * @param rgbString The CSS RGB or RGBA or hex color string to validate
 */
export const isValidRGB = (rgbString: string): boolean => {
  if (typeof rgbString !== 'string')
    throw new Error(`'rgbString' must be a string`);
  if (rgbString.startsWith('#')) return validateHexRGB(rgbString);
  else return validateFunctionalRGB(rgbString);
};
