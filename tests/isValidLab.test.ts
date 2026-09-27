import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidLab } from '../src/isValidLab.js';

describe('isValidLab()', () => {
  describe('CSS Color Level 4: Space-separated LAB Syntax', () => {
    it('validates basic numerical values (integers and floats)', () => {
      assert.equal(isValidLab('lab(50 40 30)'), true);
      assert.equal(isValidLab('lab(0 0 0)'), true);
      assert.equal(isValidLab('lab(100 0 0)'), true);
      assert.equal(isValidLab('lab(50.5 40.2 -30.1)'), true);
      assert.equal(isValidLab('lab(.5 .2 -.1)'), true);
    });

    it('validates negative values for axes', () => {
      assert.equal(isValidLab('lab(50 -40 -30)'), true);
      assert.equal(isValidLab('lab(50 -128 127)'), true);
      assert.equal(isValidLab('lab(-50 40 30)'), true);
    });

    it('validates percentage values and mixed types', () => {
      assert.equal(isValidLab('lab(50% 40% 30%)'), true);
      assert.equal(isValidLab('lab(100% 0% 0%)'), true);
      assert.equal(isValidLab('lab(0% 0% 0%)'), true);
      assert.equal(isValidLab('lab(50.5% -40.2% 30.1%)'), true);
      assert.equal(isValidLab('lab(50% 40 30)'), true);
      assert.equal(isValidLab('lab(50 40% 30)'), true);
      assert.equal(isValidLab('lab(50 40 30%)'), true);
    });

    it('validates alpha channels (numbers and percentages)', () => {
      assert.equal(isValidLab('lab(50 40 30 / 1)'), true);
      assert.equal(isValidLab('lab(50 40 30 / 0.5)'), true);
      assert.equal(isValidLab('lab(50 40 30 / .5)'), true);
      assert.equal(isValidLab('lab(50 40 30 / 100%)'), true);
      assert.equal(isValidLab('lab(50 40 30 / 50.5%)'), true);
      assert.equal(isValidLab('lab(50 40 30 / 0%)'), true);
      assert.equal(isValidLab('lab(50 40 30 / 150%)'), true);
      assert.equal(isValidLab('lab(50 40 30 / -20%)'), true);
      assert.equal(isValidLab('lab(50 40 30 / 1.5)'), true);
      assert.equal(isValidLab('lab(50 40 30 / -0.5)'), true);
      assert.equal(isValidLab('lab(50 40 30 / 1.0)'), true);
    });

    it('validates the "none" keyword', () => {
      assert.equal(isValidLab('lab(none 40 30)'), true);
      assert.equal(isValidLab('lab(50 none 30)'), true);
      assert.equal(isValidLab('lab(50 40 none)'), true);
      assert.equal(isValidLab('lab(none none none)'), true);
      assert.equal(isValidLab('lab(50 40 30 / none)'), true);
      assert.equal(isValidLab('lab(none none none / none)'), true);
    });

    it('validates scientific notation in numeric values', () => {
      assert.equal(isValidLab('lab(5e1 4e1 3e1)'), true);
      assert.equal(isValidLab('lab(5e-1 4e-1 3e-1)'), true);
      assert.equal(isValidLab('lab(5E1 4E1 3E1)'), true);
      assert.equal(isValidLab('lab(+5e1 +4e1 +3e1)'), true);
      assert.equal(isValidLab('lab(+5e1 +4e1 +3e1 / -5e-1)'), true);
    });

    it('validates exponential numbers without an explicit integer mantissa', () => {
      assert.equal(isValidLab('lab(.5e2 .4e2 .3e2)'), true);
      assert.equal(isValidLab('lab(-.5e-2 40 30)'), true);
      assert.equal(isValidLab('lab(50 40 30 / .5e0)'), true);
    });

    it('validates negative zero', () => {
      assert.equal(isValidLab('lab(-0 -0 -0)'), true);
      assert.equal(isValidLab('lab(-0% -0% -0%)'), true);
      assert.equal(isValidLab('lab(-0 -0 -0 / -0)'), true);
    });
  });

  describe('Formatting and Edge Cases', () => {
    it('tolerates extreme whitespace', () => {
      assert.equal(isValidLab('lab(  50   40   30  )'), true);
      assert.equal(isValidLab('lab(50 40 30/0.5)'), true);
      assert.equal(isValidLab('lab(50  40  30  /  0.5)'), true);
      assert.equal(isValidLab('lab( 50% 40% 30% / 10% )'), true);
      assert.equal(isValidLab('  lab(50 40 30)  '), true);
      assert.equal(isValidLab('lab(\t50\n40\r30\t)'), true);
      assert.equal(isValidLab('lab(\f50\f40\f30\f/\f0.5\f)'), true);
    });

    it('is case-insensitive', () => {
      assert.equal(isValidLab('LAB(50 40 30)'), true);
      assert.equal(isValidLab('Lab(50 40 30)'), true);
      assert.equal(isValidLab('lAb(50 40 30)'), true);
      assert.equal(isValidLab('lab(50 40 30 / 0.5)'), true);
      assert.equal(isValidLab('LAB(NONE NONE NONE)'), true);
      assert.equal(isValidLab('lab(50E1 40e1 30)'), true);
    });

    it('validates positive sign prefix', () => {
      assert.equal(isValidLab('lab(+50 +40 +30)'), true);
      assert.equal(isValidLab('lab(+50% +40% +30%)'), true);
      assert.equal(isValidLab('lab(+50 +40 +30 / +0.5)'), true);
    });

    it('validates out-of-bounds values', () => {
      assert.equal(isValidLab('lab(-1000 500 -500)'), true);
      assert.equal(isValidLab('lab(500% -500% 1000%)'), true);
      assert.equal(isValidLab('lab(50 40 30 / -0.5)'), true);
      assert.equal(isValidLab('lab(50 40 30 / 150%)'), true);
    });
  });

  describe('Invalid Syntax (Rejections)', () => {
    it('rejects missing arguments', () => {
      assert.equal(isValidLab('lab(50 40)'), false);
      assert.equal(isValidLab('lab(50)'), false);
      assert.equal(isValidLab('lab()'), false);
    });

    it('rejects excessive arguments', () => {
      assert.equal(isValidLab('lab(50 40 30 20)'), false);
      assert.equal(isValidLab('lab(50 40 30 20 10)'), false);
      assert.equal(isValidLab('lab(50 40 30 / 0.5 0.5)'), false);
      assert.equal(isValidLab('lab(50 40 30 / 0.5 / 0.5)'), false);
    });

    it('rejects comma-separated values', () => {
      assert.equal(isValidLab('lab(50, 40, 30)'), false);
      assert.equal(isValidLab('lab(50, 40, 30, 0.5)'), false);
      assert.equal(isValidLab('lab(50, 40, 30 / 0.5)'), false);
      assert.equal(isValidLab('lab(50 40 30, 0.5)'), false);
    });

    it('rejects invalid alpha syntax', () => {
      assert.equal(isValidLab('lab(50 40 30 0.5)'), false);
      assert.equal(isValidLab('lab(50 40 30 /)'), false);
      assert.equal(isValidLab('lab(50 40 30 / / 0.5)'), false);
      assert.equal(isValidLab('lab(/ 50 40 30)'), false);
      assert.equal(isValidLab('lab(50 / 40 30)'), false);
    });

    it('rejects invalid units', () => {
      assert.equal(isValidLab('lab(50px 40 30)'), false);
      assert.equal(isValidLab('lab(50 40deg 30)'), false);
      assert.equal(isValidLab('lab(50 40 30rad)'), false);
      assert.equal(isValidLab('lab(50 40 30 / 50px)'), false);
    });

    it('rejects malformed syntax and mismatched parentheses', () => {
      assert.equal(isValidLab('lab(50 40 30'), false);
      assert.equal(isValidLab('lab(50 40 30 / 0.5'), false);
      assert.equal(isValidLab('lab(50 40 30))'), false);
      assert.equal(isValidLab('lab((50) 40 30)'), false);
      assert.equal(isValidLab('lab (50 40 30)'), false);
    });

    it('rejects incorrect function names', () => {
      assert.equal(isValidLab('lch(50 40 30)'), false);
      assert.equal(isValidLab('rgb(50 40 30)'), false);
      assert.equal(isValidLab('color(lab 50 40 30)'), false);
      assert.equal(isValidLab('oklab(50 40 30)'), false);
    });

    it('rejects invalid types and garbage text', () => {
      assert.equal(isValidLab('lab(true 40 30)'), false);
      assert.equal(isValidLab('lab(50 "40" 30)'), false);
      assert.equal(isValidLab('lab(50 40 NaN)'), false);
      assert.equal(isValidLab('lab(50 40 Infinity)'), false);
      assert.equal(isValidLab('lab(null 40 30)'), false);
      assert.equal(isValidLab('lab(undefined 40 30)'), false);
      assert.equal(isValidLab('lab(abc def ghi)'), false);
    });

    it('rejects empty or whitespace-only strings', () => {
      assert.equal(isValidLab(''), false);
      assert.equal(isValidLab(' '.repeat(3)), false);
      assert.equal(isValidLab('lab'), false);
    });

    it('rejects invalid number formats', () => {
      assert.equal(isValidLab('lab(50.5.5 40 30)'), false);
    });

    it('rejects extra text surrounding valid lab()', () => {
      assert.equal(isValidLab('lab(50 40 30) extra'), false);
      assert.equal(isValidLab('extra lab(50 40 30)'), false);
    });

    it('rejects misplaced none keywords', () => {
      assert.equal(isValidLab('lab(none 40)'), false);
      assert.equal(isValidLab('lab(none, 40, 30)'), false);
      assert.equal(isValidLab('lab(none 40)'), false);
      assert.equal(isValidLab('lab(none% 40 30)'), false);
      assert.equal(isValidLab('lab(50 none% 30)'), false);
      assert.equal(isValidLab('lab(50 40 none%)'), false);
      assert.equal(isValidLab('lab(50 40 30 / none%)'), false);
    });

    it('rejects non-CSS whitespace characters', () => {
      assert.equal(isValidLab('lab(50\u{A0}40\u{A0}30)'), false);
      assert.equal(isValidLab('lab(50\v40\v30)'), false);
      assert.equal(isValidLab('lab(50\u{2028}40\u{2028}30)'), false);
      assert.equal(isValidLab('lab(50\u{3000}40\u{3000}30)'), false);
      assert.equal(isValidLab('\u{A0}lab(50 40 30)'), false);
      assert.equal(isValidLab('lab(50 40 30)\u{A0}'), false);
      assert.equal(isValidLab('lab(50 40 30\u{A0}/ 0.5)'), false);
      assert.equal(isValidLab('lab(\u{FEFF}50 40 30)'), false);
    });
  });
});
