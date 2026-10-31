import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidColorKeyword } from '../src/isValidColorKeyword.js';
import { CHARS } from './fixtures/chars.js';

describe('isValidColorKeyword()', () => {
  describe('CSS Color Level 4: Named Colors', () => {
    it('validates basic CSS colors', () => {
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
      assert.equal(isValidColorKeyword('    cornflowerblue    '), true);
    });

    it('tolerates all CSS whitespace characters', () => {
      assert.equal(isValidColorKeyword('\tred'), true);
      assert.equal(isValidColorKeyword('\nred'), true);
      assert.equal(isValidColorKeyword('\rred'), true);
      assert.equal(isValidColorKeyword('\fred'), true);
      assert.equal(isValidColorKeyword('\t\n\r\f red \t\n\r\f'), true);
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
      assert.equal(isValidColorKeyword('red b(7)'), false);
      assert.equal(isValidColorKeyword('redb(7)'), false);
    });

    it('rejects empty or whitespace-only strings', () => {
      assert.equal(isValidColorKeyword(''), false);
      assert.equal(isValidColorKeyword(' '.repeat(3)), false);
      assert.equal(isValidColorKeyword('\t'), false);
    });

    it('rejects a zero-width space inside a keyword', () => {
      const { ZERO_WIDTH_SPACE } = CHARS.INVISIBLE;
      assert.equal(isValidColorKeyword(`r${ZERO_WIDTH_SPACE}ed`), false);
      assert.equal(isValidColorKeyword(`re${ZERO_WIDTH_SPACE}d`), false);
    });

    it('rejects strings longer than any valid keyword', () => {
      assert.equal(isValidColorKeyword('lightgoldenrodyellowx'), false);
      assert.equal(isValidColorKeyword('  lightgoldenrodyellowx  '), false);
      assert.equal(isValidColorKeyword('a'.repeat(21)), false);
      assert.equal(isValidColorKeyword('red'.repeat(100)), false);
    });

    it('rejects non-CSS whitespace characters', () => {
      const { NO_BREAK_SPACE, LINE_SEPARATOR, PARAGRAPH_SEPARATOR, IDEOGRAPHIC_SPACE, BYTE_ORDER_MARK } =
        CHARS.PRESERVED_WHITESPACE;

      assert.equal(isValidColorKeyword(`${NO_BREAK_SPACE}red`), false);
      assert.equal(isValidColorKeyword(`red${NO_BREAK_SPACE}`), false);
      assert.equal(isValidColorKeyword('\vred'), false);
      assert.equal(isValidColorKeyword('red\v'), false);
      assert.equal(isValidColorKeyword(`${LINE_SEPARATOR}red`), false);
      assert.equal(isValidColorKeyword(`${PARAGRAPH_SEPARATOR}red`), false);
      assert.equal(isValidColorKeyword(`${IDEOGRAPHIC_SPACE}red`), false);
      assert.equal(isValidColorKeyword(`${BYTE_ORDER_MARK}red`), false);
      assert.equal(isValidColorKeyword(`re${NO_BREAK_SPACE}d`), false);
      assert.equal(isValidColorKeyword(NO_BREAK_SPACE.repeat(3)), false);
    });

    it('rejects Unicode look-alikes of valid keywords', () => {
      const {
        KELVIN_SIGN,
        LONG_S,
        DOTTED_CAPITAL_I,
        CYRILLIC_SMALL_A,
        CYRILLIC_SMALL_O,
        FULL_WIDTH_R,
        FULL_WIDTH_E,
        FULL_WIDTH_D,
      } = CHARS.LOOKALIKES;
      const { COMBINING_ACUTE } = CHARS.COMBINING_MARKS;
      const fullWidthRed = `${FULL_WIDTH_R}${FULL_WIDTH_E}${FULL_WIDTH_D}` as const;

      assert.equal(isValidColorKeyword(`blac${KELVIN_SIGN}`), false);
      assert.equal(isValidColorKeyword(`Blac${KELVIN_SIGN}`), false);
      assert.equal(isValidColorKeyword(`pin${KELVIN_SIGN}`), false);
      assert.equal(isValidColorKeyword(`${KELVIN_SIGN}haki`), false);
      assert.equal(isValidColorKeyword(`dar${KELVIN_SIGN}red`), false);

      assert.equal(isValidColorKeyword(`${LONG_S}almon`), false);
      assert.equal(isValidColorKeyword(`${LONG_S}ilver`), false);
      assert.equal(isValidColorKeyword(`${LONG_S}eagreen`), false);

      assert.equal(isValidColorKeyword(`${DOTTED_CAPITAL_I}vory`), false);
      assert.equal(isValidColorKeyword(fullWidthRed), false);
      assert.equal(isValidColorKeyword(`gr${CYRILLIC_SMALL_A}y`), false);
      assert.equal(isValidColorKeyword(`g${CYRILLIC_SMALL_O}ld`), false);
      assert.equal(isValidColorKeyword(`red${COMBINING_ACUTE}`), false);
    });
  });
});
