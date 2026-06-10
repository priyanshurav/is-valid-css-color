import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidHex } from '../src/isValidHex.js';

describe('isValidHex()', () => {
  describe('CSS Color Level 3: Basic Hex Syntax', () => {
    it('validates basic 3-digit hex', () => {
      assert.equal(isValidHex('#000'), true);
      assert.equal(isValidHex('#fff'), true);
      assert.equal(isValidHex('#19f'), true);
    });

    it('validates basic 6-digit hex', () => {
      assert.equal(isValidHex('#000000'), true);
      assert.equal(isValidHex('#ffffff'), true);
      assert.equal(isValidHex('#123456'), true);
    });
  });

  describe('CSS Color Level 4: Hex with Alpha', () => {
    it('validates 4-digit hex with alpha', () => {
      assert.equal(isValidHex('#0000'), true);
      assert.equal(isValidHex('#ffff'), true);
      assert.equal(isValidHex('#19fA'), true);
    });

    it('validates 8-digit hex with alpha', () => {
      assert.equal(isValidHex('#00000000'), true);
      assert.equal(isValidHex('#ffffffff'), true);
      assert.equal(isValidHex('#12345678'), true);
    });
  });

  describe('Formatting and Edge Cases', () => {
    it('is case-insensitive', () => {
      assert.equal(isValidHex('#FFF'), true);
      assert.equal(isValidHex('#aB3'), true);
      assert.equal(isValidHex('#FFFF'), true);
      assert.equal(isValidHex('#aB3f'), true);
      assert.equal(isValidHex('#FFFFFF'), true);
      assert.equal(isValidHex('#aB3dEf'), true);
      assert.equal(isValidHex('#FFFFFFFF'), true);
      assert.equal(isValidHex('#aB3dEf88'), true);
    });

    it('tolerates surrounding whitespace', () => {
      assert.equal(isValidHex(' #fff'), true);
      assert.equal(isValidHex('#fff '), true);
      assert.equal(isValidHex('\n#ffffff'), true);
      assert.equal(isValidHex('#ffffff\n'), true);
    });
  });

  describe('Invalid Syntax (Rejections)', () => {
    it('rejects missing hash symbol', () => {
      assert.equal(isValidHex('000'), false);
      assert.equal(isValidHex('fff'), false);
      assert.equal(isValidHex('0000'), false);
      assert.equal(isValidHex('000000'), false);
      assert.equal(isValidHex('ffffffff'), false);
    });

    it('rejects invalid lengths', () => {
      assert.equal(isValidHex('#'), false);
      assert.equal(isValidHex('#1'), false);
      assert.equal(isValidHex('#12'), false);
      assert.equal(isValidHex('#12345'), false);
      assert.equal(isValidHex('#1234567'), false);
      assert.equal(isValidHex('#123456789'), false);
    });

    it('rejects non-hexadecimal characters', () => {
      assert.equal(isValidHex('#12345g'), false);
      assert.equal(isValidHex('#G00000'), false);
      assert.equal(isValidHex('#zzz'), false);
      assert.equal(isValidHex('#12!'), false);
      assert.equal(isValidHex('#-12345'), false);
      assert.equal(isValidHex('#@FFFFF'), false);
    });

    it('rejects empty or whitespace-only strings', () => {
      assert.equal(isValidHex(''), false);
      assert.equal(isValidHex(' '), false);
    });

    it('rejects internal whitespace', () => {
      assert.equal(isValidHex('#ff ff'), false);
    });

    it('rejects misplaced or multiple hash symbols', () => {
      assert.equal(isValidHex('000#'), false);
      assert.equal(isValidHex('#ff#fff'), false);
      assert.equal(isValidHex('##ffffff'), false);
      assert.equal(isValidHex('f#ff'), false);
    });

    it('rejects extra text surrounding valid hex', () => {
      assert.equal(isValidHex('#fff extra'), false);
      assert.equal(isValidHex('extra #fff'), false);
    });
  });
  describe('Type Validation (Rejections)', () => {
    it('rejects null and undefined', () => {
      assert.equal(isValidHex(null as unknown as string), false);
      assert.equal(isValidHex(undefined as unknown as string), false);
    });

    it('rejects numbers and booleans', () => {
      assert.equal(isValidHex(0 as unknown as string), false);
      assert.equal(isValidHex(true as unknown as string), false);
    });

    it('rejects objects and arrays', () => {
      assert.equal(isValidHex({} as unknown as string), false);
      assert.equal(isValidHex([] as unknown as string), false);
    });
  });
});
