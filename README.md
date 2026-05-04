# libxmljs/MSXML

NodeJS bindings for [libxml2](https://en.wikipedia.org/wiki/Libxml2) with [MSXML](https://en.wikipedia.org/wiki/MSXML) support.

`npm install @axelsoftware/libxmljs`

This fork of libxmljs extends the original library with MSXML-compatible DOM methods and properties.

# Changes

### New functions
Some new functions have been added (e.g. `selectSingleNode`).

### Changes in naming
Some methods from the original library have been renamed with a _ prefix (e.g. _methodName).
This was done to allow them to be exposed as properties instead of functions, improving API consistency and aligning with MSXML-like usage.

Example:
```javascript
// Old style:
const name = node.childNodes();

// New style (property-like):
const name = node.childNodes;
// or 
const name = node._childNodes();
```

# npm

To publish the package on npm you must generate/update the <em>dist</em> directory.

To do this you have to run the `npm run tsc` command before.