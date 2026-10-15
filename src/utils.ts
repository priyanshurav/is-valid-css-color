export const trim = (str: string): string => {
  let start = 0;
  let end = str.length - 1;

  while (start <= end) {
    const code = str.charCodeAt(start);
    if (
      code === 0x20 || // space
      code === 0x0a || // line feed (\n)
      code === 0x09 || // tab (\t)
      code === 0x0d || // carriage return (\r)
      code === 0x0c // form feed (\f)
    ) {
      start++;
    } else {
      break;
    }
  }

  if (start > end) return '';

  while (end > start) {
    const code = str.charCodeAt(end);
    if (
      code === 0x20 || // space
      code === 0x0a || // line feed (\n)
      code === 0x09 || // tab (\t)
      code === 0x0d || // carriage return (\r)
      code === 0x0c // form feed (\f)
    ) {
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

    // "A" (0x41) to "Z" (0x5a); adding 0x20 makes it lowercase
    if (code >= 0x41 && code <= 0x5a) {
      result += str.slice(lastIndex, i) + String.fromCharCode(code + 0x20);
      lastIndex = i + 1;
    }
  }

  // If no uppercase letters exist, return the original string
  if (lastIndex === 0) return str;

  return result + str.slice(lastIndex);
};
