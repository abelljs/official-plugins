# abell-source-devto
EXPERIMENTAL dev.to source plugin for [Abell](https://abelljs.org)

## Usage

Don't really use this yet, it is nowhere close to stable and neither Abell's plugin system is.

But here's a documentation if you want to play around it (Actually Don't)

```
npm install --save-dev abell-source-devto
```

```js
// In abell.config.js
module.exports = {
  plugins: ['abell-source-devto'],
  globalMeta: {
    // ...
    devMeta: {
      username: 'saurabhdaware',
      articleCount: 4
    }
  }
}
```