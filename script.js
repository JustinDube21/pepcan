(() => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const desktopNav = window.matchMedia("(min-width: 981px)");

  function closeMenu() {
    if (!toggle || !nav) return;
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  }

  function setMenuState(isOpen) {
    if (!toggle || !nav) return;
    nav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      setMenuState(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeMenu();
    });

    desktopNav.addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  }

  const search = document.querySelector("[data-product-search]");
  const category = document.querySelector("[data-category-filter]");
  const cards = Array.from(document.querySelectorAll("[data-product-card]"));
  const emptyState = document.querySelector("[data-empty-products]");

  function filterCards() {
    const term = search ? search.value.trim().toLowerCase() : "";
    const selected = category ? category.value : "all";
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesTerm = !term || card.dataset.title.includes(term);
      const matchesCategory = selected === "all" || card.dataset.category === selected;
      const isVisible = matchesTerm && matchesCategory;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (emptyState) emptyState.hidden = visibleCount > 0;
  }

  if (search) search.addEventListener("input", filterCards);
  if (category) category.addEventListener("change", filterCards);
})();
