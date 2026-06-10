import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidHSL } from '../src/isValidHSL.js';

describe('isValidHSL()', () => {
  describe('CSS Color Level 3: Legacy comma-separated syntax', () => {
    it('validates basic hsl() with integers', () => {
      assert.equal(isValidHSL('hsl(120, 100%, 50%)'), true);
      assert.equal(isValidHSL('hsl(0, 0%, 0%)'), true);
      assert.equal(isValidHSL('hsl(360, 100%, 100%)'), true);
    });

    it('validates basic hsla() with integers and alpha', () => {
      assert.equal(isValidHSL('hsla(120, 100%, 50%, 1)'), true);
      assert.equal(isValidHSL('hsla(120, 100%, 50%, 0.5)'), true);
      assert.equal(isValidHSL('hsla(120, 100%, 50%, 0)'), true);
    });

    it('validates decimal values', () => {
      assert.equal(isValidHSL('hsl(120.5, 50.5%, 49.9%)'), true);
      assert.equal(isValidHSL('hsla(120, 100%, 50%, .5)'), true);
    });

    it('validates different angle units for hue', () => {
      assert.equal(isValidHSL('hsl(120deg, 100%, 50%)'), true);
      assert.equal(isValidHSL('hsl(200grad, 100%, 50%)'), true);
      assert.equal(isValidHSL('hsl(1.5rad, 100%, 50%)'), true);
      assert.equal(isValidHSL('hsl(0.5turn, 100%, 50%)'), true);
    });

    it('validates percentage alpha values', () => {
      assert.equal(isValidHSL('hsla(120, 100%, 50%, 50%)'), true);
    });
  });

  describe('CSS Color Level 4: Modern space-separated syntax', () => {
    it('validates space-separated hsl() without alpha', () => {
      assert.equal(isValidHSL('hsl(120 100% 50%)'), true);
      assert.equal(isValidHSL('hsla(120 100% 50%)'), true);
    });

    it('validates space-separated hsl() with slash-separated alpha', () => {
      assert.equal(isValidHSL('hsl(120 100% 50% / 0.5)'), true);
      assert.equal(isValidHSL('hsl(120 100% 50% / 50%)'), true);
      assert.equal(isValidHSL('hsla(120 100% 50% / 0.5)'), true);
    });

    it('validates the "none" keyword', () => {
      assert.equal(isValidHSL('hsl(none 100% 50%)'), true);
      assert.equal(isValidHSL('hsl(120 none 50%)'), true);
      assert.equal(isValidHSL('hsl(120 100% none)'), true);
      assert.equal(isValidHSL('hsl(120 100% 50% / none)'), true);
      assert.equal(isValidHSL('hsl(none none none / none)'), true);
    });
  });

  describe('Formatting and Edge Cases', () => {
    it('handles decimal and scientific notation', () => {
      assert.equal(isValidHSL('hsl(120.5, 0%, 0%)'), true);
      assert.equal(isValidHSL('hsl(1e2, 2e1%, 3e0%)'), true);
      assert.equal(isValidHSL('hsl(1E2, 2E1%, 3E0%)'), true);
      assert.equal(isValidHSL('hsl(-1e2, 100%, 50%)'), true);
      assert.equal(isValidHSL('hsl(120 1e2% 5e1%)'), true);
      assert.equal(isValidHSL('hsla(120, 100%, 50%, 5e-1)'), true);
      assert.equal(isValidHSL('hsl(120 100% 50% / 5e-1)'), true);
    });

    it('tolerates heavy/irregular whitespace', () => {
      assert.equal(isValidHSL('hsl(  120  ,  100%  ,  50%  )'), true);
      assert.equal(isValidHSL('hsl(\t120,\n100%,\r50%)'), true);
      assert.equal(isValidHSL('hsl( 120   100%   50% /   0.5 )'), true);
      assert.equal(isValidHSL('  hsl(120, 100%, 50%)  '), true);
      assert.equal(isValidHSL('  hsl(120 100% 50% / 0.5)  '), true);
    });

    it('is case-insensitive', () => {
      assert.equal(isValidHSL('HSL(120, 100%, 50%)'), true);
      assert.equal(isValidHSL('HsLa(120DeG, 100%, 50%, 0.5)'), true);
    });

    it('validates positive sign prefix', () => {
      assert.equal(isValidHSL('hsl(+120 +100% +50%)'), true);
      assert.equal(isValidHSL('hsla(+120, +100%, +50%, +0.5)'), true);
    });

    it('handles out-of-bounds numbers', () => {
      assert.equal(isValidHSL('hsl(-120, 150%, -20%)'), true);
      assert.equal(isValidHSL('hsla(120, 100%, 50%, 1.5)'), true);
      assert.equal(isValidHSL('hsla(120, 100%, 50%, -0.5)'), true);
    });
  });

  describe('Invalid Syntax (Rejections)', () => {
    it('rejects missing percentages on saturation and lightness', () => {
      assert.equal(isValidHSL('hsl(120, 100, 50)'), false);
      assert.equal(isValidHSL('hsl(120 100 50)'), false);
    });

    it('rejects mixed syntaxes', () => {
      assert.equal(isValidHSL('hsl(120, 100% 50%)'), false);
      assert.equal(isValidHSL('hsl(120 100%, 50%)'), false);
    });

    it('rejects modern alpha syntax in legacy comma syntax', () => {
      assert.equal(isValidHSL('hsl(120, 100%, 50% / 0.5)'), false);
    });

    it('rejects legacy alpha syntax in modern space syntax', () => {
      assert.equal(isValidHSL('hsl(120 100% 50% , 0.5)'), false);
    });

    it('rejects invalid units', () => {
      assert.equal(isValidHSL('hsl(120px, 100%, 50%)'), false);
      assert.equal(isValidHSL('hsl(120, 100deg, 50%)'), false);
    });

    it('rejects incorrect parameter counts', () => {
      assert.equal(isValidHSL('hsl(120, 100%)'), false);
      assert.equal(isValidHSL('hsl(120, 100%, 50%, 0.5, 0.5)'), false);
      assert.equal(isValidHSL('hsl(120 100% 50% / 0.5 / 0.5)'), false);
    });

    it('rejects invalid number formats', () => {
      assert.equal(isValidHSL('hsl(120.5.5, 100%, 50%)'), false);
    });

    it('rejects malformed function wrappers', () => {
      assert.equal(isValidHSL('hsl120, 100%, 50%'), false);
      assert.equal(isValidHSL('hsl(120, 100%, 50%'), false);
      assert.equal(isValidHSL('120, 100%, 50%'), false);
      assert.equal(isValidHSL('rgb(120, 100%, 50%)'), false);
    });

    it('rejects empty or whitespace-only strings', () => {
      assert.equal(isValidHSL(''), false);
      assert.equal(isValidHSL('   '), false);
      assert.equal(isValidHSL('hsl()'), false);
    });

    it('rejects hue as a percentage', () => {
      assert.equal(isValidHSL('hsl(120%, 100%, 50%)'), false);
      assert.equal(isValidHSL('hsl(120% 100% 50%)'), false);
    });

    it('rejects extra text surrounding valid hsl()', () => {
      assert.equal(isValidHSL('hsl(120, 100%, 50%) extra'), false);
      assert.equal(isValidHSL('extra hsl(120, 100%, 50%)'), false);
    });

    it('rejects "none" in legacy comma-separated syntax', () => {
      assert.equal(isValidHSL('hsl(none, 100%, 50%)'), false);
      assert.equal(isValidHSL('hsl(120, none, 50%)'), false);
      assert.equal(isValidHSL('hsl(120, 100%, none)'), false);
      assert.equal(isValidHSL('hsla(none, none, none, none)'), false);
      assert.equal(isValidHSL('hsla(120, 100%, 50%, none)'), false);
    });
  });
  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidHSL(null as unknown as string), false);
      assert.equal(isValidHSL(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidHSL(0 as unknown as string), false);
      assert.equal(isValidHSL(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidHSL({} as unknown as string), false);
      assert.equal(isValidHSL([] as unknown as string), false);
    });
  });
});
