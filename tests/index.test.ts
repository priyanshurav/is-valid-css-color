import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidCssColor } from '../src/index.js';

describe('isValidCssColor()', () => {
  describe('Delegates to sub-validators', () => {
    it('validates color names', () => {
      assert.equal(isValidCssColor('red'), true);
      assert.equal(isValidCssColor('rebeccapurple'), true);
      assert.equal(isValidCssColor('transparent'), true);
    });

    it('validates hex colors', () => {
      assert.equal(isValidCssColor('#fff'), true);
      assert.equal(isValidCssColor('#aabbcc'), true);
      assert.equal(isValidCssColor('#12345678'), true);
    });

    it('validates rgb() colors', () => {
      assert.equal(isValidCssColor('rgb(255, 0, 0)'), true);
      assert.equal(isValidCssColor('rgba(0 0 0 / 0.5)'), true);
    });

    it('validates hsl() colors', () => {
      assert.equal(isValidCssColor('hsl(120, 100%, 50%)'), true);
      assert.equal(isValidCssColor('hsla(120 100% 50% / 0.5)'), true);
    });

    it('validates hwb() colors', () => {
      assert.equal(isValidCssColor('hwb(120 10% 20%)'), true);
      assert.equal(isValidCssColor('hwb(120 10% 20% / 0.5)'), true);
    });

    it('validates lab() colors', () => {
      assert.equal(isValidCssColor('lab(50 40 30)'), true);
      assert.equal(isValidCssColor('lab(50% 40% 30% / 0.5)'), true);
    });

    it('validates lch() colors', () => {
      assert.equal(isValidCssColor('lch(50% 40 320)'), true);
      assert.equal(isValidCssColor('lch(50% 40 320 / 0.5)'), true);
    });

    it('validates oklab() colors', () => {
      assert.equal(isValidCssColor('oklab(0.59 0.1 0.1)'), true);
      assert.equal(isValidCssColor('oklab(59% 10% -10% / 0.5)'), true);
    });

    it('validates oklch() colors', () => {
      assert.equal(isValidCssColor('oklch(0.5 0.2 120)'), true);
      assert.equal(isValidCssColor('oklch(50% 20% 120 / 0.5)'), true);
    });

    it('validates color() functions', () => {
      assert.equal(isValidCssColor('color(srgb 1 0 0)'), true);
      assert.equal(isValidCssColor('color(display-p3 0.5 0.5 0.5 / 0.8)'), true);
    });
  });

  describe('Function name handling', () => {
    it('treats CSS function names as case-insensitive', () => {
      assert.equal(isValidCssColor('RGB(255, 0, 0)'), true);
      assert.equal(isValidCssColor('COLOR(srgb 1 0 0)'), true);
      assert.equal(isValidCssColor('HSL(120, 100%, 50%)'), true);
      assert.equal(isValidCssColor('LAB(50 40 30)'), true);
      assert.equal(isValidCssColor('OKLCH(0.5 0.2 120)'), true);
    });

    it('rejects strings that look like CSS functions but use unrecognized names', () => {
      assert.equal(isValidCssColor('foo(1,2,3)'), false);
      assert.equal(isValidCssColor('gradient(1,2,3)'), false);
      assert.equal(isValidCssColor('9(1,2,3)'), false);
      assert.equal(isValidCssColor('hello(1,2,3)'), false);
      assert.equal(isValidCssColor('leopard(1,2,3)'), false);
      assert.equal(isValidCssColor('organic(1,2,3)'), false);
    });
  });

  describe('Whitespace handling', () => {
    it('trims surrounding whitespace before validating', () => {
      assert.equal(isValidCssColor('  red  '), true);
      assert.equal(isValidCssColor('\tred\n'), true);
      assert.equal(isValidCssColor('  rgb(255, 0, 0)  '), true);
    });

    it('rejects whitespace-only input', () => {
      assert.equal(isValidCssColor('   '), false);
      assert.equal(isValidCssColor('\t\n'), false);
    });
  });

  describe('Invalid Inputs (Rejections)', () => {
    it('rejects strings no validator accepts', () => {
      assert.equal(isValidCssColor(''), false);
      assert.equal(isValidCssColor('notacolor'), false);
      assert.equal(isValidCssColor('rgb(255 0 0'), false);
      assert.equal(isValidCssColor('##ffffff'), false);
    });
  });

  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidCssColor(null as unknown as string), false);
      assert.equal(isValidCssColor(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidCssColor(0 as unknown as string), false);
      assert.equal(isValidCssColor(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidCssColor({} as unknown as string), false);
      assert.equal(isValidCssColor([] as unknown as string), false);
    });
  });
});
