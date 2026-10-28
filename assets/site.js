
document.documentElement.classList.add('js');
document.querySelectorAll('.acc').forEach(function (acc) {
  var panels = Array.prototype.filter.call(acc.children, function (e) { return e.tagName === 'A'; });
  var open = -1, lastX = null, timer = null;
  function set(i) {
    if (i === open) return; open = i;
    panels.forEach(function (p, k) { p.classList.toggle('open', k === i); });
    acc.classList.toggle('has-open', i >= 0);
  }
  function content(p) {                              // bords gauche et droit du contenu affiché
    var f = p.querySelector('.bp-full, .cp-full'), L = Infinity, R = -Infinity;
    if (f) for (var i = 0; i < f.children.length; i++) {
      var q = f.children[i].getBoundingClientRect(); if (q.width) { L = Math.min(L, q.left); R = Math.max(R, q.right); }
    }
    var r = p.getBoundingClientRect(); return isFinite(L) ? [L, R] : [r.left + r.width * 0.15, r.right - r.width * 0.15];
  }
  function under(x) {
    for (var k = 0; k < panels.length; k++) { var r = panels[k].getBoundingClientRect(); if (x >= r.left && x < r.right) return k; }
    return -1;
  }
  acc.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    var x = e.clientX, dx = lastX === null ? 0 : x - lastX; lastX = x;
    if (open < 0) {                                   // première ouverture : un temps d'arrêt
      var k = under(x); clearTimeout(timer);
      timer = setTimeout(function () { if (under(lastX) === k) set(k); }, 220);
      return;
    }
    var r = panels[open].getBoundingClientRect(), c = content(panels[open]);
    if (x < r.left || x >= r.right) { set(under(x)); return; }
    // zones invisibles : l'espace vide entre le contenu (cadran, texte) et le bord
    var right = Math.min(c[1] + 12, r.right - 60), left = Math.max(c[0] - 12, r.left + 60);
    if (dx > 2 && x > right && open < panels.length - 1) set(open + 1);
    else if (dx < -2 && x < left && open > 0) set(open - 1);
  });
  acc.addEventListener('pointerleave', function () { clearTimeout(timer); set(-1); lastX = null; });
});
