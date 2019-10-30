'use strict';
class l {
  constructor(b, c) {
    this.loaded = this.a = null;
    this.c = [b];
    this.b = [c];
  }
  error(b) {
    this.a = b;
    this.b.forEach(c => {
      c(b);
    });
  }
  load(b) {
    this.loaded = b;
    this.c.forEach(c => {
      c(b);
    });
  }
}
;const m = (b, c, a) => {
  const d = document.createElement("script");
  d.src = b;
  d.onload = c;
  d.onerror = a;
  (document.head || document.body).appendChild(d);
}, n = (b, c, a) => {
  const d = document.createElement("link");
  d.rel = "stylesheet";
  d.href = b;
  d.onload = c;
  d.onerror = a;
  (document.head || document.body).appendChild(d);
};
const p = (b, c) => {
  const a = new XMLHttpRequest;
  a.onreadystatechange = function() {
    4 == a.readyState && 200 == a.status && c(null, a.responseText);
  };
  a.onerror = d => c(d);
  a.open("GET", b, !0);
  a.send();
};
function r(b, c, a, d, e, h) {
  if (h) {
    c(b, d, e);
  } else {
    if (a && a.loaded) {
      d(a.loaded);
    } else {
      if (a && a.a) {
        e(a.a);
      } else {
        if (a) {
          a.c.push(d), a.b.push(e);
        } else {
          const k = new l(d, e);
          c(b, g => {
            k.load(g);
          }, g => {
            k.error(g);
          });
          return k;
        }
      }
    }
  }
}
const t = {}, u = {}, v = (b, c, a) => {
  (c = r(b, m, t[b], c, a, b.nocache)) && (t[b] = c);
};
module.exports = {_loadScripts:function(b, c) {
  let a = !1, d = [], e = 0;
  b.forEach((h, k) => {
    const g = f => {
      a || (e++, d[k] = f, e == b.length && c(null, d));
    }, q = f => {
      a || (a = f, c(f));
    };
    h.endsWith(".json") ? p(h, (f, w) => {
      f ? q(f) : g(w);
    }) : v(h, g, q);
  });
}, _loadJSON:p, _loadStyle:(b, c) => {
  const a = r(b, n, u[b], d => c(null, d), d => c(d), b.nocache);
  a && (u[b] = a);
}};


//# sourceMappingURL=depack.js.map