import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidHwb } from '../src/isValidHwb.js';

describe('isValidHwb()', () => {
  describe('CSS Color Level 4: Space-separated HWB Syntax', () => {
    it('validates basic space-separated HWB values', () => {
      assert.equal(isValidHwb('hwb(120 10% 20%)'), true);
      assert.equal(isValidHwb('hwb(0 0% 0%)'), true);
      assert.equal(isValidHwb('hwb(360 100% 100%)'), true);
    });

    it('validates various hue units', () => {
      assert.equal(isValidHwb('hwb(120deg 10% 20%)'), true);
      assert.equal(isValidHwb('hwb(2.5rad 10% 20%)'), true);
      assert.equal(isValidHwb('hwb(100grad 10% 20%)'), true);
      assert.equal(isValidHwb('hwb(0.25turn 10% 20%)'), true);
    });

    it('validates decimal and negative values', () => {
      assert.equal(isValidHwb('hwb(120.5 10.5% 20.25%)'), true);
      assert.equal(isValidHwb('hwb(.5 .5% .9%)'), true);
      assert.equal(isValidHwb('hwb(-120 10% 20%)'), true);
      assert.equal(isValidHwb('hwb(-1.5rad 10% 20%)'), true);
    });

    it('validates alpha channels (numbers and percentages)', () => {
      assert.equal(isValidHwb('hwb(120 10% 20% / 0.5)'), true);
      assert.equal(isValidHwb('hwb(120 10% 20% / .5)'), true);
      assert.equal(isValidHwb('hwb(120 10% 20% / 1)'), true);
      assert.equal(isValidHwb('hwb(120 10% 20% / 0)'), true);
      assert.equal(isValidHwb('hwb(120 10% 20% / 50%)'), true);
      assert.equal(isValidHwb('hwb(120 10% 20% / 100%)'), true);
    });

    it('validates out-of-range alpha values', () => {
      assert.equal(isValidHwb('hwb(120 10% 20% / 150%)'), true);
      assert.equal(isValidHwb('hwb(120 10% 20% / -20%)'), true);
      assert.equal(isValidHwb('hwb(120 10% 20% / 1.5)'), true);
      assert.equal(isValidHwb('hwb(120 10% 20% / -0.5)'), true);
    });

    it('validates plain numbers (no %) for whiteness and blackness', () => {
      assert.equal(isValidHwb('hwb(120 10 20)'), true);
      assert.equal(isValidHwb('hwb(120 10% 20)'), true);
      assert.equal(isValidHwb('hwb(120 10 20%)'), true);
      assert.equal(isValidHwb('hwb(120 10 20 / 0.5)'), true);
    });

    it('validates the "none" keyword', () => {
      assert.equal(isValidHwb('hwb(none 10% 20%)'), true);
      assert.equal(isValidHwb('hwb(120 none 20%)'), true);
      assert.equal(isValidHwb('hwb(120 10% none)'), true);
      assert.equal(isValidHwb('hwb(120 10% 20% / none)'), true);
      assert.equal(isValidHwb('hwb(none none none / none)'), true);
    });

    it('validates scientific notation in numeric values', () => {
      assert.equal(isValidHwb('hwb(1e2 1e1% 2e1%)'), true);
      assert.equal(isValidHwb('hwb(1.5e2 10% 20%)'), true);
      assert.equal(isValidHwb('hwb(-1e2 1e1% 2e1%)'), true);
      assert.equal(isValidHwb('hwb(1e2 1e1% 2e1% / 5e-1)'), true);
      assert.equal(isValidHwb('hwb(1E2 1E1% 2E1%)'), true);

      assert.equal(isValidHwb('hwb(+1e2 +1e1% +2e1%)'), true);
      assert.equal(isValidHwb('hwb(+1e2 +1e1% +2e1% / -1.5e0)'), true);
    });
  });

  describe('Formatting and Edge Cases', () => {
    it('tolerates extreme whitespace', () => {
      assert.equal(isValidHwb('hwb(  120   10%   20%  )'), true);
      assert.equal(isValidHwb('hwb(120\t10%\t20%)'), true);
      assert.equal(isValidHwb('hwb(120 10% 20%/0.5)'), true);
      assert.equal(isValidHwb('hwb(  120  10%  20%  /  0.5  )'), true);
      assert.equal(isValidHwb('  hwb(120 10% 20%)  '), true);
      assert.equal(isValidHwb('  hwb(120 10% 20% / 0.5)  '), true);
    });

    it('is case-insensitive', () => {
      assert.equal(isValidHwb('HWB(120 10% 20%)'), true);
      assert.equal(isValidHwb('HwB(120DeG 10% 20% / 50%)'), true);
      assert.equal(isValidHwb('hwb(0.5tUrN 10% 20%)'), true);
    });

    it('validates positive sign prefix', () => {
      assert.equal(isValidHwb('hwb(+120 +10% +20%)'), true);
      assert.equal(isValidHwb('hwb(+120 +10% +20% / +0.5)'), true);
    });

    it('validates out-of-bounds values', () => {
      assert.equal(isValidHwb('hwb(120 -10% 150%)'), true);
      assert.equal(isValidHwb('hwb(999deg 500% -500%)'), true);
      assert.equal(isValidHwb('hwb(-10turn 300% 200%)'), true);
      assert.equal(isValidHwb('hwb(120 10% 20% / -0.5)'), true);
      assert.equal(isValidHwb('hwb(120 10% 20% / 150%)'), true);
    });
  });

  describe('Invalid Syntax (Rejections)', () => {
    it('rejects comma-separated values', () => {
      assert.equal(isValidHwb('hwb(120, 10%, 20%)'), false);
      assert.equal(isValidHwb('hwb(120, 10%, 20%, 0.5)'), false);
      assert.equal(isValidHwb('hwb(120, 10%, 20% / 0.5)'), false);
    });

    it('rejects missing arguments', () => {
      assert.equal(isValidHwb('hwb()'), false);
      assert.equal(isValidHwb('hwb(120)'), false);
      assert.equal(isValidHwb('hwb(120 10%)'), false);
      assert.equal(isValidHwb('hwb(120 10% / 0.5)'), false);
    });

    it('rejects excessive arguments', () => {
      assert.equal(isValidHwb('hwb(120 10% 20% 30%)'), false);
      assert.equal(isValidHwb('hwb(120 10% 20% / 0.5 0.5)'), false);
    });

    it('rejects invalid units', () => {
      assert.equal(isValidHwb('hwb(120px 10% 20%)'), false);
      assert.equal(isValidHwb('hwb(120% 10% 20%)'), false);
    });

    it('rejects invalid alpha syntax', () => {
      assert.equal(isValidHwb('hwb(120 10% 20% /)'), false);
      assert.equal(isValidHwb('hwb(120 10% 20% / 0.5 / 0.2)'), false);
      assert.equal(isValidHwb('hwb(120 10% 20% 0.5)'), false);
    });

    it('rejects malformed syntax', () => {
      assert.equal(isValidHwb('hwb120 10% 20%)'), false);
      assert.equal(isValidHwb('hwb(120 10% 20%'), false);
      assert.equal(isValidHwb('hwb (120 10% 20%)'), false);
      assert.equal(isValidHwb('rgb(120 10% 20%)'), false);
    });

    it('rejects empty or random strings', () => {
      assert.equal(isValidHwb(''), false);
      assert.equal(isValidHwb('tomato'), false);
      assert.equal(isValidHwb('hwb(120 degrees 10 percent 20 percent)'), false);
    });

    it('rejects invalid number formats', () => {
      assert.equal(isValidHwb('hwb(120.5.5 10% 20%)'), false);
    });

    it('rejects extra text surrounding valid hwb()', () => {
      assert.equal(isValidHwb('hwb(120 10% 20%) extra'), false);
      assert.equal(isValidHwb('extra hwb(120 10% 20%)'), false);
    });

    it('rejects malformed none usage', () => {
      assert.equal(isValidHwb('hwb(none% 10% 20%)'), false);
      assert.equal(isValidHwb('hwb(120 none% 20%)'), false);
      assert.equal(isValidHwb('hwb(120 10% none%)'), false);
      assert.equal(isValidHwb('hwb(120 10% 20% / none%)'), false);
    });
  });

  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidHwb(null as unknown as string), false);
      assert.equal(isValidHwb(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidHwb(0 as unknown as string), false);
      assert.equal(isValidHwb(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidHwb({} as unknown as string), false);
      assert.equal(isValidHwb([] as unknown as string), false);
    });
  });
});
