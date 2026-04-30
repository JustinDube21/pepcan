(() => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  function closeMenu() {
    if (!toggle || !nav) return;
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      document.body.classList.toggle("menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeMenu();
    });
  }

  const search = document.querySelector("[data-product-search]");
  const category = document.querySelector("[data-category-filter]");
  const cards = Array.from(document.querySelectorAll("[data-product-card]"));

  function filterCards() {
    const term = search ? search.value.trim().toLowerCase() : "";
    const selected = category ? category.value : "all";

    cards.forEach((card) => {
      const matchesTerm = !term || card.dataset.title.includes(term);
      const matchesCategory = selected === "all" || card.dataset.category === selected;
      card.hidden = !(matchesTerm && matchesCategory);
    });
  }

  if (search) search.addEventListener("input", filterCards);
  if (category) category.addEventListener("change", filterCards);
})();
