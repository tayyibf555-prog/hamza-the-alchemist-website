/* Brute-force scroll-restoration guard.
   Runs synchronously from <head> before any React code, before the
   browser's scroll-restoration logic has a chance to apply the
   previously-remembered scroll position.

   For the first 5 seconds of page load, this hammers scrollY back to 0
   every 50ms unless the URL carries a hash anchor (in which case we
   honor the anchor and let the browser scroll there). */

(function () {
  try {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    var hash = window.location.hash;
    if (hash && hash.length > 1) {
      // User came to a deep anchor: let the browser scroll to it.
      return;
    }

    var snap = function () {
      if (window.scrollY !== 0 || window.pageYOffset !== 0) {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      }
    };

    // Immediate snap.
    snap();

    // Hammer scrollY=0 every 50ms for 5 seconds.
    var interval = setInterval(snap, 50);
    setTimeout(function () {
      clearInterval(interval);
    }, 5000);

    // Belt-and-suspenders event listeners.
    if (document.readyState !== "loading") {
      snap();
    } else {
      document.addEventListener("DOMContentLoaded", snap);
    }
    window.addEventListener("load", snap);
    window.addEventListener("pageshow", snap);
  } catch (e) {
    /* ignore */
  }
})();
