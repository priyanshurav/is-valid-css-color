import { parseHSL } from './parseHSL';

test('should parse right values', () => {
  expect(parseHSL('hsl(1deg, 100%, 50%)')).toMatchObject({
    hue: '1deg',
    saturation: '100%',
    lightness: '50%',
  });
  expect(parseHSL('hsl(1rad, 100%, 50%)')).toMatchObject({
    hue: '1rad',
    saturation: '100%',
    lightness: '50%',
  });
  expect(parseHSL('hsl(1grad, 100%, 50%)')).toMatchObject({
    hue: '1grad',
    saturation: '100%',
    lightness: '50%',
  });
  expect(parseHSL('hsl(1turn, 100%, 50%)')).toMatchObject({
    hue: '1turn',
    saturation: '100%',
    lightness: '50%',
  });
  expect(parseHSL('hsla(1deg, 100%, 50%, 10%)')).toMatchObject({
    hue: '1deg',
    saturation: '100%',
    lightness: '50%',
    alpha: '10%',
  });
  expect(parseHSL('hsla(1deg, 100%, 50%, .1)')).toMatchObject({
    hue: '1deg',
    saturation: '100%',
    lightness: '50%',
    alpha: '.1',
  });
  expect(parseHSL('hsla(1deg, 100%, 50%, 0.1)')).toMatchObject({
    hue: '1deg',
    saturation: '100%',
    lightness: '50%',
    alpha: '0.1',
  });
  expect(parseHSL('hsla(,  , , )')).toMatchObject({
    hue: '',
    saturation: '',
    lightness: '',
    alpha: '',
  });
  expect(parseHSL('hsl(,  , )')).toMatchObject({
    hue: '',
    saturation: '',
    lightness: '',
    alpha: '',
  });
});
