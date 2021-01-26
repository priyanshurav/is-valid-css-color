import { parseRGB } from './parseRGB';

export const validateFunctionalRGB = (rgbString: string): boolean => {
  const csvLength = rgbString.replace(/((rgba)|(rgb))|\(|\)|\s/g, '').split(',')
    .length;

  const isAlpha = rgbString.startsWith('rgba(');

  const isCSVLengthValid = csvLength === 3 || csvLength === 4;
  if (
    !rgbString.startsWith(isAlpha ? 'rgba(' : 'rgb(') ||
    !rgbString.endsWith(')') ||
    !isCSVLengthValid
  )
    return false;
  const parsedRGBA = parseRGB(rgbString);
  const red = parseFloat(parsedRGBA.red);
  const green = parseFloat(parsedRGBA.green);
  const blue = parseFloat(parsedRGBA.blue);
  const colorValuesStr = [parsedRGBA.red, parsedRGBA.green, parsedRGBA.blue];
  const areAllColorValuesInPercentage = colorValuesStr.every((c) =>
    c.endsWith('%')
  );
  const areAllColorValuesInNumber = colorValuesStr.every(
    // This line of code tests if the whole string is a valid number
    (c) => c.match(/[0-9]|\./g)?.length === c.length
  );

  if (!areAllColorValuesInNumber && !areAllColorValuesInPercentage)
    return false;

  if (areAllColorValuesInPercentage) {
    const isRedValid = !isNaN(red) && red >= 0 && red <= 100;
    const isGreenValid = !isNaN(green) && green >= 0 && green <= 100;
    const isBlueValid = !isNaN(blue) && blue >= 0 && blue <= 100;
    if (!isRedValid || !isGreenValid || !isBlueValid) return false;
  } else if (areAllColorValuesInNumber) {
    const isRedValid = !isNaN(red) && red >= 0 && red <= 255;
    const isGreenValid = !isNaN(green) && green >= 0 && green <= 255;
    const isBlueValid = !isNaN(blue) && blue >= 0 && blue <= 255;
    if (!isRedValid || !isGreenValid || !isBlueValid) return false;
  } else {
    return false;
  }
  if (isAlpha && parsedRGBA.alpha) {
    const alpha = parseFloat(parsedRGBA.alpha as string);
    if (isNaN(alpha)) return false;
    if (parsedRGBA.alpha?.endsWith('%')) {
      if (alpha < 0 || alpha > 100) return false;
    }
    if (!parsedRGBA.alpha?.endsWith('%')) {
      if (alpha > 1 || alpha < 0) return false;
    }
  }
  return true;
};
