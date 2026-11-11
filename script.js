// 目次の開閉と、リンク先へのスクロール
(() => {
  const button = document.getElementById("toc-button");
  const toc = document.getElementById("toc");
  if (!button || !toc) return;
  const icon = button.querySelector("span");

  function setOpen(isOpen) {
    toc.classList.toggle("is-open", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "目次を閉じる" : "目次を開く");
    if (icon) icon.textContent = isOpen ? "×" : "☰";
  }

  button.addEventListener("click", () => {
    setOpen(!toc.classList.contains("is-open"));
  });

  toc.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      setOpen(false);

      // キーボードの操作先も本文へ移す。
      const addedTabindex = !target.hasAttribute("tabindex");
      if (addedTabindex) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (addedTabindex) {
        target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
      }
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "start" });
    });
  });

  toc.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      button.focus();
    }
  });
})();
