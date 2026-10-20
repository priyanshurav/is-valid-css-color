import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { toAsciiLowercase, trim } from '../src/utils.js';
import { CHARS } from './fixtures/chars.js';

const mixedWhitespace = Object.values(CHARS.STRIPPED_WHITESPACE).join('');

describe('utils/trim()', () => {
  describe('Core functionality', () => {
    it('returns an empty string when provided an empty string', () => {
      assert.equal(trim(''), '');
    });

    it('returns the exact string when there is no whitespace', () => {
      assert.equal(trim('hello-world'), 'hello-world');
    });

    it('does not modify internal whitespace', () => {
      assert.equal(trim('hello \t \n world'), 'hello \t \n world');
    });
  });

  describe('Target whitespace (should be trimmed)', () => {
    for (const [name, char] of Object.entries(CHARS.STRIPPED_WHITESPACE)) {
      it(`trims ${name} leading, trailing, both sides, and as a whole string`, () => {
        assert.equal(trim(`${char}hello`), 'hello');
        assert.equal(trim(`hello${char}`), 'hello');
        assert.equal(trim(`${char}hello${char}`), 'hello');
        assert.equal(trim(char.repeat(3)), '');
      });
    }

    it('trims a complex mixture of all target whitespaces at both ends', () => {
      assert.equal(trim(`${mixedWhitespace}content${mixedWhitespace}`), 'content');
    });

    it('reduces a string composed entirely of mixed target whitespace to empty', () => {
      assert.equal(trim(mixedWhitespace), '');
    });
  });

  describe('Non-target whitespace (should NOT be trimmed)', () => {
    for (const [name, char] of Object.entries(CHARS.PRESERVED_WHITESPACE)) {
      it(`leaves ${name} untouched leading, trailing, and as a whole string`, () => {
        assert.equal(trim(`${char}hello`), `${char}hello`);
        assert.equal(trim(`hello${char}`), `hello${char}`);
        assert.equal(trim(char.repeat(3)), char.repeat(3));
      });
    }

    it('trims target whitespace up to but not through adjacent non-target whitespace', () => {
      assert.equal(trim(' \vhello\v '), '\vhello\v');
    });
  });

  describe('Edge cases', () => {
    it('handles a single character string of target whitespace', () => {
      assert.equal(trim(' '), '');
    });

    it('handles a single character string of non-target whitespace', () => {
      const { NO_BREAK_SPACE } = CHARS.PRESERVED_WHITESPACE;
      assert.equal(trim(NO_BREAK_SPACE), NO_BREAK_SPACE);
    });

    it('preserves emoji and surrogate pairs while trimming surrounding target whitespace', () => {
      assert.equal(trim(' \t😀 café 日本語\n'), '😀 café 日本語');
    });

    it('is idempotent: trimming an already-trimmed string is a no-op', () => {
      const once = trim(' \thello\n\r');
      assert.equal(once, 'hello');
      assert.equal(trim(once), once);
    });

    it('handles extremely large strings with extensive padding', () => {
      const pad = mixedWhitespace.repeat(10_000);
      assert.equal(trim(`${pad}core${pad}`), 'core');
    });
  });
});

