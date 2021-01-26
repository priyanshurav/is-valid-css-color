import { parseHSL } from './parseHSL';

/**
 * Returns true if a CSS HSL or HSLA color string is valid otherwise if it is invalid then it returns false
 * @param hslString The CSS HSL or HSLA string to validate
 */
export const isValidHSL = (hslString: string): boolean => {
  if (typeof hslString !== 'string')
    throw new Error(`'hslString' must be a string`);

  const csvLength = hslString.replace(/((hsla)|(hsl))|\(|\)|\s/g, '').split(',')
    .length;

  const isAlpha = hslString.startsWith('hsla(');

  const isCSVLengthValid = csvLength === 3 || csvLength === 4;
  if (
    !hslString.startsWith(isAlpha ? 'hsla(' : 'hsl(') ||
    !hslString.endsWith(')') ||
    !isCSVLengthValid
  )
    return false;
  const { hue, saturation, lightness, alpha } = parseHSL(hslString);

  const hueNum = parseFloat(hue);
  if (hueNum > 360 || hueNum < 0) return false;
  const saturationNum = parseFloat(saturation);
  if (saturationNum > 100 || saturationNum < 0) return false;
  const lightnessNum = parseFloat(lightness);
  if (lightnessNum > 100 || lightnessNum < 0) return false;

  if (isNaN(parseFloat(hue.replace(/(deg|rad|grad|turn)$/, '')))) return false;
  if (!saturation.endsWith('%') && saturationNum !== 0) return false;
  if (isNaN(parseFloat(saturation.replace(/%$/, '')))) return false;
  if (!lightness.endsWith('%') && lightnessNum !== 0) return false;
  if (isNaN(parseFloat(lightness.replace(/%$/, '')))) return false;

  if (isAlpha && alpha) {
    const alphaStr = alpha as string;
    const alphaNum = parseFloat(alpha as string);
    if (alphaStr.endsWith('%')) {
      if (alphaNum > 100 || alphaNum < 0) return false;
    } else {
      if (alphaNum > 1 || alphaNum < 0) return false;
    }
  }

  return true;
};
