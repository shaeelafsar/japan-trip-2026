// Tier filter. Everything else on the site works without JavaScript.
(function () {
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

  // Tap a photo to enlarge it; swipe or use the arrows to see the stop's other photos.
  var dlg = document.getElementById("lightbox");
  if (dlg && typeof dlg.showModal === "function") {
    var big = dlg.querySelector(".lb-img");
    var cap = dlg.querySelector(".lb-cap");
    var by = dlg.querySelector(".lb-by");
    var count = dlg.querySelector(".lb-count");
    var nav = dlg.querySelector(".lb-nav");
    var list = [];
    var at = 0;
    var show = function (i) {
      at = (i + list.length) % list.length;
      var a = list[at];
      big.src = a.href;
      big.alt = a.dataset.cap;
      cap.textContent = a.dataset.cap;
      by.textContent = "Photo: " + a.dataset.by + " \u00b7 ";
      var src = document.createElement("a");
      src.href = a.dataset.src;
      src.target = "_blank";
      src.rel = "noopener";
      src.textContent = "Wikimedia Commons";
      by.appendChild(src);
      count.textContent = (at + 1) + " / " + list.length;
      nav.hidden = list.length < 2;
    };
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest(".ph-b") : null;
      if (!a) return;
      e.preventDefault();
      list = Array.prototype.slice.call(a.parentNode.querySelectorAll(".ph-b"));
      show(list.indexOf(a));
      document.documentElement.classList.add("lb-open");
      dlg.showModal();
    });
    dlg.addEventListener("close", function () { document.documentElement.classList.remove("lb-open"); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.querySelector(".lb-x").addEventListener("click", function () { dlg.close(); });
    dlg.querySelector(".lb-prev").addEventListener("click", function () { show(at - 1); });
    dlg.querySelector(".lb-next").addEventListener("click", function () { show(at + 1); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(at - 1);
      if (e.key === "ArrowRight") show(at + 1);
    });
    var startX = null;
    dlg.addEventListener("touchstart", function (e) { startX = e.changedTouches[0].clientX; }, { passive: true });
    dlg.addEventListener("touchend", function (e) {
      if (startX === null || list.length < 2) return;
      var dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  // To do checklist: ticks are saved in this browser only.
  var boxes = document.querySelectorAll(".checklist input[data-id]");
  if (boxes.length) {
    var KEY = "japan-2026-todo";
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (err) { saved = {}; }
    var tally = function (group) {
      var all = group.querySelectorAll("input[data-id]");
      var done = group.querySelectorAll("input[data-id]:checked").length;
      var badge = group.querySelector(".tally");
      badge.textContent = done + " of " + all.length;
      badge.classList.toggle("done", done === all.length);
    };
    boxes.forEach(function (box) {
      box.checked = saved[box.getAttribute("data-id")] === true;
      box.addEventListener("change", function () {
        if (box.checked) saved[box.getAttribute("data-id")] = true;
        else delete saved[box.getAttribute("data-id")];
        try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (err) { /* private mode: ticks last until reload */ }
        tally(box.closest("details"));
      });
    });
    document.querySelectorAll(".todo-group").forEach(tally);
  }

  // Open the details panel when a link jumps to a card
  var openTarget = function () {
    if (!location.hash) return;
    var target = document.getElementById(location.hash.slice(1));
    if (target && target.tagName === "DETAILS") target.open = true;
  };
  openTarget();
  window.addEventListener("hashchange", openTarget);
})();
