import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidColorName } from '../src/isValidColorName.js';

describe('isValidColorName()', () => {
  describe('CSS Color Level 4: Named Colors', () => {
    it('validates the 16 basic CSS colors', () => {
      assert.equal(isValidColorName('black'), true);
      assert.equal(isValidColorName('silver'), true);
      assert.equal(isValidColorName('gray'), true);
      assert.equal(isValidColorName('white'), true);
      assert.equal(isValidColorName('maroon'), true);
      assert.equal(isValidColorName('red'), true);
      assert.equal(isValidColorName('purple'), true);
      assert.equal(isValidColorName('green'), true);
      assert.equal(isValidColorName('lime'), true);
      assert.equal(isValidColorName('olive'), true);
      assert.equal(isValidColorName('yellow'), true);
      assert.equal(isValidColorName('navy'), true);
      assert.equal(isValidColorName('blue'), true);
      assert.equal(isValidColorName('teal'), true);
      assert.equal(isValidColorName('aqua'), true);
      assert.equal(isValidColorName('orange'), true);
    });

    it('validates extended named colors', () => {
      assert.equal(isValidColorName('aliceblue'), true);
      assert.equal(isValidColorName('cornflowerblue'), true);
      assert.equal(isValidColorName('lightgoldenrodyellow'), true);
      assert.equal(isValidColorName('mediumspringgreen'), true);
      assert.equal(isValidColorName('rebeccapurple'), true);
      assert.equal(isValidColorName('transparent'), true);
      assert.equal(isValidColorName('currentcolor'), true);
    });

    it('validates grey as an alias for gray', () => {
      assert.equal(isValidColorName('grey'), true);
    });

    it('validates fuchsia as an alias for magenta', () => {
      assert.equal(isValidColorName('fuchsia'), true);
      assert.equal(isValidColorName('magenta'), true);
    });
  });

  describe('Formatting and Edge Cases', () => {
    it('is case-insensitive', () => {
      assert.equal(isValidColorName('RED'), true);
      assert.equal(isValidColorName('WHITE'), true);
      assert.equal(isValidColorName('REBECCAPURPLE'), true);
      assert.equal(isValidColorName('Red'), true);
      assert.equal(isValidColorName('AliceBlue'), true);
      assert.equal(isValidColorName('CornflowerBlue'), true);
      assert.equal(isValidColorName('rEbEcCaPuRpLe'), true);
    });

    it('tolerates surrounding whitespace', () => {
      assert.equal(isValidColorName(' red'), true);
      assert.equal(isValidColorName('red '), true);
      assert.equal(isValidColorName(' red '), true);
      assert.equal(isValidColorName(' cornflowerblue '), true);
    });
  });

  describe('Invalid Syntax (Rejections)', () => {
    it('rejects close misspellings of real color names', () => {
      assert.equal(isValidColorName('blak'), false);
      assert.equal(isValidColorName('whit'), false);
      assert.equal(isValidColorName('purpel'), false);
      assert.equal(isValidColorName('rebeccapurpl'), false);
    });

    it('rejects hex color strings', () => {
      assert.equal(isValidColorName('#fff'), false);
      assert.equal(isValidColorName('#ff0000'), false);
    });

    it('rejects color function strings', () => {
      assert.equal(isValidColorName('rgb(255, 0, 0)'), false);
      assert.equal(isValidColorName('hsl(120, 100%, 50%)'), false);
      assert.equal(isValidColorName('oklch(0.5 0.2 120)'), false);
    });

    it('rejects empty or whitespace-only strings', () => {
      assert.equal(isValidColorName(''), false);
      assert.equal(isValidColorName('   '), false);
      assert.equal(isValidColorName('\t'), false);
    });
  });

  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidColorName(null as unknown as string), false);
      assert.equal(isValidColorName(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidColorName(0 as unknown as string), false);
      assert.equal(isValidColorName(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidColorName({} as unknown as string), false);
      assert.equal(isValidColorName([] as unknown as string), false);
    });
  });
});