describe('utils/toAsciiLowercase()', () => {
  describe('Core ASCII Functionality', () => {
    it('returns an empty string when given an empty string', () => {
      assert.equal(toAsciiLowercase(''), '');
    });

    it('returns the exact same string if already lowercase (Zero Allocation path)', () => {
      const input = 'hello world';
      assert.equal(toAsciiLowercase(input), input);
    });

    it('converts fully uppercase ASCII strings to lowercase', () => {
      assert.equal(toAsciiLowercase('HELLO WORLD'), 'hello world');
    });

    it('handles mixed case ASCII strings', () => {
      assert.equal(toAsciiLowercase('HeLlO WoRlD'), 'hello world');
    });
  });

  describe('Non-Alphabet ASCII Characters', () => {
    it('ignores numbers', () => {
      assert.equal(toAsciiLowercase('A1B2C3D4'), 'a1b2c3d4');
      assert.equal(toAsciiLowercase('1234567890'), '1234567890');
    });

    it('ignores ASCII punctuation and symbols', () => {
      assert.equal(toAsciiLowercase('!@#$ %^&*()'), '!@#$ %^&*()');
      assert.equal(toAsciiLowercase('[HELLO]'), '[hello]');
    });

    it('ignores ASCII control characters (newlines, tabs, spaces)', () => {
      assert.equal(toAsciiLowercase(' \n\t\r '), ' \n\t\r ');
      assert.equal(toAsciiLowercase('\nHELLO\t'), '\nhello\t');
    });
  });

  describe('Confusable / Look-Alike Unicode Characters', () => {
    const { KELVIN_SIGN, CYRILLIC_CAPITAL_A, ANGSTROM_SIGN, GREEK_CAPITAL_MU } = CHARS.LOOKALIKES;

    it('ignores the Kelvin sign (U+212A), which native toLowerCase turns into "k"', () => {
      assert.equal(toAsciiLowercase(`K${KELVIN_SIGN}`), `k${KELVIN_SIGN}`);
    });

    it('ignores Cyrillic capital A (U+0410), which looks identical to ASCII A', () => {
      assert.equal(toAsciiLowercase(`A${CYRILLIC_CAPITAL_A}`), `a${CYRILLIC_CAPITAL_A}`);
    });

    it('ignores Fullwidth Latin capital letters (U+FF21 to U+FF23)', () => {
      const fullwidth = 'ＡＢＣ';
      assert.equal(toAsciiLowercase(fullwidth), fullwidth);
    });

    it('ignores the Angstrom sign (U+212B)', () => {
      assert.equal(toAsciiLowercase(ANGSTROM_SIGN), ANGSTROM_SIGN);
    });

    it('ignores Greek capital Mu (U+039C)', () => {
      assert.equal(toAsciiLowercase(GREEK_CAPITAL_MU), GREEK_CAPITAL_MU);
    });
  });

  describe('Extended Unicode and Surrogate Pairs', () => {
    it('safely passes standard emojis without corruption', () => {
      assert.equal(toAsciiLowercase('HELLO 😊 WORLD'), 'hello 😊 world');
      assert.equal(toAsciiLowercase('🚀FAST🚀'), '🚀fast🚀');
    });

    it('safely passes non-emoji surrogate pairs (e.g. Deseret Alphabet)', () => {
      // 𐐀 is U+10400 (Deseret Capital Letter Long I)
      assert.equal(toAsciiLowercase('A𐐀B'), 'a𐐀b');
    });

    it('ignores standard accented Latin characters', () => {
      assert.equal(toAsciiLowercase('CAFÉ'), 'cafÉ');
      assert.equal(toAsciiLowercase('RÉSUMÉ'), 'rÉsumÉ');
      assert.equal(toAsciiLowercase('ÜBER'), 'Über');
    });
  });

  describe('Chunking Logic Edge Cases', () => {
    it('handles uppercase letters at the very beginning of the string', () => {
      assert.equal(toAsciiLowercase('START of string'), 'start of string');
    });

    it('handles uppercase letters at the very end of the string', () => {
      assert.equal(toAsciiLowercase('end of STR'), 'end of str');
    });

    it('handles a single uppercase letter string', () => {
      assert.equal(toAsciiLowercase('Z'), 'z');
    });

    it('handles alternating single characters correctly', () => {
      assert.equal(toAsciiLowercase('A_B_C_D_E_F'), 'a_b_c_d_e_f');
    });

    it('handles extremely large chunks', () => {
      const chunk = 'a'.repeat(10000);
      assert.equal(toAsciiLowercase(`${chunk}Z${chunk}`), `${chunk}z${chunk}`);
    });
  });
});
