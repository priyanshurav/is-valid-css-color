export const NUM = String.raw`[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?`;
export const VALUE = `(?:${NUM}%?|none)`;
export const HUE = `(?:${NUM}(?:deg|grad|rad|turn)?|none)`;
export const WS = '[ \n\r\t\f]';

const NONINT = String.raw`[+-]?(?:(?:\d+\.\d+|\.\d+)(?:[eE][+-]?\d+)?|\d+[eE][+-]?\d+)`;
const AFTER_IDENT = `(?:${WS}+|(?=[+.]))`;

export const VALUE_THEN_SEP = `(?:${NUM}(?:%${WS}*|${WS}+|(?=[+-]))|${NONINT}(?=\\.)|none${AFTER_IDENT})`;
export const HUE_THEN_SEP = `(?:${NUM}(?:${WS}+|(?=[+-])|(?:deg|grad|rad|turn)${AFTER_IDENT})|${NONINT}(?=\\.)|none${AFTER_IDENT})`;
export const IDENT_SEP = AFTER_IDENT;
