interface RGBAColor {
  red: string;
  green: string;
  blue: string;
  alpha: string;
}

export const parseRGB = (rgbString: string): RGBAColor => {
  const csvString = rgbString.replace(/((rgba)|(rgb))|\(|\)|\s/g, '');
  const [red, green, blue, alpha] = csvString.split(',');
  return { red, green, blue, alpha: alpha ?? '' };
};
