## API

The package is available by importing its default and named function:

```js
import loadScripts, { loadJson, loadStyle } from '@lemuria/load-scripts'
```

Scripts and styles will be injected using the `script` and `link` elements. The results are cached, and resources won't be loaded more than once. To load them without cache, the `nocache` property should be set on the `src` string, e.g., `const src = 'test.js'; src.nocache = true`, or using a cache buster: `test.js?random-string`.

%~%

<typedef name="loadScripts" noArgTypesInToc>types/api.xml</typedef>

%EXAMPLE: example, ../src => @lemuria/load-scripts%
<!-- %FORK example% -->

%~%

<typedef name="loadJSON" noArgTypesInToc>types/api.xml</typedef>

<!-- %EXAMPLE: example, ../src => @lemuria/load-scripts% -->
<!-- %FORK example% -->

%~%

<typedef name="loadStyle" noArgTypesInToc>types/api.xml</typedef>

%~%