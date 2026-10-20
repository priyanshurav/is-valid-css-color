export const CHARS = {
  STRIPPED_WHITESPACE: {
    SPACE: ' ',
    HORIZONTAL_TAB: '\t',
    LINE_FEED: '\n',
    CARRIAGE_RETURN: '\r',
    FORM_FEED: '\f',
  },

  PRESERVED_WHITESPACE: {
    VERTICAL_TAB: '\v',
    NO_BREAK_SPACE: '\u00A0',
    OGHAM_SPACE_MARK: '\u1680',
    EN_QUAD: '\u2000',
    LINE_SEPARATOR: '\u2028',
    PARAGRAPH_SEPARATOR: '\u2029',
    IDEOGRAPHIC_SPACE: '\u3000',
    BYTE_ORDER_MARK: '\uFEFF',
  },

  LOOKALIKES: {
    KELVIN_SIGN: '\u212A', // looks like Latin "K"
    CYRILLIC_CAPITAL_A: '\u0410', // looks like Latin "A"
    ANGSTROM_SIGN: '\u212B', // looks like Latin "Å" (U+00C5)
    GREEK_CAPITAL_MU: '\u039C', // looks like Latin "M"
    LONG_S: '\u017F', // looks like Latin "s"
    DOTTED_CAPITAL_I: '\u0130', // looks like Latin "I" with a dot above
    DOTLESS_I: '\u0131', // looks like Latin "i"
    CYRILLIC_SMALL_A: '\u0430', // looks like Latin "a"
    CYRILLIC_SMALL_O: '\u043E', // looks like Latin "o"
    FULL_WIDTH_R: '\uff52', // looks like Latin "r"
    FULL_WIDTH_E: '\uff45', // looks like Latin "e"
    FULL_WIDTH_D: '\uff44', // looks like Latin "d"
  },

  INVISIBLE: {
    ZERO_WIDTH_SPACE: '\u200B',
  },

  COMBINING_MARKS: {
    COMBINING_ACUTE: '\u0301',
  },
} as const;
