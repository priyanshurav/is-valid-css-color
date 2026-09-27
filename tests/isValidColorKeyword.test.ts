import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidColorKeyword } from '../src/isValidColorKeyword.js';

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
    });

    it('rejects empty or whitespace-only strings', () => {
      assert.equal(isValidColorKeyword(''), false);
      assert.equal(isValidColorKeyword(' '.repeat(3)), false);
      assert.equal(isValidColorKeyword('\t'), false);
    });

    it('rejects a zero-width space inside a keyword', () => {
      assert.equal(isValidColorKeyword('r\u200Bed'), false);
      assert.equal(isValidColorKeyword('re\u200Bd'), false);
    });

    it('rejects non-CSS whitespace characters', () => {
      assert.equal(isValidColorKeyword('\u{A0}red'), false);
      assert.equal(isValidColorKeyword('red\u{A0}'), false);
      assert.equal(isValidColorKeyword('\vred'), false);
      assert.equal(isValidColorKeyword('red\v'), false);
      assert.equal(isValidColorKeyword('\u{2028}red'), false);
      assert.equal(isValidColorKeyword('\u{2029}red'), false);
      assert.equal(isValidColorKeyword('\u{3000}red'), false);
      assert.equal(isValidColorKeyword('\u{FEFF}red'), false);
      assert.equal(isValidColorKeyword('re\u{A0}d'), false);
      assert.equal(isValidColorKeyword('\u{A0}'.repeat(3)), false);
    });

    it('rejects Unicode look-alikes of valid keywords', () => {
      assert.equal(isValidColorKeyword('blac\u212A'), false); // KELVIN SIGN instead of 'k' in "black"
      assert.equal(isValidColorKeyword('Blac\u212A'), false);
      assert.equal(isValidColorKeyword('pin\u212A'), false); // "pink"
      assert.equal(isValidColorKeyword('\u212Ahaki'), false); // "khaki"
      assert.equal(isValidColorKeyword('dar\u212Ared'), false); // "darkred"

      assert.equal(isValidColorKeyword('\u017Falmon'), false); // LONG S instead of 's' in "salmon"
      assert.equal(isValidColorKeyword('\u017Filver'), false); // "silver"
      assert.equal(isValidColorKeyword('\u017Feagreen'), false); // "seagreen"

      assert.equal(isValidColorKeyword('\u0130vory'), false); // dotted capital I instead of 'i' in "ivory"
      assert.equal(isValidColorKeyword('\uFF52\uFF45\uFF44'), false); // fullwidth "red"
      assert.equal(isValidColorKeyword('gr\u0430y'), false); // Cyrillic а instead of 'a' in "gray"
      assert.equal(isValidColorKeyword('g\u043Eld'), false); // Cyrillic о instead of 'o' in "gold"
      assert.equal(isValidColorKeyword('red\u0301'), false); // trailing combining accent
    });
  });
});
