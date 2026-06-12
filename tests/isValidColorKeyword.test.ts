import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidColorKeyword } from '../src/isValidColorKeyword.js';

describe('isValidColorKeyword()', () => {
  describe('CSS Color Level 4: Named Colors', () => {
    it('validates the 16 basic CSS colors', () => {
      assert.equal(isValidColorKeyword('black'), true);
      assert.equal(isValidColorKeyword('silver'), true);
      assert.equal(isValidColorKeyword('gray'), true);
      assert.equal(isValidColorKeyword('white'), true);
      assert.equal(isValidColorKeyword('maroon'), true);
      assert.equal(isValidColorKeyword('red'), true);
      assert.equal(isValidColorKeyword('purple'), true);
      assert.equal(isValidColorKeyword('green'), true);
      assert.equal(isValidColorKeyword('lime'), true);
      assert.equal(isValidColorKeyword('olive'), true);
      assert.equal(isValidColorKeyword('yellow'), true);
      assert.equal(isValidColorKeyword('navy'), true);
      assert.equal(isValidColorKeyword('blue'), true);
      assert.equal(isValidColorKeyword('teal'), true);
      assert.equal(isValidColorKeyword('aqua'), true);
      assert.equal(isValidColorKeyword('orange'), true);
    });

    it('validates extended named colors', () => {
      assert.equal(isValidColorKeyword('aliceblue'), true);
      assert.equal(isValidColorKeyword('cornflowerblue'), true);
      assert.equal(isValidColorKeyword('lightgoldenrodyellow'), true);
      assert.equal(isValidColorKeyword('mediumspringgreen'), true);
      assert.equal(isValidColorKeyword('rebeccapurple'), true);
      assert.equal(isValidColorKeyword('transparent'), true);
      assert.equal(isValidColorKeyword('currentcolor'), true);
    });

    it('validates grey as an alias for gray', () => {
      assert.equal(isValidColorKeyword('grey'), true);
    });

    it('validates fuchsia as an alias for magenta', () => {
      assert.equal(isValidColorKeyword('fuchsia'), true);
      assert.equal(isValidColorKeyword('magenta'), true);
    });
  });

  describe('CSS Color Level 4: System Colors', () => {
    it('validates modern system colors', () => {
      assert.equal(isValidColorKeyword('canvas'), true);
      assert.equal(isValidColorKeyword('accentcolor'), true);
      assert.equal(isValidColorKeyword('accentcolortext'), true);
      assert.equal(isValidColorKeyword('highlight'), true);
    });

    it('validates deprecated system colors', () => {
      assert.equal(isValidColorKeyword('activecaption'), true);
      assert.equal(isValidColorKeyword('threeddarkshadow'), true);
      assert.equal(isValidColorKeyword('threedlightshadow'), true);
      assert.equal(isValidColorKeyword('inactivecaptiontext'), true);
    });

    it('validates system colors case-insensitively', () => {
      assert.equal(isValidColorKeyword('Canvas'), true);
      assert.equal(isValidColorKeyword('ButtonFace'), true);
      assert.equal(isValidColorKeyword('ActiveCaption'), true);
    });
  });

  describe('Formatting and Edge Cases', () => {
    it('is case-insensitive', () => {
      assert.equal(isValidColorKeyword('RED'), true);
      assert.equal(isValidColorKeyword('WHITE'), true);
      assert.equal(isValidColorKeyword('REBECCAPURPLE'), true);
      assert.equal(isValidColorKeyword('Red'), true);
      assert.equal(isValidColorKeyword('AliceBlue'), true);
      assert.equal(isValidColorKeyword('CornflowerBlue'), true);
      assert.equal(isValidColorKeyword('rEbEcCaPuRpLe'), true);
    });

    it('tolerates surrounding whitespace', () => {
      assert.equal(isValidColorKeyword(' red'), true);
      assert.equal(isValidColorKeyword('red '), true);
      assert.equal(isValidColorKeyword(' red '), true);
      assert.equal(isValidColorKeyword(' cornflowerblue '), true);
    });
  });

  describe('Invalid Syntax (Rejections)', () => {
    it('rejects close misspellings of real color names', () => {
      assert.equal(isValidColorKeyword('blak'), false);
      assert.equal(isValidColorKeyword('whit'), false);
      assert.equal(isValidColorKeyword('purpel'), false);
      assert.equal(isValidColorKeyword('rebeccapurpl'), false);
    });

    it('rejects hex color strings', () => {
      assert.equal(isValidColorKeyword('#fff'), false);
      assert.equal(isValidColorKeyword('#ff0000'), false);
    });

    it('rejects color function strings', () => {
      assert.equal(isValidColorKeyword('rgb(255, 0, 0)'), false);
      assert.equal(isValidColorKeyword('hsl(120, 100%, 50%)'), false);
      assert.equal(isValidColorKeyword('oklch(0.5 0.2 120)'), false);
    });

    it('rejects empty or whitespace-only strings', () => {
      assert.equal(isValidColorKeyword(''), false);
      assert.equal(isValidColorKeyword('   '), false);
      assert.equal(isValidColorKeyword('\t'), false);
    });
  });

  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidColorKeyword(null as unknown as string), false);
      assert.equal(isValidColorKeyword(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidColorKeyword(0 as unknown as string), false);
      assert.equal(isValidColorKeyword(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidColorKeyword({} as unknown as string), false);
      assert.equal(isValidColorKeyword([] as unknown as string), false);
    });
  });
});
