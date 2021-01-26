export const validateHexRGB = (rgbString: string): boolean => {
  if (!rgbString.startsWith('#')) return false;

  // Convert the hex color string to uppercase and remove the hash symbol
  rgbString = rgbString.toUpperCase().slice(1);

  if (rgbString.length !== 6 && rgbString.length !== 3) return false;
  const areAllValuesValidHex = [...rgbString].every(
    (s) => s.search(/[0-9A-F]/g) !== -1
  );
  if (!areAllValuesValidHex) return false;
  return true;
};
