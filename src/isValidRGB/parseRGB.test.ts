import { parseRGB } from './parseRGB';

test('should parse right values', () => {
  expect(parseRGB('rgb(245, 235, 100)')).toMatchObject({
    red: '245',
    green: '235',
    blue: '100',
    alpha: '',
  });
  expect(parseRGB('rgba(245, 235, 100, 0.9)')).toMatchObject({
    red: '245',
    green: '235',
    blue: '100',
    alpha: '0.9',
  });
  expect(parseRGB('rgb(245%, 235%, 100%)')).toMatchObject({
    red: '245%',
    green: '235%',
    blue: '100%',
    alpha: '',
  });
  expect(parseRGB('rgba(245%, 235%, 100%, 90%)')).toMatchObject({
    red: '245%',
    green: '235%',
    blue: '100%',
    alpha: '90%',
  });
  expect(parseRGB('rgba(,  , , )')).toMatchObject({
    red: '',
    green: '',
    blue: '',
    alpha: '',
  });
  expect(parseRGB('rgb(,  , )')).toMatchObject({
    red: '',
    green: '',
    blue: '',
    alpha: '',
  });
});
