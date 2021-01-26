import { isValidRGB } from '.';

test('should return false if wrong syntax', () => {
  expect(isValidRGB('(0,0,0,0)')).toBe(false);
  expect(isValidRGB('(0,0,0)')).toBe(false);
  expect(isValidRGB('0,0,0,0')).toBe(false);
  expect(isValidRGB('0,0,0')).toBe(false);
  expect(isValidRGB('0000')).toBe(false);
  expect(isValidRGB('000')).toBe(false);
  expect(isValidRGB('')).toBe(false);
  expect(isValidRGB('rgb(100%, 100,100%)')).toBe(false);
  expect(isValidRGB('rgba(100%, 100%,100, 60%)')).toBe(false);
  expect(isValidRGB('rgba(100, 100%,100, .8)')).toBe(false);
});

test('should return true if valid color', () => {
  expect(isValidRGB('rgba(35, 1,1)')).toBe(true);
  expect(isValidRGB('rgb(35, 1,1, 1)')).toBe(true);
  expect(isValidRGB('rgba(0,0,0,0)')).toBe(true);
  expect(isValidRGB('rgb(0,0,0)')).toBe(true);
  expect(isValidRGB('rgba(0, 0, 0, 0)')).toBe(true);
  expect(isValidRGB('rgb(0, 0, 0)')).toBe(true);
  expect(isValidRGB('rgba(23,44,43,1)')).toBe(true);
  expect(isValidRGB('rgb(54,45,43)')).toBe(true);
  expect(isValidRGB('rgba(32, 54, 34, .7)')).toBe(true);
  expect(isValidRGB('rgba(32, 54, 34, 0.5)')).toBe(true);
  expect(isValidRGB('rgb(2,4, 9)')).toBe(true);
  expect(isValidRGB('rgb(100%, 100%,100%)')).toBe(true);
  expect(isValidRGB('rgba(100%, 100%,100%, 60%)')).toBe(true);
  expect(isValidRGB('rgba(100, 100,100, .8)')).toBe(true);
  expect(isValidRGB('rgba(100, 100,100, 80%)')).toBe(true);
  expect(isValidRGB('rgb(1.1%, 2.1%,3.1%)')).toBe(true);
  expect(isValidRGB('rgba(1.1, 2.1,3.1, 6.0%)')).toBe(true);
  expect(isValidRGB('rgba(1, 1.1,1, .8)')).toBe(true);
});

test('should return false if invalid values', () => {
  expect(isValidRGB('rgb(,,)')).toBe(false);
  expect(isValidRGB('rgb(aa,sda,sagdf)')).toBe(false);
  expect(isValidRGB('rgba(aa,sda,sagdf,kjdh)')).toBe(false);
  expect(isValidRGB('rgba(,,,)')).toBe(false);
  expect(isValidRGB('rgb(300,264,7684)')).toBe(false);
  expect(isValidRGB('rgb(300%,264,7684)')).toBe(false);
  expect(isValidRGB('rgb(-300,-264,-7684)')).toBe(false);
  expect(isValidRGB('rgba(300,264,7684, 84)')).toBe(false);
  expect(isValidRGB('rgba(-300,-264,-7684, -1)')).toBe(false);
  expect(isValidRGB('rgba(300,264,7684, 8.4)')).toBe(false);
  expect(isValidRGB('rgba(-300,-264,-7684, -1.5)')).toBe(false);
  expect(isValidRGB('rgb(sd%,6%,g%)')).toBe(false);
  expect(isValidRGB('rgba(sd%,6%,g%, i%)')).toBe(false);
  expect(isValidRGB('rgba(100, 100,100, 80)')).toBe(false);
  expect(isValidRGB('rgba(100%, 100%,100%, 60)')).toBe(false);
  expect(isValidRGB('rgb(42%42, 45,45)')).toBe(false);
});

test('should return false if invalid hexadecimal', () => {
  expect(isValidRGB('#hhfd83749')).toBe(false);
  expect(isValidRGB('#dhje75')).toBe(false);
  expect(isValidRGB('#dhj')).toBe(false);
});

test('should return true if valid hexadecimal', () => {
  expect(isValidRGB('#000')).toBe(true);
  expect(isValidRGB('#fff')).toBe(true);
  expect(isValidRGB('#000000')).toBe(true);
  expect(isValidRGB('#ffffff')).toBe(true);
  expect(isValidRGB('#abc567')).toBe(true);
  expect(isValidRGB('#897935')).toBe(true);
});
