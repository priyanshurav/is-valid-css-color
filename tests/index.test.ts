import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import * as esm from '../src/index.js';
import { isValidCssColor } from '../src/index.js';

const require = createRequire(import.meta.url);

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

  describe('Whitespace-free separators (token boundaries)', () => {
    it('delegates spec-valid syntax with no whitespace between tokens', () => {
      assert.equal(isValidCssColor('rgb(1%2%3%)'), true);
      assert.equal(isValidCssColor('hsl(120 100%50%)'), true);
      assert.equal(isValidCssColor('hwb(120 10%20%)'), true);
      assert.equal(isValidCssColor('lab(50%40%30%)'), true);
      assert.equal(isValidCssColor('lch(50%40%320)'), true);
      assert.equal(isValidCssColor('oklab(59%10%10%)'), true);
      assert.equal(isValidCssColor('oklch(50%20%120)'), true);
      assert.equal(isValidCssColor('color(srgb 1%2%3%)'), true);
    });

    it('still rejects glued tokens that merge or break the grammar', () => {
      assert.equal(isValidCssColor('rgb(1none 2 3)'), false);
      assert.equal(isValidCssColor('hsl(120deg2% 3%)'), false);
      assert.equal(isValidCssColor('color(srgb1 2 3)'), false);
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

    it('trims all CSS whitespace characters (space, tab, LF, CR, form feed)', () => {
      assert.equal(isValidCssColor('\fred\f'), true);
      assert.equal(isValidCssColor('\r\nrgb(255, 0, 0)\r\n'), true);
      assert.equal(isValidCssColor('\t\n\r\f red \t\n\r\f'), true);
    });

    it('rejects whitespace-only input', () => {
      assert.equal(isValidCssColor(' '.repeat(3)), false);
      assert.equal(isValidCssColor('\t\n'), false);
    });

    it('does not trim non-CSS whitespace characters', () => {
      assert.equal(isValidCssColor('\u{A0}red'), false);
      assert.equal(isValidCssColor('red\u{A0}'), false);
      assert.equal(isValidCssColor('\vred'), false);
      assert.equal(isValidCssColor('\u{2028}red\u{2029}'), false);
      assert.equal(isValidCssColor('\u{3000}red\u{3000}'), false);
      assert.equal(isValidCssColor('\u{FEFF}red'), false);
      assert.equal(isValidCssColor('\u{A0}rgb(255, 0, 0)\u{A0}'), false);
      assert.equal(isValidCssColor('\u{A0}'.repeat(3)), false);
    });
  });

  describe('Invalid Inputs (Rejections)', () => {
    it('rejects strings no validator accepts', () => {
      assert.equal(isValidCssColor(''), false);
      assert.equal(isValidCssColor('notacolor'), false);
      assert.equal(isValidCssColor('rgb(255 0 0'), false);
      assert.equal(isValidCssColor('##ffffff'), false);
    });

    it('rejects CSS-wide keywords (they are not <color> values)', () => {
      assert.equal(isValidCssColor('inherit'), false);
      assert.equal(isValidCssColor('initial'), false);
      assert.equal(isValidCssColor('unset'), false);
      assert.equal(isValidCssColor('revert'), false);
    });

    it('rejects unimplemented modern CSS color functions', () => {
      assert.equal(isValidCssColor('var(--my-color)'), false);
      assert.equal(isValidCssColor('color-mix(in srgb, red 50%, blue 50%)'), false);
      assert.equal(isValidCssColor('light-dark(white, black)'), false);
      assert.equal(isValidCssColor('color(from red srgb r g b)'), false);
    });

    it('rejects Unicode look-alikes after whitespace trimming', () => {
      assert.equal(isValidCssColor('  blac\u212A  '), false);
      assert.equal(isValidCssColor(' h\u017Fl(120 100% 50%) '), false);
    });
  });
});

describe('CommonJS interop', () => {
  const cjs = require('../dist/index.cjs');

  it('exposes isValidCssColor as a named export under require()', () => {
    assert.equal(typeof cjs.isValidCssColor, 'function');
    assert.equal(cjs.isValidCssColor('rebeccapurple'), true);
    assert.equal(cjs.isValidCssColor('#ff0000ff'), true);
    assert.equal(cjs.isValidCssColor('rgb(255 0 0 / 50%)'), true);
    assert.equal(cjs.isValidCssColor('not-a-color'), false);
  });

  it('exposes every named export from the ESM build under require()', () => {
    const expectedNames = Object.keys(esm).filter(
      (name) => typeof (esm as Record<string, unknown>)[name] === 'function'
    );

    assert.ok(expectedNames.length > 0, 'expected the ESM module to export at least one function');

    for (const name of expectedNames) {
      assert.equal(typeof cjs[name], 'function', `expected cjs.${name} to be a function`);
    }
  });

  it('agrees with the ESM build on representative inputs', () => {
    const samples = [
      'red',
      '#fff',
      'rgb(255, 0, 0)',
      'hsl(120 100% 50% / 0.5)',
      'oklch(0.5 0.2 120)',
      'color(display-p3 0.5 0.5 0.5 / 0.8)',
      'notacolor',
    ];

    for (const sample of samples) {
      assert.equal(
        cjs.isValidCssColor(sample),
        isValidCssColor(sample),
        `mismatch between ESM and CJS builds for input: ${sample}`
      );
    }
  });
});
