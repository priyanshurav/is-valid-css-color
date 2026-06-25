export const NUM = '[+-]?(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?';
export const VALUE = `(?:${NUM}%?|none)`;
export const HUE = `(?:${NUM}(?:deg|grad|rad|turn)?|none)`;
