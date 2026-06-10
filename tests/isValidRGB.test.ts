import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidRGB } from '../src/isValidRGB.js';

describe('isValidRGB()', () => {
  describe('CSS Color Level 3: Legacy Comma-separated Syntax', () => {
    it('validates basic rgb() with integers', () => {
      assert.equal(isValidRGB('rgb(0, 0, 0)'), true);
      assert.equal(isValidRGB('rgb(255, 255, 255)'), true);
    });

    it('validates basic rgba() with alpha', () => {
      assert.equal(isValidRGB('rgba(0, 0, 0, 0)'), true);
      assert.equal(isValidRGB('rgba(255, 255, 255, 1)'), true);
      assert.equal(isValidRGB('rgba(255, 255, 255, 0.5)'), true);
      assert.equal(isValidRGB('rgba(255, 255, 255, .5)'), true);
    });

    it('validates percentage values', () => {
      assert.equal(isValidRGB('rgb(100%, 100%, 100%)'), true);
      assert.equal(isValidRGB('rgba(100%, 50%, 0%, 0.5)'), true);
      assert.equal(isValidRGB('rgba(100%, 50%, 0%, 50%)'), true);
    });
  });

  describe('CSS Color Level 4: Space-separated Syntax', () => {
    it('validates space-separated rgb() and rgba() without alpha', () => {
      assert.equal(isValidRGB('rgb(0 0 0)'), true);
      assert.equal(isValidRGB('rgb(255 255 255)'), true);
      assert.equal(isValidRGB('rgba(0 0 0)'), true);
    });

    it('validates space-separated syntax with slash-separated alpha', () => {
      assert.equal(isValidRGB('rgb(255 255 255 / 1)'), true);
      assert.equal(isValidRGB('rgba(255 255 255 / 0.5)'), true);
      assert.equal(isValidRGB('rgb(0 0 0 / .5)'), true);
    });

    it('validates space-separated percentage values', () => {
      assert.equal(isValidRGB('rgb(100% 50% 0%)'), true);
      assert.equal(isValidRGB('rgba(100% 50% 0% / 50%)'), true);
    });

    it('validates the "none" keyword', () => {
      assert.equal(isValidRGB('rgb(none none none)'), true);
      assert.equal(isValidRGB('rgb(none 0 0)'), true);
      assert.equal(isValidRGB('rgb(255 none 0)'), true);
      assert.equal(isValidRGB('rgb(255 0 none / none)'), true);
      assert.equal(isValidRGB('rgb(255 0 0 / none)'), true);
    });

    it('validates positive sign prefix', () => {
      assert.equal(isValidRGB('rgb(+255 +0 +0)'), true);
      assert.equal(isValidRGB('rgb(+100% +50% +0%)'), true);
      assert.equal(isValidRGB('rgba(+255 +255 +255 / +1)'), true);
    });
  });

  describe('Formatting and Edge Cases', () => {
    it('handles decimal and scientific notation', () => {
      assert.equal(isValidRGB('rgb(255.5, 0, 0)'), true);
      assert.equal(isValidRGB('rgb(1e2, 2e1, 3e0)'), true);
      assert.equal(isValidRGB('rgb(1E2, 2E1, 3E0)'), true);
    });

    it('handles out-of-bounds numbers', () => {
      assert.equal(isValidRGB('rgb(300, -10, 0)'), true);
    });

    it('tolerates extreme whitespace', () => {
      assert.equal(isValidRGB('rgb(0,0,0)'), true);
      assert.equal(isValidRGB('rgb(  255  ,  255  ,  255  )'), true);
      assert.equal(isValidRGB('rgb(  255   255   255  /  0.5  )'), true);
      assert.equal(isValidRGB('  rgb(255, 0, 0)  '), true);
      assert.equal(isValidRGB('  rgb(255 0 0 / 0.5)  '), true);
    });

    it('is case-insensitive', () => {
      assert.equal(isValidRGB('RGB(255, 255, 255)'), true);
      assert.equal(isValidRGB('rGbA(0, 0, 0, 1)'), true);
    });
  });

  describe('Invalid Syntax (Rejections)', () => {
    it('rejects missing arguments', () => {
      assert.equal(isValidRGB('rgb'), false);
      assert.equal(isValidRGB('rgb()'), false);
      assert.equal(isValidRGB('rgb(255)'), false);
      assert.equal(isValidRGB('rgb(255, 255)'), false);
    });

    it('rejects excessive arguments and multiple slashes', () => {
      assert.equal(isValidRGB('rgb(255, 255, 255, 1, 1)'), false);
      assert.equal(isValidRGB('rgb(255 / 255 / 255)'), false);
    });

    it('rejects mixed syntaxes (comma and space)', () => {
      assert.equal(isValidRGB('rgb(255 255, 255)'), false);
      assert.equal(isValidRGB('rgb(255, 255 255)'), false);
      assert.equal(isValidRGB('rgb(255, 255, 255 / 1)'), false);
      assert.equal(isValidRGB('rgb(255 255 255 , 1)'), false);
    });

    it('rejects mixing numbers and percentages', () => {
      assert.equal(isValidRGB('rgb(100%, 255, 0)'), false);
      assert.equal(isValidRGB('rgb(0, 100%, 0)'), false);
      assert.equal(isValidRGB('rgb(0 100% 0)'), false);
    });

    it('rejects malformed syntax and missing parentheses', () => {
      assert.equal(isValidRGB('rgb(255, 0, 0'), false);
      assert.equal(isValidRGB('(255, 0, 0)'), false);
      assert.equal(isValidRGB('rgb(255, 0, 0;)'), false);
    });

    it('rejects incorrect function names', () => {
      assert.equal(isValidRGB('hex(255, 0, 0)'), false);
    });

    it('rejects invalid units and characters', () => {
      assert.equal(isValidRGB('rgb(#fff)'), false);
      assert.equal(isValidRGB('rgb(foo, bar, baz)'), false);
    });

    it('rejects empty strings', () => {
      assert.equal(isValidRGB(''), false);
    });

    it('rejects extra text surrounding valid rgb()', () => {
      assert.equal(isValidRGB('rgb(255, 0, 0) extra'), false);
      assert.equal(isValidRGB('extra rgb(255, 0, 0)'), false);
    });

    it('rejects invalid number formats', () => {
      assert.equal(isValidRGB('rgb(255.5.5, 0, 0)'), false);
    });

    it('rejects "none" in legacy comma-separated syntax', () => {
      assert.equal(isValidRGB('rgb(none, none, none)'), false);
      assert.equal(isValidRGB('rgb(none, 0, 0)'), false);
      assert.equal(isValidRGB('rgb(255, none, 0)'), false);
      assert.equal(isValidRGB('rgba(none, none, none, none)'), false);
      assert.equal(isValidRGB('rgba(255, 255, 255, none)'), false);
    });
  });
  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidRGB(null as unknown as string), false);
      assert.equal(isValidRGB(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidRGB(0 as unknown as string), false);
      assert.equal(isValidRGB(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidRGB({} as unknown as string), false);
      assert.equal(isValidRGB([] as unknown as string), false);
    });
  });
});
