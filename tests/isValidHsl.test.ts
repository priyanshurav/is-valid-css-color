import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidHsl } from '../src/isValidHsl.js';

describe('isValidHsl()', () => {
  describe('CSS Color Level 3: Legacy comma-separated syntax', () => {
    it('validates basic hsl() with integers', () => {
      assert.equal(isValidHsl('hsl(120, 100%, 50%)'), true);
      assert.equal(isValidHsl('hsl(0, 0%, 0%)'), true);
      assert.equal(isValidHsl('hsl(360, 100%, 100%)'), true);
    });

    it('validates basic hsla() with integers and alpha', () => {
      assert.equal(isValidHsl('hsla(120, 100%, 50%, 1)'), true);
      assert.equal(isValidHsl('hsla(120, 100%, 50%, 0.5)'), true);
      assert.equal(isValidHsl('hsla(120, 100%, 50%, 0)'), true);
    });

    it('validates decimal values', () => {
      assert.equal(isValidHsl('hsl(120.5, 50.5%, 49.9%)'), true);
      assert.equal(isValidHsl('hsla(120, 100%, 50%, .5)'), true);
    });

    it('validates different angle units for hue', () => {
      assert.equal(isValidHsl('hsl(120deg, 100%, 50%)'), true);
      assert.equal(isValidHsl('hsl(200grad, 100%, 50%)'), true);
      assert.equal(isValidHsl('hsl(1.5rad, 100%, 50%)'), true);
      assert.equal(isValidHsl('hsl(0.5turn, 100%, 50%)'), true);
    });

    it('validates percentage alpha values', () => {
      assert.equal(isValidHsl('hsla(120, 100%, 50%, 50%)'), true);
    });

    it('validates hsl() with alpha values', () => {
      assert.equal(isValidHsl('hsl(120, 100%, 50%, 0.5)'), true);
      assert.equal(isValidHsl('hsl(120, 100%, 50%, 50%)'), true);
      assert.equal(isValidHsl('hsl(120, 100%, 50%, 150%)'), true);
      assert.equal(isValidHsl('hsl(120, 100%, 50%, -20%)'), true);
      assert.equal(isValidHsl('hsl(120, 100%, 50%, 1.0)'), true);
    });
  });

  describe('CSS Color Level 4: Modern space-separated syntax', () => {
    it('validates space-separated hsl() without alpha', () => {
      assert.equal(isValidHsl('hsl(120 100% 50%)'), true);
      assert.equal(isValidHsl('hsla(120 100% 50%)'), true);
    });

    it('validates space-separated hsl() with slash-separated alpha', () => {
      assert.equal(isValidHsl('hsl(120 100% 50% / 0.5)'), true);
      assert.equal(isValidHsl('hsl(120 100% 50% / 50%)'), true);
      assert.equal(isValidHsl('hsla(120 100% 50% / 0.5)'), true);
      assert.equal(isValidHsl('hsl(120 100% 50% / 1.0)'), true);
    });

    it('validates plain numbers (no %) for saturation and lightness', () => {
      assert.equal(isValidHsl('hsl(120 100 50)'), true);
      assert.equal(isValidHsl('hsl(270 60 50 / 0.5)'), true);
      assert.equal(isValidHsl('hsl(none 100 50)'), true);
      assert.equal(isValidHsl('hsl(120 none 50)'), true);
      assert.equal(isValidHsl('hsl(120 100 none)'), true);
    });

    it('validates the "none" keyword', () => {
      assert.equal(isValidHsl('hsl(none 100% 50%)'), true);
      assert.equal(isValidHsl('hsl(120 none 50%)'), true);
      assert.equal(isValidHsl('hsl(120 100% none)'), true);
      assert.equal(isValidHsl('hsl(120 100% 50% / none)'), true);
      assert.equal(isValidHsl('hsl(none none none / none)'), true);
    });

    it('validates out-of-range alpha values', () => {
      assert.equal(isValidHsl('hsl(120 100% 50% / 150%)'), true);
      assert.equal(isValidHsl('hsl(120 100% 50% / -20%)'), true);
      assert.equal(isValidHsl('hsl(120 100% 50% / 1.5)'), true);
      assert.equal(isValidHsl('hsl(120 100% 50% / -0.5)'), true);
    });
  });

  describe('Formatting and Edge Cases', () => {
    it('validates decimal and scientific notation', () => {
      assert.equal(isValidHsl('hsl(120.5, 0%, 0%)'), true);
      assert.equal(isValidHsl('hsl(1e2, 2e1%, 3e0%)'), true);
      assert.equal(isValidHsl('hsl(1E2, 2E1%, 3E0%)'), true);
      assert.equal(isValidHsl('hsl(-1e2, 100%, 50%)'), true);
      assert.equal(isValidHsl('hsl(120 1e2% 5e1%)'), true);
      assert.equal(isValidHsl('hsla(120, 100%, 50%, 5e-1)'), true);
      assert.equal(isValidHsl('hsl(120 100% 50% / 5e-1)'), true);

      assert.equal(isValidHsl('hsl(+1e2, +2e1%, +3e0%)'), true);
      assert.equal(isValidHsl('hsl(+1e2 +2e1% +3e0% / -1.5e0)'), true);
    });

    it('tolerates heavy/irregular whitespace', () => {
      assert.equal(isValidHsl('hsl(  120  ,  100%  ,  50%  )'), true);
      assert.equal(isValidHsl('hsl(\t120,\n100%,\r50%)'), true);
      assert.equal(isValidHsl('hsl( 120   100%   50% /   0.5 )'), true);
      assert.equal(isValidHsl('  hsl(120, 100%, 50%)  '), true);
      assert.equal(isValidHsl('  hsl(120 100% 50% / 0.5)  '), true);
    });

    it('is case-insensitive', () => {
      assert.equal(isValidHsl('HSL(120, 100%, 50%)'), true);
      assert.equal(isValidHsl('HsLa(120DeG, 100%, 50%, 0.5)'), true);
    });

    it('validates positive sign prefix', () => {
      assert.equal(isValidHsl('hsl(+120 +100% +50%)'), true);
      assert.equal(isValidHsl('hsla(+120, +100%, +50%, +0.5)'), true);
    });

    it('validates out-of-bounds values', () => {
      assert.equal(isValidHsl('hsl(-120, 150%, -20%)'), true);
      assert.equal(isValidHsl('hsl(999deg, 500%, -500%)'), true);
      assert.equal(isValidHsl('hsl(-10turn, 300%, 200%)'), true);
      assert.equal(isValidHsl('hsl(720, 50%, 50%)'), true);
      assert.equal(isValidHsl('hsl(720 50% 50%)'), true);

      assert.equal(isValidHsl('hsla(120, 100%, 50%, 1.5)'), true);
      assert.equal(isValidHsl('hsla(120, 100%, 50%, -0.5)'), true);
    });
  });

  describe('Invalid Syntax (Rejections)', () => {
    it('rejects missing percentages on saturation and lightness in legacy syntax', () => {
      assert.equal(isValidHsl('hsl(120, 100, 50)'), false);
    });

    it('rejects mixed syntaxes', () => {
      assert.equal(isValidHsl('hsl(120, 100% 50%)'), false);
      assert.equal(isValidHsl('hsl(120 100%, 50%)'), false);
      assert.equal(isValidHsl('hsl(none, none none)'), false);
    });

    it('rejects modern alpha syntax in legacy comma syntax', () => {
      assert.equal(isValidHsl('hsl(120, 100%, 50% / 0.5)'), false);
    });

    it('rejects legacy alpha syntax in modern space syntax', () => {
      assert.equal(isValidHsl('hsl(120 100% 50% , 0.5)'), false);
    });

    it('rejects invalid units', () => {
      assert.equal(isValidHsl('hsl(120px, 100%, 50%)'), false);
      assert.equal(isValidHsl('hsl(120, 100deg, 50%)'), false);
    });

    it('rejects incorrect parameter counts', () => {
      assert.equal(isValidHsl('hsl(120, 100%)'), false);
      assert.equal(isValidHsl('hsl(120, 100%, 50%, 0.5, 0.5)'), false);
      assert.equal(isValidHsl('hsl(120 100% 50% / 0.5 / 0.5)'), false);
    });

    it('rejects invalid number formats', () => {
      assert.equal(isValidHsl('hsl(120.5.5, 100%, 50%)'), false);
    });

    it('rejects malformed function wrappers', () => {
      assert.equal(isValidHsl('hsl120, 100%, 50%'), false);
      assert.equal(isValidHsl('hsl(120, 100%, 50%'), false);
      assert.equal(isValidHsl('120, 100%, 50%'), false);
      assert.equal(isValidHsl('rgb(120, 100%, 50%)'), false);
      assert.equal(isValidHsl('hsl (120, 100%, 50%)'), false);
      assert.equal(isValidHsl('hsla (120, 100%, 50%, 0.5)'), false);
      assert.equal(isValidHsl('hsl (120 100% 50%)'), false);
    });

    it('rejects empty or whitespace-only strings', () => {
      assert.equal(isValidHsl(''), false);
      assert.equal(isValidHsl('   '), false);
      assert.equal(isValidHsl('hsl()'), false);
    });

    it('rejects hue as a percentage', () => {
      assert.equal(isValidHsl('hsl(120%, 100%, 50%)'), false);
      assert.equal(isValidHsl('hsl(120% 100% 50%)'), false);
    });

    it('rejects extra text surrounding valid hsl()', () => {
      assert.equal(isValidHsl('hsl(120, 100%, 50%) extra'), false);
      assert.equal(isValidHsl('extra hsl(120, 100%, 50%)'), false);
    });

    it('rejects "none" in legacy comma-separated syntax', () => {
      assert.equal(isValidHsl('hsl(none, 100%, 50%)'), false);
      assert.equal(isValidHsl('hsl(120, none, 50%)'), false);
      assert.equal(isValidHsl('hsl(120, 100%, none)'), false);
      assert.equal(isValidHsl('hsla(none, none, none, none)'), false);
      assert.equal(isValidHsl('hsla(120, 100%, 50%, none)'), false);
    });

    it('rejects malformed none usage', () => {
      assert.equal(isValidHsl('hsl(none% 100% 50%)'), false);
      assert.equal(isValidHsl('hsl(120 none% 50%)'), false);
      assert.equal(isValidHsl('hsl(120 100% none%)'), false);
      assert.equal(isValidHsl('hsl(120 100% 50% / none%)'), false);
    });

    it('rejects malformed syntax and missing parentheses', () => {
      assert.equal(isValidHsl('hsl(120, 0, 0'), false);
      assert.equal(isValidHsl('(120, 0, 0)'), false);
      assert.equal(isValidHsl('hsl(0, 0, 0;)'), false);
      assert.equal(isValidHsl('hsl(120 100% 50% /)'), false);
    });
  });

  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidHsl(null as unknown as string), false);
      assert.equal(isValidHsl(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidHsl(0 as unknown as string), false);
      assert.equal(isValidHsl(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidHsl({} as unknown as string), false);
      assert.equal(isValidHsl([] as unknown as string), false);
    });
  });
});
