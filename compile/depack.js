'use strict';
const h = (d, c) => {
  const a = new XMLHttpRequest;
  a.onreadystatechange = function() {
    4 == this.readyState && 200 == this.status && c(null, this.responseText);
  };
  a.onerror = e => c(e);
  a.open("GET", d, !0);
  a.send();
};
module.exports = {_loadScripts:function(d, c) {
  let a = !1, e = [], k = 0;
  d.forEach((g, n) => {
    const l = b => {
      a || (k++, e[n] = b, k == d.length && c(null, e));
    }, m = b => {
      a || (a = b, c(b));
    };
    if (g.endsWith(".json")) {
      h(g, (b, p) => {
        b ? m(b) : l(p);
      });
    } else {
      var f = document.createElement("script");
      f.src = g;
      f.onload = l;
      f.onerror = m;
      (document.head || document.body).appendChild(f);
    }
  });
}, _loadJSON:h};


//# sourceMappingURL=depack.js.map