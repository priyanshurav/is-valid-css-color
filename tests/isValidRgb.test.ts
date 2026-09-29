import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidRgb } from '../src/isValidRgb.js';

describe('isValidRgb()', () => {
  describe('CSS Color Level 3: Legacy Comma-separated Syntax', () => {
    it('validates basic rgb() with integers', () => {
      assert.equal(isValidRgb('rgb(0, 0, 0)'), true);
      assert.equal(isValidRgb('rgb(255, 255, 255)'), true);
    });

    it('validates basic rgba() with alpha', () => {
      assert.equal(isValidRgb('rgba(0, 0, 0, 0)'), true);
      assert.equal(isValidRgb('rgba(255, 255, 255, 1)'), true);
      assert.equal(isValidRgb('rgba(255, 255, 255, 0.5)'), true);
      assert.equal(isValidRgb('rgba(255, 255, 255, .5)'), true);
    });

    it('validates percentage values', () => {
      assert.equal(isValidRgb('rgb(100%, 100%, 100%)'), true);
      assert.equal(isValidRgb('rgba(100%, 50%, 0%, 0.5)'), true);
      assert.equal(isValidRgb('rgba(100%, 50%, 0%, 50%)'), true);
    });

    it('validates rgb() with alpha values', () => {
      assert.equal(isValidRgb('rgb(255, 0, 0, 0.5)'), true);
      assert.equal(isValidRgb('rgb(255, 0, 0, 50%)'), true);
      assert.equal(isValidRgb('rgb(255, 0, 0, 150%)'), true);
      assert.equal(isValidRgb('rgb(0, 0, 0, -20%)'), true);
    });
  });

  describe('CSS Color Level 4: Space-separated Syntax', () => {
    it('validates space-separated rgb() and rgba() without alpha', () => {
      assert.equal(isValidRgb('rgb(0 0 0)'), true);
      assert.equal(isValidRgb('rgb(255 255 255)'), true);
      assert.equal(isValidRgb('rgba(0 0 0)'), true);
    });

    it('validates space-separated syntax with slash-separated alpha', () => {
      assert.equal(isValidRgb('rgb(255 255 255 / 1)'), true);
      assert.equal(isValidRgb('rgba(255 255 255 / 0.5)'), true);
      assert.equal(isValidRgb('rgb(0 0 0 / .5)'), true);
      assert.equal(isValidRgb('rgb(0 128 255 / 1.0)'), true);
    });

    it('validates space-separated percentage values', () => {
      assert.equal(isValidRgb('rgb(100% 50% 0%)'), true);
      assert.equal(isValidRgb('rgba(100% 50% 0% / 50%)'), true);
    });

    it('validates mixing numbers and percentages (Modern syntax allows mixing)', () => {
      assert.equal(isValidRgb('rgb(0 100% 0)'), true);
      assert.equal(isValidRgb('rgba(255 50% 128 / 0.5)'), true);
    });

    it('validates the "none" keyword', () => {
      assert.equal(isValidRgb('rgb(none none none)'), true);
      assert.equal(isValidRgb('rgb(none 0 0)'), true);
      assert.equal(isValidRgb('rgb(255 none 0)'), true);
      assert.equal(isValidRgb('rgb(255 0 none / none)'), true);
      assert.equal(isValidRgb('rgb(255 0 0 / none)'), true);
    });

    it('validates positive sign prefix', () => {
      assert.equal(isValidRgb('rgb(+255 +0 +0)'), true);
      assert.equal(isValidRgb('rgb(+100% +50% +0%)'), true);
      assert.equal(isValidRgb('rgba(+255 +255 +255 / +1)'), true);
    });
  });

  describe('Formatting and Edge Cases', () => {
    it('validates decimal and scientific notation', () => {
      assert.equal(isValidRgb('rgb(255.5, 0, 0)'), true);
      assert.equal(isValidRgb('rgb(1e2, 2e1, 3e0)'), true);
      assert.equal(isValidRgb('rgb(1E2, 2E1, 3E0)'), true);
      assert.equal(isValidRgb('rgb(+1e2, -2e1, 3e0)'), true);
      assert.equal(isValidRgb('rgb(+1e2 +2e1 +3e0 / -1.5e0)'), true);
    });

    it('validates exponential numbers without an explicit integer mantissa', () => {
      assert.equal(isValidRgb('rgb(.5e2, .2e1, .3e1)'), true);
      assert.equal(isValidRgb('rgb(-.5e-2 100 100)'), true);
      assert.equal(isValidRgb('rgb(0 0 0 / .5e0)'), true);
    });

    it('validates negative zero', () => {
      assert.equal(isValidRgb('rgb(-0, -0, -0)'), true);
      assert.equal(isValidRgb('rgb(-0% -0% -0%)'), true);
      assert.equal(isValidRgb('rgb(-0 -0 -0 / -0)'), true);
    });

    it('validates out-of-bounds values', () => {
      assert.equal(isValidRgb('rgb(300, -10, 0)'), true);
      assert.equal(isValidRgb('rgb(300, -10, 500)'), true);
      assert.equal(isValidRgb('rgb(300% -10% 500%)'), true);
      assert.equal(isValidRgb('rgb(0 0 0 / 150%)'), true);
      assert.equal(isValidRgb('rgb(0 0 0 / -20%)'), true);
      assert.equal(isValidRgb('rgb(0 0 0 / 1.5)'), true);
      assert.equal(isValidRgb('rgb(0 0 0 / -0.5)'), true);
    });

    it('tolerates extreme whitespace', () => {
      assert.equal(isValidRgb('rgb(0,0,0)'), true);
      assert.equal(isValidRgb('rgb(  255  ,  255  ,  255  )'), true);
      assert.equal(isValidRgb('rgb(  255   255   255  /  0.5  )'), true);
      assert.equal(isValidRgb('  rgb(255, 0, 0)  '), true);
      assert.equal(isValidRgb('  rgb(255 0 0 / 0.5)  '), true);
      assert.equal(isValidRgb('rgb(\t255\n255\r255\t/\t0.5)'), true);
      assert.equal(isValidRgb('rgb(\f255\f255\f255\f/\f0.5\f)'), true);
    });

    it('is case-insensitive', () => {
      assert.equal(isValidRgb('RGB(255, 255, 255)'), true);
      assert.equal(isValidRgb('rGbA(0, 0, 0, 1)'), true);
    });
  });

  describe('Whitespace-free separators (token boundaries)', () => {
    it('validates channels separated only by a percent sign', () => {
      assert.equal(isValidRgb('rgb(1%2%3%)'), true);
      assert.equal(isValidRgb('rgba(1%2%3%)'), true);
    });

    it('validates a slash-separated alpha directly after the last channel', () => {
      assert.equal(isValidRgb('rgb(1%2%3%/0.5)'), true);
      assert.equal(isValidRgb('rgb(1%2%3%/none)'), true);
    });

    it('validates a percent sign directly followed by a number, sign or decimal point', () => {
      assert.equal(isValidRgb('rgb(1%2 3)'), true);
      assert.equal(isValidRgb('rgb(1%.5%3%)'), true);
      assert.equal(isValidRgb('rgb(1%-2%3%)'), true);
    });

    it('validates a percent sign directly followed by none', () => {
      assert.equal(isValidRgb('rgb(1%none 3%)'), true);
    });

    it('validates adjacent numbers separated only by a sign', () => {
      assert.equal(isValidRgb('rgb(1+2+3)'), true);
      assert.equal(isValidRgb('rgb(1-2%3)'), true);
    });

    it('validates adjacent decimal numbers with no separator', () => {
      assert.equal(isValidRgb('rgb(1.5.5.5)'), true);
    });

    it('validates none directly followed by a sign or decimal point', () => {
      assert.equal(isValidRgb('rgb(none+1+2)'), true);
      assert.equal(isValidRgb('rgb(none.5.5)'), true);
    });

    it('rejects glued tokens that merge into a single token', () => {
      assert.equal(isValidRgb('rgb(1none 2 3)'), false);
      assert.equal(isValidRgb('rgb(none1 2 3)'), false);
      assert.equal(isValidRgb('rgb(none-1 2 3)'), false);
      assert.equal(isValidRgb('rgb(1%%2%3%)'), false);
    });

    it('rejects glued input that still violates the grammar', () => {
      assert.equal(isValidRgb('rgb(1%2%3%4%)'), false);
      assert.equal(isValidRgb('rgb(1%2%3%//4%)'), false);
      assert.equal(isValidRgb('rgb(1%2%3% 0.5)'), false);
      assert.equal(isValidRgb('rgb(1%,2%3%)'), false);
    });
  });

  describe('Invalid Syntax (Rejections)', () => {
    it('rejects missing arguments', () => {
      assert.equal(isValidRgb('rgb'), false);
      assert.equal(isValidRgb('rgb()'), false);
      assert.equal(isValidRgb('rgb(255)'), false);
      assert.equal(isValidRgb('rgb(255, 255)'), false);
    });

    it('rejects excessive arguments and multiple slashes', () => {
      assert.equal(isValidRgb('rgb(255, 255, 255, 1, 1)'), false);
      assert.equal(isValidRgb('rgb(255 / 255 / 255)'), false);
    });

    it('rejects mixed syntaxes (comma and space)', () => {
      assert.equal(isValidRgb('rgb(255 255, 255)'), false);
      assert.equal(isValidRgb('rgb(255, 255 255)'), false);
      assert.equal(isValidRgb('rgb(255, 255, 255 / 1)'), false);
      assert.equal(isValidRgb('rgb(255 255 255 , 1)'), false);
      assert.equal(isValidRgb('rgb(none, none none)'), false);
    });

    it('rejects mixing numbers and percentages in legacy syntax', () => {
      assert.equal(isValidRgb('rgb(100%, 255, 0)'), false);
      assert.equal(isValidRgb('rgb(0, 100%, 0)'), false);
    });

    it('rejects malformed syntax and missing parentheses', () => {
      assert.equal(isValidRgb('rgb(255, 0, 0'), false);
      assert.equal(isValidRgb('(255, 0, 0)'), false);
      assert.equal(isValidRgb('rgb(255, 0, 0;)'), false);
      assert.equal(isValidRgb('rgb(255 255 255 /)'), false);
      assert.equal(isValidRgb('rgb (255, 0, 0)'), false);
      assert.equal(isValidRgb('rgba (255, 0, 0, 0.5)'), false);
      assert.equal(isValidRgb('rgb (255 0 0)'), false);
    });

    it('rejects incorrect function names', () => {
      assert.equal(isValidRgb('hex(255, 0, 0)'), false);
    });

    it('rejects invalid units and characters', () => {
      assert.equal(isValidRgb('rgb(#fff)'), false);
      assert.equal(isValidRgb('rgb(foo, bar, baz)'), false);
    });

    it('rejects empty strings', () => {
      assert.equal(isValidRgb(''), false);
    });

    it('rejects extra text surrounding valid rgb()', () => {
      assert.equal(isValidRgb('rgb(255, 0, 0) extra'), false);
      assert.equal(isValidRgb('extra rgb(255, 0, 0)'), false);
    });

    it('rejects invalid number formats', () => {
      assert.equal(isValidRgb('rgb(255.5.5, 0, 0)'), false);
      assert.equal(isValidRgb('rgb(1. 0 0)'), false);
      assert.equal(isValidRgb('rgb(1e 0 0)'), false);
      assert.equal(isValidRgb('rgb(+ 0 0)'), false);
    });

    it('rejects channels fused together with no separator', () => {
      assert.equal(isValidRgb('rgb(2550128)'), false);
    });

    it('rejects a nested rgb() as a channel value', () => {
      assert.equal(isValidRgb('rgb(rgb(0,0,0))'), false);
    });

    it('rejects "none" in legacy comma-separated syntax', () => {
      assert.equal(isValidRgb('rgb(none, none, none)'), false);
      assert.equal(isValidRgb('rgb(none, 0, 0)'), false);
      assert.equal(isValidRgb('rgb(255, none, 0)'), false);
      assert.equal(isValidRgb('rgba(none, none, none, none)'), false);
      assert.equal(isValidRgb('rgba(255, 255, 255, none)'), false);
    });

    it('rejects non-CSS whitespace characters', () => {
      assert.equal(isValidRgb('rgb(255\u{A0}255\u{A0}255)'), false);
      assert.equal(isValidRgb('rgb(255\v255\v255)'), false);
      assert.equal(isValidRgb('rgb(255\u{2028}255\u{2028}255)'), false);
      assert.equal(isValidRgb('rgb(255\u{3000}255\u{3000}255)'), false);
      assert.equal(isValidRgb('\u{A0}rgb(255 255 255)'), false);
      assert.equal(isValidRgb('rgb(255 255 255)\u{A0}'), false);
      assert.equal(isValidRgb('rgb(255 255 255\u{A0}/ 0.5)'), false);
      assert.equal(isValidRgb('rgb(\u{FEFF}255 255 255)'), false);
    });
  });
});
