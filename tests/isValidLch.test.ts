import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidLch } from '../src/isValidLch.js';

describe('isValidLch()', () => {
  describe('CSS Color Level 4: Space-separated LCH Syntax', () => {
    it('validates standard syntax', () => {
      assert.equal(isValidLch('lch(50% 40 320)'), true);
      assert.equal(isValidLch('lch(50 40 320)'), true);
      assert.equal(isValidLch('lch(100% 0 0)'), true);
      assert.equal(isValidLch('lch(0% 0 0)'), true);
    });

    it('validates chroma as a percentage', () => {
      assert.equal(isValidLch('lch(50% 40% 320)'), true);
      assert.equal(isValidLch('lch(50 100% 320)'), true);
    });

    it('validates alpha channels (numbers and percentages)', () => {
      assert.equal(isValidLch('lch(50% 40 320 / 0.5)'), true);
      assert.equal(isValidLch('lch(50% 40 320 / 50%)'), true);
      assert.equal(isValidLch('lch(50% 40 320 / 1)'), true);
      assert.equal(isValidLch('lch(50% 40 320 / 0)'), true);
      assert.equal(isValidLch('lch(50% 40 320 / .5)'), true);
      assert.equal(isValidLch('lch(50% 40 320 / 150%)'), true);
      assert.equal(isValidLch('lch(50% 40 320 / -20%)'), true);
      assert.equal(isValidLch('lch(50% 40 320 / 1.5)'), true);
      assert.equal(isValidLch('lch(50% 40 320 / -0.5)'), true);
    });

    it('validates decimal and signed values', () => {
      assert.equal(isValidLch('lch(50.5% 40.1 320.9)'), true);
      assert.equal(isValidLch('lch(.5% .1 .9)'), true);
      assert.equal(isValidLch('lch(-50.5% -40.1 -320.9)'), true);
      assert.equal(isValidLch('lch(+50.5% +40.1 +320.9)'), true);
    });

    it('validates various hue units', () => {
      assert.equal(isValidLch('lch(50% 40 320deg)'), true);
      assert.equal(isValidLch('lch(50% 40 5.5rad)'), true);
      assert.equal(isValidLch('lch(50% 40 400grad)'), true);
      assert.equal(isValidLch('lch(50% 40 1turn)'), true);
      assert.equal(isValidLch('lch(50% 40 -0.5turn)'), true);
    });

    it('validates the "none" keyword', () => {
      assert.equal(isValidLch('lch(none 40 320)'), true);
      assert.equal(isValidLch('lch(50% none 320)'), true);
      assert.equal(isValidLch('lch(50% 40 none)'), true);
      assert.equal(isValidLch('lch(none none none)'), true);
      assert.equal(isValidLch('lch(50% 40 320 / none)'), true);
      assert.equal(isValidLch('lch(none none none / none)'), true);
    });

    it('validates scientific notation in numeric values', () => {
      assert.equal(isValidLch('lch(5e1% 4e1 3.2e2)'), true);
      assert.equal(isValidLch('lch(5e1 4e1 3.2e2)'), true);
      assert.equal(isValidLch('lch(-5e1% -4e1 -3.2e2)'), true);
      assert.equal(isValidLch('lch(5e1% 4e1 3.2e2 / 5e-1)'), true);
      assert.equal(isValidLch('lch(5E1% 4E1 3.2E2)'), true);
      assert.equal(isValidLch('lch(+5e1% +4e1 +3.2e2)'), true);
      assert.equal(isValidLch('lch(+5e1% +4e1 +3.2e2 / -5e-1)'), true);
    });
  });

  describe('Formatting and Edge Cases', () => {
    it('tolerates extreme whitespace', () => {
      assert.equal(isValidLch('lch(  50%   40   320  )'), true);
      assert.equal(isValidLch('lch(50% 40 320/0.5)'), true);
      assert.equal(isValidLch('lch(\n50%\t40 \r320\n)'), true);
      assert.equal(isValidLch('lch(50% 40 320 /  0.5  )'), true);
      assert.equal(isValidLch('  lch(50% 40 320)  '), true);
      assert.equal(isValidLch('  lch(50% 40 320 / 0.5)  '), true);
    });

    it('is case-insensitive', () => {
      assert.equal(isValidLch('LCH(50% 40 320)'), true);
      assert.equal(isValidLch('lcH(50% 40 320DeG)'), true);
      assert.equal(isValidLch('Lch(50% 40 320 / 50%)'), true);
      assert.equal(isValidLch('lch(NONE 40 320)'), true);
    });

    it('validates out-of-bounds values', () => {
      assert.equal(isValidLch('lch(-500% 1000 -1000)'), true);
      assert.equal(isValidLch('lch(500% -1000 10000deg)'), true);
      assert.equal(isValidLch('lch(50% 40 320 / -0.5)'), true);
      assert.equal(isValidLch('lch(50% 40 320 / 150%)'), true);
    });
  });

  describe('Invalid Syntax (Rejections)', () => {
    it('rejects comma-separated values', () => {
      assert.equal(isValidLch('lch(50%, 40, 320)'), false);
      assert.equal(isValidLch('lch(50%, 40, 320, 0.5)'), false);
      assert.equal(isValidLch('lch(50% 40, 320)'), false);
    });

    it('rejects missing or excessive arguments', () => {
      assert.equal(isValidLch('lch()'), false);
      assert.equal(isValidLch('lch(50%)'), false);
      assert.equal(isValidLch('lch(50% 40)'), false);
      assert.equal(isValidLch('lch(50% 40 320 0.5)'), false);
      assert.equal(isValidLch('lch(50% 40 320 / 0.5 / 0.5)'), false);
      assert.equal(isValidLch('lch(50% 40 320 0.5 / 0.5)'), false);
    });

    it('rejects malformed syntax and structural errors', () => {
      assert.equal(isValidLch('lch(50% 40 320'), false);
      assert.equal(isValidLch('lch(50% 40 320))'), false);
      assert.equal(isValidLch('50% 40 320'), false);
      assert.equal(isValidLch('lchl(50% 40 320)'), false);
      assert.equal(isValidLch('lch(50% 40 320 /)'), false);
      assert.equal(isValidLch('lch(/ 50% 40 320)'), false);
      assert.equal(isValidLch('lch(50% / 40 320)'), false);
      assert.equal(isValidLch('lch (50% 40 320)'), false);
    });

    it('rejects invalid units and characters', () => {
      assert.equal(isValidLch('lch(50px 40 320)'), false);
      assert.equal(isValidLch('lch(50% 40px 320)'), false);
      assert.equal(isValidLch('lch(50% 40deg 320)'), false);
      assert.equal(isValidLch('lch(50% 40rad 320)'), false);
      assert.equal(isValidLch('lch(50% 40 320px)'), false);
      assert.equal(isValidLch('lch(red 40 320)'), false);
      assert.equal(isValidLch('lch(50% 40 320 / 50px)'), false);
      assert.equal(isValidLch('lch(50% 40 320#)'), false);
    });

    it('rejects invalid number formats', () => {
      assert.equal(isValidLch('lch(+-50% 40 320)'), false);
      assert.equal(isValidLch('lch(50.5.5% 40 320)'), false);
      assert.equal(isValidLch('lch(.% 40 320)'), false);
    });

    it('rejects hue as a percentage', () => {
      assert.equal(isValidLch('lch(50% 40 320%)'), false);
    });

    it('rejects extra text surrounding valid lch()', () => {
      assert.equal(isValidLch('lch(50% 40 320) extra'), false);
      assert.equal(isValidLch('extra lch(50% 40 320)'), false);
    });

    it('rejects malformed none usage', () => {
      assert.equal(isValidLch('lch(none, 40, 320)'), false);
      assert.equal(isValidLch('lch(none 40)'), false);
      assert.equal(isValidLch('lch(none% 40 320)'), false);
      assert.equal(isValidLch('lch(50% none% 320)'), false);
      assert.equal(isValidLch('lch(50% 40 none%)'), false);
      assert.equal(isValidLch('lch(50% 40 320 / none%)'), false);
    });
  });
  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidLch(null as unknown as string), false);
      assert.equal(isValidLch(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidLch(0 as unknown as string), false);
      assert.equal(isValidLch(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidLch({} as unknown as string), false);
      assert.equal(isValidLch([] as unknown as string), false);
    });
  });
});
