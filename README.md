location-search-parser
======================

SearchParser is very simple utility for parsing and manipulating `window.location.string`. Works with AMD and plain browser environment;

### Usage
```javascript
var parser = new SearchParser(window.location.search.substr(1)); // same as new SearchParser
parser.parsed; // {test: 'ok'}
parser.extend({a: 42, b: 38}).compile(); // 'a=42&b=38&test=ok', but actual order may differ
```

### API
`SearchParser`
  * `constructor(searchString)` — `searchString` defaults to `window.location.search.substr(1)`. Calls `SearchParser#parse`;
  * `SearchParser#parse(searchString)` — parses `searchString` which has format of `'key1=val&key2=val2'`. Returns `Object` and can be used as static method;
  * `SearchParser#parsed` — contains parsed parameters from `searchString`;
  * `SearchParser#compile(params)` — `params` must be object. When called as instance method, `params` defaults to `this.parsed`. Returns `String` and can be used as static method;
  * `SearchParser#extend(params)` — `params` must be object. Merges `params` and `this.parsed`.