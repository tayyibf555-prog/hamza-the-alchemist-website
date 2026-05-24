/* Scroll-restoration guard.
   Runs synchronously from <head> before any React code, before the
   browser's scroll-restoration logic has a chance to apply the
   previously-remembered scroll position.

   Behavior on every page load (refresh OR fresh visit):
     1. Disables native scroll restoration.
     2. Strips any hash from the URL (so /#inquiry doesn't auto-scroll
        to that section on refresh).
     3. Snaps scroll to top on load.
     4. Re-snaps for a brief window (~1.5s) to defeat any queued
        scroll-restoration that fires once the document height settles
        — UNLESS the user starts scrolling, in which case the guard
        bails immediately so it never fights user input.

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

    // The user-input detector: if any of these fire, bail out of the
    // safety net so we never fight the user's scrolling.
    var userScrolling = false;
    var bail = function () {
      userScrolling = true;
    };
    window.addEventListener("wheel", bail, { passive: true, once: true });
    window.addEventListener("touchstart", bail, { passive: true, once: true });
    window.addEventListener("keydown", function (e) {
      // Only treat scroll keys as user intent
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "PageUp" ||
        e.key === "PageDown" ||
        e.key === " " ||
        e.key === "Home" ||
        e.key === "End"
      ) {
        bail();
      }
    });

    // Light-touch snap window: ~1.5s, every 100ms. Bails on user input.
    var hits = 0;
    var interval = setInterval(function () {
      if (userScrolling) {
        clearInterval(interval);
        return;
      }
      snap();
      if (++hits >= 15) clearInterval(interval);
    }, 100);

    // Belt-and-suspenders event listeners (also bail-aware).
    var loadSnap = function () {
      if (!userScrolling) snap();
    };
    if (document.readyState !== "loading") {
      loadSnap();
    } else {
      document.addEventListener("DOMContentLoaded", loadSnap);
    }
    window.addEventListener("load", loadSnap);
    window.addEventListener("pageshow", loadSnap);
  } catch (e) {
    /* ignore */
  }
})();
