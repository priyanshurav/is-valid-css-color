interface HSLAColor {
  hue: string;
  saturation: string;
  lightness: string;
  alpha: string;
}

export const parseHSL = (hslString: string): HSLAColor => {
  const csvString = hslString.replace(/((hsla)|(hsl))|\(|\)|\s/g, '');
  const [hue, saturation, lightness, alpha] = csvString.split(',');
  return { hue, saturation, lightness, alpha: alpha ?? '' };
};
