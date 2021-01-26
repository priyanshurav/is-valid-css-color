import { isValidHSL } from '.';

test('should return false if wrong syntax', () => {
  expect(isValidHSL('(0,0,0,0)')).toBe(false);
  expect(isValidHSL('hsl(,,,)')).toBe(false);
  expect(isValidHSL('hsla(,,)')).toBe(false);
  expect(isValidHSL('0,0,0,0')).toBe(false);
  expect(isValidHSL('0,0,0')).toBe(false);
  expect(isValidHSL('0000')).toBe(false);
  expect(isValidHSL('000')).toBe(false);
  expect(isValidHSL('')).toBe(false);
});

test('should return false if invalid values', () => {
  expect(isValidHSL('hsla(ksldfh, kjef,kjd, hsa)')).toBe(false);
  expect(isValidHSL('hsl(ksldfh, 78%,87%)')).toBe(false);
  expect(isValidHSL('hsla(ksldfhdeg, kjef%,kjd%, hsa%)')).toBe(false);
  expect(isValidHSL('hsla(ksldfhdeg, kjef%,kjd%, hsa%)')).toBe(false);
  expect(isValidHSL('hsl(ksldfhdeg, kjef%,kjd%)')).toBe(false);
  expect(isValidHSL('hsl(ksldfhdeg, 87%,kjd%)')).toBe(false);
  expect(isValidHSL('hsl(ksldfhdeg, 87%,87%)')).toBe(false);
  expect(isValidHSL('hsl(, ,)')).toBe(false);
  expect(isValidHSL('hsla(, ,,)')).toBe(false);
  expect(isValidHSL('hsl(101deg,101% ,837%)')).toBe(false);
  expect(isValidHSL('hsl(-1deg,-234987% ,-9873%)')).toBe(false);
  expect(isValidHSL('hsla(101deg,101% ,837%, 23489)')).toBe(false);
  expect(isValidHSL('hsla(-1deg,-234987% ,-9873%, 897243%)')).toBe(false);
  expect(isValidHSL('hsla(101deg,101% ,837%, -23489)')).toBe(false);
  expect(isValidHSL('hsla(-1deg,-234987% ,-9873%, -897243%)')).toBe(false);
  expect(isValidHSL('hsla(100, 100,100, 80)')).toBe(false);
  expect(isValidHSL('hsla(100%, 100%,100%, 60)')).toBe(false);
  expect(isValidHSL('hsl(-300deg,-264%,-7684%)')).toBe(false);
  expect(isValidHSL('hsla(300deg,264%,7684%, 84)')).toBe(false);
  expect(isValidHSL('hsla(-300deg,-264%,-7684%, -1)')).toBe(false);
  expect(isValidHSL('hsla(300deg,264%,7684%, 8.4)')).toBe(false);
  expect(isValidHSL('hsla(-300deg,-264%,-7684%, -1.5)')).toBe(false);
  expect(isValidHSL('hsl(0, 100, 100)')).toBe(false);
});

test('should return true if valid color', () => {
  expect(isValidHSL('hsla(35, 1%,1%)')).toBe(true);
  expect(isValidHSL('hsl(35, 1%,1%, 1)')).toBe(true);
  expect(isValidHSL('hsl(360deg, 100%, 100%)')).toBe(true);
  expect(isValidHSL('hsl(0, 0, 0)')).toBe(true);
  expect(isValidHSL('hsla(0, 0, 0,0)')).toBe(true);
  expect(isValidHSL('hsl(0%, 0%, 0%)')).toBe(true);
  expect(isValidHSL('hsla(0%, 0%, 0%,0%)')).toBe(true);
  expect(isValidHSL('hsl(0deg, 100%, 100%)')).toBe(true);
  expect(isValidHSL('hsla(0deg, 100%, 100%, 1)')).toBe(true);
  expect(isValidHSL('hsla(0, 100%, 100%, 1)')).toBe(true);
  expect(isValidHSL('hsla(0, 100%, 100%, 1)')).toBe(true);
  expect(isValidHSL('hsl(0, 100%, 100%)')).toBe(true);
  expect(isValidHSL('hsla(0deg, 100%, 100%, 100%)')).toBe(true);
  expect(isValidHSL('hsla(1.1deg, 2.1%,3.1%, 6.0%)')).toBe(true);
  expect(isValidHSL('hsla(1deg, 1.1%,1%, .8)')).toBe(true);
  expect(isValidHSL('hsla(1deg, 1.1%,1%, 1.0)')).toBe(true);
  expect(isValidHSL('hsl(42,50%,50%)')).toBe(true);
});
