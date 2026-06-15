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
    });

    it('is case-insensitive', () => {
      assert.equal(isValidRgb('RGB(255, 255, 255)'), true);
      assert.equal(isValidRgb('rGbA(0, 0, 0, 1)'), true);
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
    });

    it('rejects "none" in legacy comma-separated syntax', () => {
      assert.equal(isValidRgb('rgb(none, none, none)'), false);
      assert.equal(isValidRgb('rgb(none, 0, 0)'), false);
      assert.equal(isValidRgb('rgb(255, none, 0)'), false);
      assert.equal(isValidRgb('rgba(none, none, none, none)'), false);
      assert.equal(isValidRgb('rgba(255, 255, 255, none)'), false);
    });
  });

  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidRgb(null as unknown as string), false);
      assert.equal(isValidRgb(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidRgb(0 as unknown as string), false);
      assert.equal(isValidRgb(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidRgb({} as unknown as string), false);
      assert.equal(isValidRgb([] as unknown as string), false);
    });
  });
});
