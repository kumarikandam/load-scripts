# @lemuria/load-scripts

[![npm version](https://badge.fury.io/js/@lemuria/load-scripts.svg)](https://npmjs.org/package/@lemuria/load-scripts)

`@lemuria/load-scripts` is Loads Scritps And JSON With A Callback.

```sh
yarn add @lemuria/load-scripts
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`loadScripts(arg1: string, arg2?: boolean)`](#mynewpackagearg1-stringarg2-boolean-void)
  * [`_@lemuria/load-scripts.Config`](#type-_@lemuria/load-scriptsconfig)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## API

The package is available by importing its default function:

```js
import loadScripts from '@lemuria/load-scripts'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## <code><ins>loadScripts</ins>(</code><sub><br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/></sub><code>): <i>void</i></code>

Call this function to get the result you want.

<strong><a name="type-_@lemuria/load-scriptsconfig">`_@lemuria/load-scripts.Config`</a></strong>: Options for the program.

|   Name    |       Type       |    Description    | Default |
| --------- | ---------------- | ----------------- | ------- |
| shouldRun | <em>boolean</em> | A boolean option. | `true`  |
| __text*__ | <em>string</em>  | A text to return. | -       |

```js
/* alanode example/ */
import loadScripts from '@lemuria/load-scripts'

(async () => {
  const res = await loadScripts({
    text: 'example',
  })
  console.log(res)
})()
```
```
example
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Copyright

(c) [Art Deco][1] 2019

[1]: https://artd.eco

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>