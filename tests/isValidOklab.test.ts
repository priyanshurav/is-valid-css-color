import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidOklab } from '../src/isValidOklab.js';

describe('isValidOklab()', () => {
  describe('CSS Color Level 4: Space-separated OKLAB Syntax', () => {
    it('validates basic space-separated values', () => {
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1)'), true);
      assert.equal(isValidOklab('oklab(1 0 -0.5)'), true);
      assert.equal(isValidOklab('oklab(0 0 0)'), true);
      assert.equal(isValidOklab('oklab(0.5 0.5 0.5)'), true);
    });

    it('validates percentage values', () => {
      assert.equal(isValidOklab('oklab(59% 10% -10%)'), true);
      assert.equal(isValidOklab('oklab(100% 0% 0%)'), true);
      assert.equal(isValidOklab('oklab(0% 0% 0%)'), true);
      assert.equal(isValidOklab('oklab(150% 50% 50%)'), true);
    });

    it('validates mixed numbers and percentages', () => {
      assert.equal(isValidOklab('oklab(59% 0.1 -10%)'), true);
      assert.equal(isValidOklab('oklab(0.59 10% 0.1)'), true);
      assert.equal(isValidOklab('oklab(1 100% 0)'), true);
    });

    it('validates alpha channels (numbers and percentages)', () => {
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / 0.5)'), true);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / 50%)'), true);
      assert.equal(isValidOklab('oklab(59% 10% -10% / 1)'), true);
      assert.equal(isValidOklab('oklab(59% 10% -10% / 100%)'), true);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / 0)'), true);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / 0%)'), true);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / 150%)'), true);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / -20%)'), true);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / 1.5)'), true);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / -0.5)'), true);
    });

    it('validates decimal, signed, and scientific notation formats', () => {
      assert.equal(isValidOklab('oklab(.5 .1 .1)'), true);
      assert.equal(isValidOklab('oklab(-0.5 +0.1 -0.1)'), true);
      assert.equal(isValidOklab('oklab(+50% -10% +10%)'), true);
      assert.equal(isValidOklab('oklab(5e-1 1e-1 -1e-1)'), true);
      assert.equal(isValidOklab('oklab(5E-1 1E-1 -1E-1)'), true);
      assert.equal(isValidOklab('oklab(1e2 1e2 1e2)'), true);
      assert.equal(isValidOklab('oklab(+5e-1 +1e-1 -1e-1)'), true);
      assert.equal(isValidOklab('oklab(+5e-1 +1e-1 -1e-1 / -5e-1)'), true);
    });

    it('validates the "none" keyword', () => {
      assert.equal(isValidOklab('oklab(none none none)'), true);
      assert.equal(isValidOklab('oklab(0.5 none 0.1)'), true);
      assert.equal(isValidOklab('oklab(none 0.1 none / 0.5)'), true);
      assert.equal(isValidOklab('oklab(none none none / none)'), true);
    });
  });

  describe('Formatting and Edge Cases', () => {
    it('is case-insensitive', () => {
      assert.equal(isValidOklab('OKLAB(0.59 0.1 0.1)'), true);
      assert.equal(isValidOklab('OkLaB(0.59 0.1 0.1)'), true);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / NONE)'), true);
      assert.equal(isValidOklab('oKLaB(NoNe nOnE 0.1 / nOne)'), true);
    });

    it('tolerates extreme whitespace', () => {
      assert.equal(isValidOklab('oklab(  0.59  0.1  0.1  )'), true);
      assert.equal(isValidOklab('oklab(0.59\t0.1\t0.1)'), true);
      assert.equal(isValidOklab('oklab(0.59\n0.1\n0.1\n/\n0.5)'), true);
      assert.equal(isValidOklab('  oklab(0.59 0.1 0.1)  '), true);
      assert.equal(isValidOklab('oklab(0.59   0.1   0.1   /   0.5)'), true);
    });

    it('validates out-of-bounds values', () => {
      assert.equal(isValidOklab('oklab(-1000 500 -500)'), true);
      assert.equal(isValidOklab('oklab(500% -500% 1000%)'), true);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / -0.5)'), true);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / 150%)'), true);
    });
  });

  describe('Invalid Syntax (Rejections)', () => {
    it('rejects legacy comma-separated syntax', () => {
      assert.equal(isValidOklab('oklab(0.59, 0.1, 0.1)'), false);
      assert.equal(isValidOklab('oklab(59%, 10%, 10%)'), false);
      assert.equal(isValidOklab('oklab(0.59, 0.1, 0.1, 0.5)'), false);
      assert.equal(isValidOklab('oklab(0.59, 0.1, 0.1 / 0.5)'), false);
    });

    it('rejects missing or excessive parameters', () => {
      assert.equal(isValidOklab('oklab(0.59)'), false);
      assert.equal(isValidOklab('oklab(0.59 0.1)'), false);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 0.1)'), false);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 0.1 0.1)'), false);
    });

    it('rejects malformed alpha channels', () => {
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 /)'), false);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 // 0.5)'), false);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 0.5 /)'), false);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / 0.5 / 0.5)'), false);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / 0.5 0.5)'), false);
    });

    it('rejects invalid units and characters', () => {
      assert.equal(isValidOklab('oklab(59px 0.1 0.1)'), false);
      assert.equal(isValidOklab('oklab(0.59 10deg 0.1)'), false);
      assert.equal(isValidOklab('oklab(0.59 0.1 foo)'), false);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / bar)'), false);
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1 / 50px)'), false);
    });

    it('rejects malformed numbers and spaces inside values', () => {
      assert.equal(isValidOklab('oklab(59 % 0.1 0.1)'), false);
      assert.equal(isValidOklab('oklab(0. 59 0.1 0.1)'), false);
      assert.equal(isValidOklab('oklab(0.5.9 0.1 0.1)'), false);
      assert.equal(isValidOklab('oklab(--0.59 0.1 0.1)'), false);
      assert.equal(isValidOklab('oklab(e10 0.1 0.1)'), false);
    });

    it('rejects syntax errors and malformed strings', () => {
      assert.equal(isValidOklab('oklab(0.59 0.1 0.1'), false);
      assert.equal(isValidOklab('oklab0.59 0.1 0.1)'), false);
      assert.equal(isValidOklab('oklab( 0.59 0.1 0.1 / 0.5 ) extra'), false);
      assert.equal(isValidOklab('extra oklab(0.59 0.1 0.1)'), false);
      assert.equal(isValidOklab('oklab (0.59 0.1 0.1)'), false);
    });

    it('rejects completely invalid formats and random strings', () => {
      assert.equal(isValidOklab(''), false);
      assert.equal(isValidOklab('0.59 0.1 0.1'), false);
      assert.equal(isValidOklab('oklab()'), false);
      assert.equal(isValidOklab('oklch(0.59 0.1 0.1)'), false);
      assert.equal(isValidOklab('rgb(255 0 0)'), false);
      assert.equal(isValidOklab('random_string'), false);
      assert.equal(isValidOklab('oklab(false true false)'), false);
    });

    it('rejects malformed none usage', () => {
      assert.equal(isValidOklab('oklab(none, none, none)'), false);
      assert.equal(isValidOklab('oklab(none none)'), false);
      assert.equal(isValidOklab('oklab(none% 0.1 0.1)'), false);
      assert.equal(isValidOklab('oklab(0.5 none% 0.1)'), false);
      assert.equal(isValidOklab('oklab(0.5 0.1 none%)'), false);
      assert.equal(isValidOklab('oklab(0.5 0.1 0.1 / none%)'), false);
    });
  });
  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidOklab(null as unknown as string), false);
      assert.equal(isValidOklab(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidOklab(0 as unknown as string), false);
      assert.equal(isValidOklab(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidOklab({} as unknown as string), false);
      assert.equal(isValidOklab([] as unknown as string), false);
    });
  });
});
