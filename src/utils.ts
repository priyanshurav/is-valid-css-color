export const trim = (str: string): string => {
  let start = 0;
  let end = str.length - 1;

  while (start <= end) {
    const code = str.charCodeAt(start);
    if (code === 0x20 || code === 0x0a || code === 0x09 || code === 0x0d || code === 0x0c) {
      start++;
    } else {
      break;
    }
  }

  if (start > end) return '';

  while (end > start) {
    const code = str.charCodeAt(end);
    if (code === 0x20 || code === 0x0a || code === 0x09 || code === 0x0d || code === 0x0c) {
      end--;
    } else {
      break;
    }
  }

  if (start === 0 && end === str.length - 1) return str;

  return str.slice(start, end + 1);
};

export const toAsciiLowercase = (str: string): string => {
  let result = '';
  let lastIndex = 0;

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= 0x41 && code <= 0x5a) {
      result += str.slice(lastIndex, i) + String.fromCharCode(code + 0x20);
      lastIndex = i + 1;
    }
  }
  if (lastIndex === 0) return str;
  return result + str.slice(lastIndex);
};
