import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import * as validators from '../src/index.js';

describe('Type Validation (Rejections)', () => {
  for (const [name, validator] of Object.entries(validators)) {
    describe(`${name}()`, () => {
      it('rejects null and undefined', () => {
        assert.equal(validator(null as unknown as string), false);
        assert.equal(validator(undefined as unknown as string), false);
      });

      it('rejects numbers and booleans', () => {
        assert.equal(validator(0 as unknown as string), false);
        assert.equal(validator(true as unknown as string), false);
      });

      it('rejects objects and arrays', () => {
        assert.equal(validator({} as unknown as string), false);
        assert.equal(validator([] as unknown as string), false);
      });
    });
  }
});
