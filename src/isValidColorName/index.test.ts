import { isValidColorName } from '.';

test('should return false if invalid value', () => {
  expect(isValidColorName('')).toBe(false);
  expect(isValidColorName('kjsdhdfsj')).toBe(false);
});

test('should return true if valid color', () => {
  expect(isValidColorName('blue')).toBe(true);
  expect(isValidColorName('BLUE')).toBe(true);
  expect(isValidColorName('BlUe')).toBe(true);
});
