import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { check } from 'recheck';
import { rgbRegex } from '../src/isValidRgb.js';
import { hslRegex } from '../src/isValidHsl.js';
import { hexRegex } from '../src/isValidHex.js';
import { hwbRegex } from '../src/isValidHwb.js';
import { labRegex } from '../src/isValidLab.js';
import { lchRegex } from '../src/isValidLch.js';
import { oklabRegex } from '../src/isValidOklab.js';
import { oklchRegex } from '../src/isValidOklch.js';
import { colorNotationRegex } from '../src/isValidColorNotation.js';

const regexes: Record<string, RegExp> = {
  rgb: rgbRegex,
  hsl: hslRegex,
  hex: hexRegex,
  hwb: hwbRegex,
  lab: labRegex,
  lch: lchRegex,
  oklab: oklabRegex,
  oklch: oklchRegex,
  color: colorNotationRegex,
};

describe('ReDoS safety', { skip: process.env['RUN_REDOS_CHECKS'] !== 'true' }, () => {
  for (const [name, regex] of Object.entries(regexes)) {
    it(`${name}Regex has no catastrophic backtracking`, async () => {
      const result = await check(regex.source, regex.flags, { timeout: 30000 });
      assert.equal(result.status, 'safe', `${name}Regex flagged as ${result.status}: ${JSON.stringify(result)}`);
    });
  }
});
