import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidColorNotation } from '../src/isValidColorNotation.js';

describe('isValidColorNotation()', () => {
  describe('CSS Color Level 4: Color Function Syntax', () => {
    it('validates all standard color spaces', () => {
      assert.equal(isValidColorNotation('color(srgb 1 0 0)'), true);
      assert.equal(isValidColorNotation('color(srgb-linear 1 0 0)'), true);
      assert.equal(isValidColorNotation('color(display-p3-linear 1 0 0)'), true);
      assert.equal(isValidColorNotation('color(display-p3 1 0 0)'), true);
      assert.equal(isValidColorNotation('color(a98-rgb 1 0 0)'), true);
      assert.equal(isValidColorNotation('color(prophoto-rgb 1 0 0)'), true);
      assert.equal(isValidColorNotation('color(rec2020 1 0 0)'), true);
      assert.equal(isValidColorNotation('color(xyz 1 0 0)'), true);
      assert.equal(isValidColorNotation('color(xyz-d50 1 0 0)'), true);
      assert.equal(isValidColorNotation('color(xyz-d65 1 0 0)'), true);
    });

    it('validates different numeric and percentage formats', () => {
      assert.equal(isValidColorNotation('color(srgb 0.5 0.5 0.5)'), true);
      assert.equal(isValidColorNotation('color(srgb .1 .9 .5)'), true);
      assert.equal(isValidColorNotation('color(srgb 10% 20% 30%)'), true);
      assert.equal(isValidColorNotation('color(srgb -0.5 1.5 200%)'), true);
      assert.equal(isValidColorNotation('color(srgb 0 0 0)'), true);
      assert.equal(isValidColorNotation('color(srgb 1e-3 2e2 -3e-1)'), true);
      assert.equal(isValidColorNotation('color(srgb 1E-3 2E2 -3E-1)'), true);
      assert.equal(isValidColorNotation('color(srgb +1e-3 +2e2 -3e-1)'), true);
    });

    it('validates the none keyword', () => {
      assert.equal(isValidColorNotation('color(srgb none none none)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 none 20%)'), true);
    });

    it('validates valid alpha values', () => {
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / 0.5)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / 50%)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / .1)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / none)'), true);
      assert.equal(isValidColorNotation('color(srgb none none none / none)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / 150%)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / -20%)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / 1.5)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / -0.5)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / 1e-3)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / 1E-3)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / 1.0)'), true);
    });
  });

  describe('Formatting and Edge Cases', () => {
    it('is case-insensitive', () => {
      assert.equal(isValidColorNotation('COLOR(SRGB 1 0 0)'), true);
      assert.equal(isValidColorNotation('CoLoR(sRgB 1 0 0)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / NONE)'), true);
    });

    it('tolerates extreme whitespace', () => {
      assert.equal(isValidColorNotation('color(  srgb   1   0   0  )'), true);
      assert.equal(isValidColorNotation('color(\nsrgb\t1\n0\t0\n)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0/0.5)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 /0.5)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0/ 0.5)'), true);
      assert.equal(isValidColorNotation(' color(srgb 1 0 0)'), true);
      assert.equal(isValidColorNotation('color(srgb 1 0 0) '), true);
    });

    it('validates positive sign prefix on channel values', () => {
      assert.equal(isValidColorNotation('color(srgb +1 +0 +0)'), true);
      assert.equal(isValidColorNotation('color(srgb +0.5 +0.5 +0.5)'), true);
      assert.equal(isValidColorNotation('color(srgb +1 0 0 / +0.5)'), true);
    });

    it('validates out-of-bounds values', () => {
      assert.equal(isValidColorNotation('color(srgb -1000 500 -500)'), true);
      assert.equal(isValidColorNotation('color(srgb 500% -500% 1000%)'), true);
      assert.equal(isValidColorNotation('color(display-p3 -200% 300% -400%)'), true);
      assert.equal(isValidColorNotation('color(rec2020 2000 -2000 0)'), true);
      assert.equal(isValidColorNotation('color(xyz -50 100 999999)'), true);
      assert.equal(isValidColorNotation('color(srgb 100 100 100 / 500%)'), true);
    });
  });

  describe('Invalid Syntax (Rejections)', () => {
    it('rejects comma-separated arguments', () => {
      assert.equal(isValidColorNotation('color(srgb, 1, 0, 0)'), false);
      assert.equal(isValidColorNotation('color(srgb 1, 0, 0)'), false);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / 0.5, 0.2)'), false);
    });

    it('rejects incomplete functions', () => {
      assert.equal(isValidColorNotation('color(srgb 1 0 0'), false);
      assert.equal(isValidColorNotation('color(srgb 1 0)'), false);
      assert.equal(isValidColorNotation('color(srgb)'), false);
      assert.equal(isValidColorNotation('color()'), false);
    });

    it('rejects unsupported or missing color spaces', () => {
      assert.equal(isValidColorNotation('color(unknown-space 1 0 0)'), false);
      assert.equal(isValidColorNotation('color(1 0 0)'), false);
      assert.equal(isValidColorNotation('color(cmyk 1 0 0 0)'), false);
    });

    it('rejects invalid parameter counts', () => {
      assert.equal(isValidColorNotation('color(srgb 1 0 0 0)'), false);
      assert.equal(isValidColorNotation('color(srgb 1)'), false);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 0 / 0.5)'), false);
    });

    it('rejects invalid alpha syntax', () => {
      assert.equal(isValidColorNotation('color(srgb 1 0 0 /)'), false);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 0.5)'), false);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / 0.5 / 0.2)'), false);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / / 0.5)'), false);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / /)'), false);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 \\ 0.5)'), false);
    });

    it('rejects invalid values and units', () => {
      assert.equal(isValidColorNotation('color(srgb 1px 0 0)'), false);
      assert.equal(isValidColorNotation('color(srgb 1 0 0deg)'), false);
      assert.equal(isValidColorNotation('color(srgb red 0 0)'), false);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / 50px)'), false);
      assert.equal(isValidColorNotation('color(srgb NaN 0 0)'), false);
      assert.equal(isValidColorNotation('color(srgb null 0 0)'), false);
    });

    it('rejects incorrect function names', () => {
      assert.equal(isValidColorNotation('rgb(255, 0, 0)'), false);
      assert.equal(isValidColorNotation('colors(srgb 1 0 0)'), false);
      assert.equal(isValidColorNotation('colour(srgb 1 0 0)'), false);
      assert.equal(isValidColorNotation('color (srgb 1 0 0)'), false);
    });

    it('rejects invalid number formats', () => {
      assert.equal(isValidColorNotation('color(srgb 0.5.5 0 0)'), false);
    });

    it('rejects extra text surrounding valid color()', () => {
      assert.equal(isValidColorNotation('color(srgb 1 0 0) extra'), false);
      assert.equal(isValidColorNotation('extra color(srgb 1 0 0)'), false);
    });

    it('rejects malformed none usage', () => {
      assert.equal(isValidColorNotation('color(srgb none% 0 0)'), false);
      assert.equal(isValidColorNotation('color(srgb 1 none% 0)'), false);
      assert.equal(isValidColorNotation('color(srgb 1 0 none%)'), false);
      assert.equal(isValidColorNotation('color(srgb 1 0 0 / none%)'), false);
    });
  });

  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidColorNotation(null as unknown as string), false);
      assert.equal(isValidColorNotation(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidColorNotation(0 as unknown as string), false);
      assert.equal(isValidColorNotation(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidColorNotation({} as unknown as string), false);
      assert.equal(isValidColorNotation([] as unknown as string), false);
    });
  });
});
