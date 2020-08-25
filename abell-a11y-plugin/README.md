# abell-a11y-plugin
EXPERIMENTAL accessiblity plugin for [Abell](https://abelljs.org)

## Features

- Blurs images without alt tag in `abell serve`

## Installation

```
npm install --save-dev abell-a11y-plugin
```

```js
// In abell.config.js
module.exports = {
  // ...
  plugins: ['abell-a11y-plugin']
}
```