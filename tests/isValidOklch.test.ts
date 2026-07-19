import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidOklch } from '../src/isValidOklch.js';

describe('isValidOklch()', () => {
  describe('CSS Color Level 4: Space-separated OKLCH Syntax', () => {
    it('validates basic space-separated numerical values', () => {
      assert.equal(isValidOklch('oklch(0.5 0.2 120)'), true);
      assert.equal(isValidOklch('oklch(1 0.4 360)'), true);
      assert.equal(isValidOklch('oklch(0 0 0)'), true);
    });

    it('validates percentages for lightness and chroma', () => {
      assert.equal(isValidOklch('oklch(50% 20% 120)'), true);
      assert.equal(isValidOklch('oklch(100% 0% 0)'), true);
      assert.equal(isValidOklch('oklch(0% 100% 360)'), true);
      assert.equal(isValidOklch('oklch(50% 0.2 120)'), true);
      assert.equal(isValidOklch('oklch(0.5 20% 120)'), true);
    });

    it('validates various angle units for hue', () => {
      assert.equal(isValidOklch('oklch(0.5 0.2 120deg)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 1.5rad)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 100grad)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 0.5turn)'), true);
    });

    it('validates alpha channels (numbers and percentages)', () => {
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / 0.5)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / 50%)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / 1)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / 0)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / 150%)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / -20%)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / 1.5)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / -0.5)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / 1.0)'), true);
    });

    it('validates the "none" keyword', () => {
      assert.equal(isValidOklch('oklch(none 0.2 120)'), true);
      assert.equal(isValidOklch('oklch(0.5 none 120)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 none)'), true);
      assert.equal(isValidOklch('oklch(none none none)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / none)'), true);
      assert.equal(isValidOklch('oklch(none none none / none)'), true);
    });

    it('validates scientific notation in numeric values', () => {
      assert.equal(isValidOklch('oklch(5e-1 2e-1 1.2e2)'), true);
      assert.equal(isValidOklch('oklch(5e-1% 2e-1 1.2e2)'), true);
      assert.equal(isValidOklch('oklch(-5e-1 2e-1 -1.2e2)'), true);
      assert.equal(isValidOklch('oklch(5e-1 2e-1 1.2e2 / 5e-1)'), true);
      assert.equal(isValidOklch('oklch(5E-1 2E-1 1.2E2)'), true);
      assert.equal(isValidOklch('oklch(+5e-1 +2e-1 +1.2e2)'), true);
      assert.equal(isValidOklch('oklch(+5e-1 +2e-1 +1.2e2 / -5e-1)'), true);
    });
  });

  describe('Formatting and Edge Cases', () => {
    it('validates decimal and negative values', () => {
      assert.equal(isValidOklch('oklch(.5 .2 120.5 / .5)'), true);
      assert.equal(isValidOklch('oklch(-0.5 -0.2 -120 / -0.5)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 -1.5rad)'), true);
    });

    it('is case-insensitive', () => {
      assert.equal(isValidOklch('OKLCH(0.5 0.2 120)'), true);
      assert.equal(isValidOklch('oKlCh(0.5 0.2 120DEG / 50%)'), true);
      assert.equal(isValidOklch('oklch(NONE NONE NONE)'), true);
    });

    it('validates positive sign prefix', () => {
      assert.equal(isValidOklch('oklch(+0.5 +0.2 +120)'), true);
      assert.equal(isValidOklch('oklch(+50% +20% +120)'), true);
      assert.equal(isValidOklch('oklch(+0.5 +0.2 +120 / +0.5)'), true);
    });

    it('tolerates extreme whitespace', () => {
      assert.equal(isValidOklch('oklch(  0.5   0.2   120  )'), true);
      assert.equal(isValidOklch('oklch(0.5\t0.2\n120\r/  0.5)'), true);
      assert.equal(isValidOklch('oklch( 0.5 0.2 120/0.5 )'), true);
      assert.equal(isValidOklch('  oklch(0.5 0.2 120)  '), true);
      assert.equal(isValidOklch('  oklch(0.5 0.2 120 / 0.5)  '), true);
    });

    it('validates out-of-bounds values', () => {
      assert.equal(isValidOklch('oklch(-500% 1000 -10000deg)'), true);
      assert.equal(isValidOklch('oklch(500% -1000 10000turn)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 720)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / -0.5)'), true);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / 150%)'), true);
    });
  });

  describe('Invalid Syntax (Rejections)', () => {
    it('rejects comma-separated values', () => {
      assert.equal(isValidOklch('oklch(0.5, 0.2, 120)'), false);
      assert.equal(isValidOklch('oklch(0.5, 0.2, 120, 0.5)'), false);
    });

    it('rejects missing arguments', () => {
      assert.equal(isValidOklch('oklch(0.5 0.2)'), false);
      assert.equal(isValidOklch('oklch(0.5)'), false);
      assert.equal(isValidOklch('oklch()'), false);
    });

    it('rejects stray or trailing slashes', () => {
      assert.equal(isValidOklch('oklch(0.5 0.2 120 /)'), false);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / 0.5 /)'), false);
      assert.equal(isValidOklch('oklch(/ 0.5 0.2 120)'), false);
    });

    it('rejects alpha channels missing a slash separator', () => {
      assert.equal(isValidOklch('oklch(0.5 0.2 120 0.5)'), false);
    });

    it('rejects invalid units and types', () => {
      assert.equal(isValidOklch('oklch(50deg 0.2 120)'), false);
      assert.equal(isValidOklch('oklch(50px 0.2 120)'), false);
      assert.equal(isValidOklch('oklch(0.5 20deg 120)'), false);
      assert.equal(isValidOklch('oklch(0.5 0.2 120%)'), false);
      assert.equal(isValidOklch('oklch(0.5 0.2 120px)'), false);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / 50deg)'), false);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / 50px)'), false);
    });

    it('rejects malformed syntax and missing parentheses', () => {
      assert.equal(isValidOklch('oklch(0.5 0.2 120'), false);
      assert.equal(isValidOklch('oklch0.5 0.2 120)'), false);
      assert.equal(isValidOklch('rgba(0,0,0,1)'), false);
      assert.equal(isValidOklch(''), false);
      assert.equal(isValidOklch(' '.repeat(3)), false);
      assert.equal(isValidOklch('oklch (0.5 0.2 120)'), false);
    });

    it('rejects invalid number formats', () => {
      assert.equal(isValidOklch('oklch(0.5.5 0.2 120)'), false);
    });

    it('rejects extra text surrounding valid oklch()', () => {
      assert.equal(isValidOklch('oklch(0.5 0.2 120) extra'), false);
      assert.equal(isValidOklch('extra oklch(0.5 0.2 120)'), false);
    });

    it('rejects malformed none usage', () => {
      assert.equal(isValidOklch('oklch(none, none, none)'), false);
      assert.equal(isValidOklch('oklch(none none)'), false);
      assert.equal(isValidOklch('oklch(none% 0.2 120)'), false);
      assert.equal(isValidOklch('oklch(0.5 none% 120)'), false);
      assert.equal(isValidOklch('oklch(0.5 0.2 none%)'), false);
      assert.equal(isValidOklch('oklch(0.5 0.2 120 / none%)'), false);
    });
  });
  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidOklch(null as unknown as string), false);
      assert.equal(isValidOklch(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidOklch(0 as unknown as string), false);
      assert.equal(isValidOklch(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidOklch({} as unknown as string), false);
      assert.equal(isValidOklch([] as unknown as string), false);
    });
  });
});
