# @lemuria/load-scripts

[![npm version](https://badge.fury.io/js/%40lemuria%2Fload-scripts.svg)](https://www.npmjs.com/package/@lemuria/load-scripts)

`@lemuria/load-scripts` Loads Scripts And JSON With A Callback.

```sh
yarn add @lemuria/load-scripts
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`loadScripts(scripts, callback): void`](#loadscriptsscripts-arraystringcallback-functionerror-arrayeventstring-void-void)
- [`loadJSON(url, callback): void`](#loadjsonurl-stringcallback-functionerror-string-void-void)
- [`loadStyle(url, onload): void`](#loadstyleurl-stringonload-functionevent-event-void-void)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## API

The package is available by importing its default and named function:

```js
import loadScripts, { loadJson, loadStyle } from '@lemuria/load-scripts'
```

Scripts and styles will be injected using the `script` and `link` elements. The results are cached, and resources won't be loaded more than once. To load them without cache, the `nocache` property should be set on the `src` string, e.g., `const src = 'test.js'; src.nocache = true`, or using a cache buster: `test.js?random-string`.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## <code><ins>loadScripts</ins>(</code><sub><br/>&nbsp;&nbsp;`scripts: !Array<string>,`<br/>&nbsp;&nbsp;`callback: function(Error, !Array<!Event|string>=): void,`<br/></sub><code>): <i>void</i></code>
Loads scripts by creating script elements, appending them to DOM and waiting for onload event. JSON is loaded via XHR. The callback will be called with an array of: event objects for scripts, and responseText for JSON.

 - <kbd><strong>scripts*</strong></kbd> <em><code>!Array&lt;string&gt;</code></em>: Path to scripts, including JSON.
 - <kbd><strong>callback*</strong></kbd> <em><code>function(Error, !Array&lt;(!Event \| string)&gt;=): void</code></em>: The callback to execute when all data is loaded. In case of failure, called with the first error once.

```js
import loadScripts from '@lemuria/load-scripts'

document.body.onload = () => {
  loadScripts([
    'data.json',
    'js/dep.js',
    'js/dep2.js',
  ], (err, res) => {
    if (err) return console.warn(err.message)
    const [data] = res
    const parsed = JSON.parse(data)
    console.log(parsed)
  })
}
```
<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## <code><ins>loadJSON</ins>(</code><sub><br/>&nbsp;&nbsp;`url: string,`<br/>&nbsp;&nbsp;`callback: function(Error, string=): void,`<br/></sub><code>): <i>void</i></code>
Loads JSON via XHR.

 - <kbd><strong>url*</strong></kbd> <em>`string`</em>: The JSON url to load.
 - <kbd><strong>callback*</strong></kbd> <em>`function(Error, string=): void`</em>: The callback when the server returned text and status 200.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/3.svg?sanitize=true">
</a></p>

## <code><ins>loadStyle</ins>(</code><sub><br/>&nbsp;&nbsp;`url: string,`<br/>&nbsp;&nbsp;`onload: function(Event, Event=): void,`<br/></sub><code>): <i>void</i></code>
Loads a style by creating the link element.

 - <kbd><strong>url*</strong></kbd> <em>`string`</em>: The style url to load.
 - <kbd><strong>onload*</strong></kbd> <em>`function(Event, Event=): void`</em>: The callback when the `onload` or `onerror` even was fired on the link, with the first arg being the error event.

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/4.svg?sanitize=true">
</a></p>

## Copyright

(c) [Art Deco][1] 2019

[1]: https://artd.eco

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>