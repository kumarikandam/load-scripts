'use strict';
const h = (c, d) => {
  const b = new XMLHttpRequest;
  b.onreadystatechange = function() {
    4 == b.readyState && 200 == b.status && d(null, b.responseText);
  };
  b.onerror = a => d(a);
  b.open("GET", c, !0);
  b.send();
}, k = {}, p = (c, d, b) => {
  var a = c.f ? null : k[c];
  if (a && a.loaded) {
    d(a.loaded);
  } else {
    if (a && a.a) {
      b(a.a);
    } else {
      if (a) {
        a.c.push(d), a.b.push(b);
      } else {
        a = document.createElement("script");
        a.src = c;
        const g = new n(d, b);
        k[c] = g;
        a.onload = e => {
          g.load(e);
        };
        a.onerror = e => {
          g.error(e);
        };
        (document.head || document.body).appendChild(a);
      }
    }
  }
};
class n {
  constructor(c, d) {
    this.loaded = this.a = null;
    this.c = [c];
    this.b = [d];
  }
  error(c) {
    this.a = c;
    this.b.forEach(d => {
      d(c);
    });
  }
  load(c) {
    this.loaded = c;
    this.c.forEach(d => {
      d(c);
    });
  }
}
;module.exports = {_loadScripts:function(c, d) {
  let b = !1, a = [], g = 0;
  c.forEach((e, q) => {
    const l = f => {
      b || (g++, a[q] = f, g == c.length && d(null, a));
    }, m = f => {
      b || (b = f, d(f));
    };
    e.endsWith(".json") ? h(e, (f, r) => {
      f ? m(f) : l(r);
    }) : p(e, l, m);
  });
}, _loadJSON:h, _loadStyle:(c, d) => {
  const b = document.createElement("link");
  b.rel = "stylesheet";
  b.href = c;
  b.onload = a => d(null, a);
  b.onerror = a => d(a);
  document.head.appendChild(b);
}};


//# sourceMappingURL=depack.js.map