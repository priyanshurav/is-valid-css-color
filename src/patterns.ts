export const NUM = String.raw`[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?`;
export const VALUE = `(?:${NUM}%?|none)`;
export const HUE = `(?:${NUM}(?:deg|grad|rad|turn)?|none)`;

// CSS whitespace: space, newline, carriage return, tab, form feed
export const WS = String.raw`[\x20\n\r\t\f]`;

const NONINT = String.raw`[+-]?(?:(?:\d+\.\d+|\.\d+)(?:[eE][+-]?\d+)?|\d+[eE][+-]?\d+)`;
const AFTER_IDENT = `(?:${WS}+|(?=[+.]))`;

export const VALUE_THEN_SEP = String.raw`(?:${NUM}(?:%${WS}*|${WS}+|(?=[+-]))|${NONINT}(?=\.)|none${AFTER_IDENT})`;
export const HUE_THEN_SEP = String.raw`(?:${NUM}(?:${WS}+|(?=[+-])|(?:deg|grad|rad|turn)${AFTER_IDENT})|${NONINT}(?=\.)|none${AFTER_IDENT})`;
export const IDENT_SEP = AFTER_IDENT;
