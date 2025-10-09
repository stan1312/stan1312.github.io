/* return-home.js
 * Adds a fixed "Return to main page" button to subpages.
 * Usage (on a subpage in a folder like /poland/, /channel/, /melilla/):
 *   <link rel="stylesheet" href="../return-home.css">
 *   <script src="../return-home.js" defer></script>
 */
(function () {
  function resolveRootIndex() {
    // If the page lives one folder deep (e.g., /poland/file.html),
    // going to ../index.html will get back to the main page.
    // If deeper nesting appears later, we try to find the site root
    // by stripping everything after the first path segment after the host.
    try {
      var path = window.location.pathname; // e.g., /site/poland/timeline_pl.html or /poland/timeline_pl.html
      // Count segments
      var segments = path.replace(/^\//, '').split('/'); // e.g., ["poland", "timeline_pl.html"]
      if (segments.length >= 2) {
        // assume index is one level up from the subpage
        return '../index.html';
      }
      // Fallback: same directory (root)
      return 'index.html';
    } catch (e) {
      return '../index.html';
    }
  }

  function createButton() {
    var btn = document.createElement('button');
    btn.className = 'return-home-btn';
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Return to main page');
    btn.textContent = '← Return to main page';
    btn.addEventListener('click', function () {
      window.location.href = resolveRootIndex();
    });
    return btn;
  }

  function mount() {
    if (document.querySelector('.return-home-btn')) return;
    var btn = createButton();
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();