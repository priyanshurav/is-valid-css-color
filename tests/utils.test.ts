import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { toAsciiLowercase, trim } from '../src/utils.js';

const targetWhitespaces = [
  { name: 'Space (0x20)', char: '\u{20}' },
  { name: 'Horizontal Tab (0x09)', char: '\u{9}' },
  { name: 'Line Feed (0x0A)', char: '\u{A}' },
  { name: 'Carriage Return (0x0D)', char: '\u{D}' },
  { name: 'Form Feed (0x0C)', char: '\u{C}' },
];

const nonTargetWhitespaces = [
  { name: 'Vertical Tab (0x0B)', char: '\u{B}' },
  { name: 'Non-breaking Space (0xA0)', char: '\u{A0}' },
  { name: 'Ogham Space Mark (0x1680)', char: '\u{1680}' },
  { name: 'En Quad (0x2000)', char: '\u{2000}' },
  { name: 'Line Separator (0x2028)', char: '\u{2028}' },
  { name: 'Ideographic Space (0x3000)', char: '\u{3000}' },
  { name: 'Byte Order Mark (0xFEFF)', char: '\u{FEFF}' },
];

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
    for (const { name, char } of targetWhitespaces) {
      it(`trims ${name} leading, trailing, both sides, and as a whole string`, () => {
        assert.equal(trim(`${char}hello`), 'hello');
        assert.equal(trim(`hello${char}`), 'hello');
        assert.equal(trim(`${char}hello${char}`), 'hello');
        assert.equal(trim(char.repeat(3)), '');
      });
    }

    it('trims a complex mixture of all target whitespaces at both ends', () => {
      const mixed = '\u{20}\u{9}\u{A}\u{D}\u{C}\u{C}\u{D}\u{A}\u{9}\u{20}';
      assert.equal(trim(`${mixed}content${mixed}`), 'content');
    });

    it('reduces a string composed entirely of mixed target whitespace to empty', () => {
      const mixed = '\u{20}\u{9}\u{A}\u{D}\u{C}\u{C}\u{D}\u{A}\u{9}\u{20}';
      assert.equal(trim(mixed), '');
    });
  });

  describe('Non-target whitespace (should NOT be trimmed)', () => {
    for (const { name, char } of nonTargetWhitespaces) {
      it(`leaves ${name} untouched leading, trailing, and as a whole string`, () => {
        assert.equal(trim(`${char}hello`), `${char}hello`);
        assert.equal(trim(`hello${char}`), `hello${char}`);
        assert.equal(trim(char.repeat(3)), char.repeat(3));
      });
    }

    it('trims target whitespace up to but not through adjacent non-target whitespace', () => {
      const str = '\u{20}\u{B}hello\u{B}\u{20}';
      assert.equal(trim(str), '\u{B}hello\u{B}');
    });
  });

  describe('Edge cases', () => {
    it('handles a single character string of target whitespace', () => {
      assert.equal(trim('\u{20}'), '');
    });

    it('handles a single character string of non-target whitespace', () => {
      assert.equal(trim('\u{A0}'), '\u{A0}');
    });

    it('preserves emoji and surrogate pairs while trimming surrounding target whitespace', () => {
      assert.equal(
        trim('\u{20}\u{9}\u{1F600} caf\u{E9} \u{65E5}\u{672C}\u{8A9E}\u{A}'),
        '\u{1F600} caf\u{E9} \u{65E5}\u{672C}\u{8A9E}'
      );
    });

    it('is idempotent: trimming an already-trimmed string is a no-op', () => {
      const once = trim('\u{20}\u{9}hello\u{A}\u{D}');
      assert.equal(once, 'hello');
      assert.equal(trim(once), once);
    });

    it('handles extremely large strings with extensive padding', () => {
      const pad = '\u{20}\u{9}\u{A}\u{D}\u{C}'.repeat(10_000);
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
    it('ignores the Kelvin sign K (U+212A) - native toLowerCase makes this "k"', () => {
      // 'K' is ASCII (U+004B), 'K' is Kelvin (U+212A)
      assert.equal(toAsciiLowercase('KK'), 'kK');
    });

    it('ignores Cyrillic А (U+0410) - looks identical to ASCII A', () => {
      // 'A' is ASCII (U+0041), 'А' is Cyrillic (U+0410)
      assert.equal(toAsciiLowercase('AА'), 'aА');
    });

    it('ignores Fullwidth Ａ (U+FF21)', () => {
      assert.equal(toAsciiLowercase('ＡＢＣ'), 'ＡＢＣ');
    });

    it('ignores the Angstrom sign Å (U+212B)', () => {
      assert.equal(toAsciiLowercase('Å'), 'Å');
    });

    it('ignores Greek capital letters like Μ (U+039C)', () => {
      assert.equal(toAsciiLowercase('Μ'), 'Μ');
    });
  });

  describe('Extended Unicode and Surrogate Pairs', () => {
    it('safely passes standard emojis without corruption', () => {
      assert.equal(toAsciiLowercase('HELLO 😊 WORLD'), 'hello 😊 world');
      assert.equal(toAsciiLowercase('🚀FAST🚀'), '🚀fast🚀');
    });

    it('safely passes non-emoji surrogate pairs (e.g. Deseret Alphabet)', () => {
      // 𐐀 is U+10400 (Deseret Capital Letter I)
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
