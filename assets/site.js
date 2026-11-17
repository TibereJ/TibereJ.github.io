
(function () {
  // réels : chargés et lancés seulement à l'écran, en pause ailleurs
  var vids = document.querySelectorAll('video[data-src]');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else if (!v.paused) v.pause();
      });
    }, { rootMargin: '120px 0px', threshold: 0.25 });
    vids.forEach(function (v) { io.observe(v); });
  }
  // filtres du catalogue : on ne fait que basculer un attribut
  var grid = document.getElementById('grid');
  document.querySelectorAll('.fchip').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.fchip').forEach(function (x) { x.classList.toggle('on', x === b); });
      var f = b.dataset.f;
      grid.querySelectorAll('.card').forEach(function (c) { c.hidden = !(f === 'all' || c.dataset.col === f); });
    });
  });
})();
