'use strict';
const h = (e, b) => {
  const a = new XMLHttpRequest;
  a.onreadystatechange = function() {
    4 == a.readyState && 200 == a.status && b(null, a.responseText);
  };
  a.onerror = c => b(c);
  a.open("GET", e, !0);
  a.send();
};
module.exports = {_loadScripts:function(e, b) {
  let a = !1, c = [], k = 0;
  e.forEach((g, n) => {
    const l = d => {
      a || (k++, c[n] = d, k == e.length && b(null, c));
    }, m = d => {
      a || (a = d, b(d));
    };
    if (g.endsWith(".json")) {
      h(g, (d, p) => {
        d ? m(d) : l(p);
      });
    } else {
      var f = document.createElement("script");
      f.src = g;
      f.onload = l;
      f.onerror = m;
      (document.head || document.body).appendChild(f);
    }
  });
}, _loadJSON:h, _loadStyle:(e, b) => {
  const a = document.createElement("link");
  a.rel = "stylesheet";
  a.href = e;
  a.onload = c => b(null, c);
  a.onerror = c => b(c);
  document.head.appendChild(a);
}};


//# sourceMappingURL=depack.js.map