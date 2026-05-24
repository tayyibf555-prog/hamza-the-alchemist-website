/* Brute-force scroll-restoration guard.
   Runs synchronously from <head> before any React code, before the
   browser's scroll-restoration logic has a chance to apply the
   previously-remembered scroll position or scroll-to-hash behavior.

   Behavior on every page load (refresh OR fresh visit):
     1. Disables native scroll restoration.
     2. Strips any hash from the URL (so /#inquiry doesn't auto-scroll
        to that section on refresh).
     3. Hammers scrollY back to 0 every 50ms for 5 seconds.
     4. Listens for DOMContentLoaded, load, and pageshow events.

   In-page anchor scrolling (clicking a CTA that points at #inquiry)
   continues to work because that happens AFTER the page is loaded
   and this guard has stopped running. */

(function () {
  try {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Strip any hash from the URL on load. Without this, a refresh on
    // a page with #inquiry in the URL would scroll to that section.
    if (window.location.hash && window.history.replaceState) {
      var clean =
        window.location.pathname + window.location.search;
      window.history.replaceState(null, "", clean);
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
