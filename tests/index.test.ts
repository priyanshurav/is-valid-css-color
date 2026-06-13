import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidColor } from '../src/index.js';

describe('isValidColor()', () => {
  describe('Delegates to sub-validators', () => {
    it('validates color names', () => {
      assert.equal(isValidColor('red'), true);
      assert.equal(isValidColor('rebeccapurple'), true);
      assert.equal(isValidColor('transparent'), true);
    });

    it('validates hex colors', () => {
      assert.equal(isValidColor('#fff'), true);
      assert.equal(isValidColor('#aabbcc'), true);
      assert.equal(isValidColor('#12345678'), true);
    });

    it('validates rgb() colors', () => {
      assert.equal(isValidColor('rgb(255, 0, 0)'), true);
      assert.equal(isValidColor('rgba(0 0 0 / 0.5)'), true);
    });

    it('validates hsl() colors', () => {
      assert.equal(isValidColor('hsl(120, 100%, 50%)'), true);
      assert.equal(isValidColor('hsla(120 100% 50% / 0.5)'), true);
    });

    it('validates hwb() colors', () => {
      assert.equal(isValidColor('hwb(120 10% 20%)'), true);
      assert.equal(isValidColor('hwb(120 10% 20% / 0.5)'), true);
    });

    it('validates lab() colors', () => {
      assert.equal(isValidColor('lab(50 40 30)'), true);
      assert.equal(isValidColor('lab(50% 40% 30% / 0.5)'), true);
    });

    it('validates lch() colors', () => {
      assert.equal(isValidColor('lch(50% 40 320)'), true);
      assert.equal(isValidColor('lch(50% 40 320 / 0.5)'), true);
    });

    it('validates oklab() colors', () => {
      assert.equal(isValidColor('oklab(0.59 0.1 0.1)'), true);
      assert.equal(isValidColor('oklab(59% 10% -10% / 0.5)'), true);
    });

    it('validates oklch() colors', () => {
      assert.equal(isValidColor('oklch(0.5 0.2 120)'), true);
      assert.equal(isValidColor('oklch(50% 20% 120 / 0.5)'), true);
    });

    it('validates color() functions', () => {
      assert.equal(isValidColor('color(srgb 1 0 0)'), true);
      assert.equal(isValidColor('color(display-p3 0.5 0.5 0.5 / 0.8)'), true);
    });
  });

  describe('Invalid Inputs (Rejections)', () => {
    it('rejects strings no validator accepts', () => {
      assert.equal(isValidColor(''), false);
      assert.equal(isValidColor('notacolor'), false);
      assert.equal(isValidColor('rgb(255 0 0'), false);
      assert.equal(isValidColor('##ffffff'), false);
    });
  });

  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidColor(null as unknown as string), false);
      assert.equal(isValidColor(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidColor(0 as unknown as string), false);
      assert.equal(isValidColor(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidColor({} as unknown as string), false);
      assert.equal(isValidColor([] as unknown as string), false);
    });
  });
});
