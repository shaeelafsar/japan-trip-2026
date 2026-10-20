// Theme toggle and tier filter. Everything else on the site works without JavaScript.
(function () {
  var root = document.documentElement;

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    var label = function () {
      toggle.textContent = root.getAttribute("data-theme") === "dark" ? "Light mode" : "Dark mode";
    };
    label();
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      label();
    });
  }

  var chips = document.querySelectorAll(".chip[data-tier]");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var tier = chip.getAttribute("data-tier");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      document.querySelectorAll(".tier-group").forEach(function (group) {
        group.classList.toggle("hidden", tier !== "all" && group.getAttribute("data-tier") !== tier);
      });
    });
  });

  // Open the details panel when a link jumps to a card
  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target && target.tagName === "DETAILS") target.open = true;
  }
})();
