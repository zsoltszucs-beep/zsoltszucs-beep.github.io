/* Sprachumschaltung DE/EN, mobiles Menü, Druckhilfe. Kein Tracking, keine Cookies.
   Die gewählte Sprache wird nur lokal im Browser (localStorage) gespeichert. */
(function () {
  var root = document.documentElement;
  var meta = {
    de: { title: "Zsolt Szücs – Technischer Projektleiter | Konstruktion & CAE | München",
          cv: "assets/docs/Lebenslauf_Zsolt_Szuecs.pdf" },
    en: { title: "Zsolt Szücs – Technical Project Manager | Design & CAE | Munich",
          cv: "assets/docs/CV_Zsolt_Szuecs_EN.pdf" }
  };
  function setLang(lang) {
    if (!meta[lang]) lang = "de";
    root.setAttribute("lang", lang);
    document.title = meta[lang].title;
    document.querySelectorAll("[data-cv-link]").forEach(function (a) { a.setAttribute("href", meta[lang].cv); });
    document.querySelectorAll(".lang-toggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  var param = new URLSearchParams(location.search).get("lang");
  setLang(param || saved || "de");
  document.querySelectorAll(".lang-toggle button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });
  var btn = document.querySelector(".menu-btn"), links = document.querySelector(".nav-links");
  if (btn && links) {
    btn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { links.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    });
  }
  window.addEventListener("beforeprint", function () {
    document.querySelectorAll("details").forEach(function (d) { d.dataset.wasOpen = d.open; d.open = true; });
  });
  window.addEventListener("afterprint", function () {
    document.querySelectorAll("details").forEach(function (d) { d.open = d.dataset.wasOpen === "true"; });
  });
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
})();
