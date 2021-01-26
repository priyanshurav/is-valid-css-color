![License](https://img.shields.io/github/license/pr357/is-valid-css-color?color=limegreen&style=flat-square)
![Issues](https://img.shields.io/github/issues-raw/pr357/is-valid-css-color?style=flat-square)
![Downloads](https://img.shields.io/npm/dw/is-valid-css-color?style=flat-square)
![Minified Size](https://img.shields.io/bundlephobia/min/is-valid-css-color?label=minified%20size&style=flat-square)
![Version](https://img.shields.io/npm/v/is-valid-css-color?style=flat-square)

# is-valid-css-color

A tool to help you check if a CSS color string is valid or invalid

# Installation

```bash
npm install is-valid-css-color
```

Or, if you prefer yarn

```bash
yarn add is-valid-css-color
```

# Usage

```javascript
const {
  isValidColorName,
  isValidHSL,
  isValidRGB,
} = require('is-valid-css-color');

// To validate a RGB or RGBA ot hex string
console.log(isValidRGB('rgb(255,255,255)')); // true
console.log(isValidRGB('rgba(255,255,255,1)')); // true
console.log(isValidRGB('rgba(-255,255,255,1)')); // false
console.log(isValidRGB('rgba(255,255%,255,1)')); // false
console.log(isValidRGB('#000')); // true
console.log(isValidRGB('#000000')); // true
console.log(isValidRGB('#dsfuj')); // false

// To validate a HSL or HSLA string
console.log(isValidHSL('hsl(360deg, 10%, 50%)')); // true
console.log(isValidHSL('hsla(360deg, 10%, 50%, 1)')); // true
console.log(isValidHSL('hsla(360deg, 10%, 50%, -90)')); // false
console.log(isValidHSL('hsl(960deg, 10%, 50%, 1)')); // false

// To validate a CSS color name
console.log(isValidColorName('blue')); // true
console.log(isValidColorName('BLUE')); // true
console.log(isValidColorName('dksjf')); // false
console.log(isValidColorName('LKJSDK')); // false
```

# Contributing

Contributions are welcome. See the [contribution guide](https://github.com/pr357/is-valid-css-color/blob/main/CONTRIBUTING.md) for more info.

# License

This software is licensed under the [MIT License](https://choosealicense.com/licenses/mit/). See the [LICENSE](https://github.com/pr357/is-valid-css-color/blob/main/LICENSE) for more info.
