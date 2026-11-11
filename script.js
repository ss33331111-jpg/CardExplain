// script.js：目次の開閉ボタンの動き（目次の担当だけが触る）
// ボタンを押したら、目次(#toc)に is-open クラスを付け外しする。見た目はtoc.cssが決める。
// ボタンと目次を取得する
const tocButton = document.getElementById("toc-button");
const toc = document.getElementById("toc");
const tocIcon = tocButton.querySelector(".toc-icon");

// 目次の表示状態とボタンの表示をまとめて更新する
function setTocOpen(isOpen) {
  toc.classList.toggle("is-open", isOpen);
  tocButton.setAttribute("aria-expanded", String(isOpen));

  tocButton.setAttribute(
    "aria-label",
    isOpen ? "目次を閉じる" : "目次を開く"
  );

  tocIcon.textContent = isOpen ? "×" : "☰";
}
// ボタンを押したら目次を開閉する
tocButton.addEventListener("click", () => {
  const isOpen = toc.classList.contains("is-open");
  setTocOpen(!isOpen);
});

// 目次の各リンクにクリック時の処理を設定する
const tocLinks = toc.querySelectorAll('a[href^="#"]');

tocLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Ctrlキーなどを使うクリックは通常のリンク操作に任せる
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    // 例：「#section-1」から「section-1」を取り出す
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);

    // 移動先が存在しなければ処理しない
    if (!target) return;

    // 通常の瞬間的な移動を止める
    event.preventDefault();

    // 目次を閉じてから移動する
    setTocOpen(false);

    // 動きを減らす設定にも対応する
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? "instant" : "smooth",
      block: "start"
    });
  });
});
