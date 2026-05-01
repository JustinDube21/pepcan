(() => {
  const catalog = Array.isArray(window.PEPCAN_CATALOG) ? window.PEPCAN_CATALOG : [];
  const byHandle = new Map();
  catalog.forEach((item) => {
    byHandle.set(item.handle, item);
    (item.aliases || []).forEach((alias) => byHandle.set(alias, item));
  });

  const cartKey = "pepcan_cart_v4";
  const threshold = 249.99;
  const money = (value) => `$${Number(value || 0).toFixed(2)}`;
  const body = document.body;

  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(cartKey) || "[]");
    } catch {
      return [];
    }
  }

  function writeCart(items) {
    localStorage.setItem(cartKey, JSON.stringify(items));
    renderCart();
  }

  function cartTotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function cartCount(items) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  function variantKey(handle, variant) {
    return `${handle}::${variant}`;
  }

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      body.classList.toggle("menu-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (event) => {
      if (!event.target.closest("a")) return;
      nav.classList.remove("is-open");
      body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  }

  const shopMenus = Array.from(document.querySelectorAll("[data-shop-menu]"));
  const shopCloseTimers = new WeakMap();
  function openShopMenu(menu) {
    if (!menu) return;
    const timer = shopCloseTimers.get(menu);
    if (timer) window.clearTimeout(timer);
    closeShopMenus(menu);
    menu.classList.add("is-open");
    const trigger = menu.querySelector("[data-shop-trigger]");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
  }
  function scheduleShopClose(menu) {
    if (!menu) return;
    const timer = shopCloseTimers.get(menu);
    if (timer) window.clearTimeout(timer);
    shopCloseTimers.set(
      menu,
      window.setTimeout(() => {
        menu.classList.remove("is-open");
        const trigger = menu.querySelector("[data-shop-trigger]");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      }, 420)
    );
  }
  function closeShopMenus(except) {
    shopMenus.forEach((menu) => {
      if (except && menu === except) return;
      const timer = shopCloseTimers.get(menu);
      if (timer) window.clearTimeout(timer);
      menu.classList.remove("is-open");
      const trigger = menu.querySelector("[data-shop-trigger]");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }
  shopMenus.forEach((menu) => {
    menu.addEventListener("mouseenter", () => openShopMenu(menu));
    menu.addEventListener("mouseleave", () => scheduleShopClose(menu));
    menu.addEventListener("focusin", () => openShopMenu(menu));
    menu.addEventListener("focusout", () => {
      window.setTimeout(() => {
        if (!menu.contains(document.activeElement)) scheduleShopClose(menu);
      }, 20);
    });
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-shop-menu]")) closeShopMenus();
  });

  function openCart() {
    body.classList.add("cart-open");
    renderCart();
  }

  function closeCart() {
    body.classList.remove("cart-open");
  }

  document.querySelectorAll("[data-cart-open]").forEach((button) => button.addEventListener("click", openCart));
  document.querySelectorAll("[data-cart-close]").forEach((button) => button.addEventListener("click", closeCart));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCart();
      body.classList.remove("search-open");
      closeShopMenus();
    }
  });

  function addToCart(handle, options = {}) {
    const product = byHandle.get(handle);
    if (!product) return;
    const variant = options.variant || "1 vial";
    const price = Number(options.price || (variant.toLowerCase().includes("kit") ? product.kitPrice : product.price) || product.price);
    const quantity = Math.max(1, Number(options.quantity || 1));
    const items = readCart();
    const key = variantKey(product.handle, variant);
    const existing = items.find((item) => item.key === key);
    if (existing) existing.quantity += quantity;
    else items.push({ key, handle: product.handle, title: product.title, image: product.image, variant, price, quantity });
    writeCart(items);
    openCart();
  }

  document.addEventListener("click", (event) => {
    const quickAdd = event.target.closest("[data-add-to-cart]");
    if (quickAdd) {
      event.preventDefault();
      addToCart(quickAdd.dataset.handle);
    }

    const productAdd = event.target.closest("[data-product-add]");
    if (productAdd) {
      event.preventDefault();
      const scope = productAdd.closest("[data-product-page]") || document;
      const activeVariant = scope.querySelector("[data-variant-option].is-active");
      const qty = scope.querySelector("[data-product-qty]");
      addToCart(productAdd.dataset.handle, {
        variant: activeVariant ? activeVariant.dataset.variant : "1 vial",
        price: activeVariant ? activeVariant.dataset.price : undefined,
        quantity: qty ? qty.value : 1,
      });
    }

    const qtyButton = event.target.closest("[data-cart-qty]");
    if (qtyButton) {
      const items = readCart();
      const item = items.find((entry) => entry.key === qtyButton.dataset.key);
      if (!item) return;
      item.quantity += qtyButton.dataset.cartQty === "plus" ? 1 : -1;
      writeCart(items.filter((entry) => entry.quantity > 0));
    }

    const removeButton = event.target.closest("[data-cart-remove]");
    if (removeButton) writeCart(readCart().filter((item) => item.key !== removeButton.dataset.key));

    const recButton = event.target.closest("[data-rec-add]");
    if (recButton) addToCart(recButton.dataset.handle);
  });

  function renderCart() {
    const items = readCart();
    const total = cartTotal(items);
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = cartCount(items);
    });
    document.querySelectorAll("[data-cart-title-count]").forEach((el) => {
      el.textContent = cartCount(items);
    });
    document.querySelectorAll("[data-cart-subtotal]").forEach((el) => {
      el.textContent = `${money(total)} CAD`;
    });
    const left = Math.max(0, threshold - total);
    const percent = Math.max(0, Math.min(100, (total / threshold) * 100));
    document.querySelectorAll("[data-shipping-copy]").forEach((el) => {
      el.textContent = left > 0 ? `Only ${money(left)} left for complimentary priority shipping.` : "Complimentary priority shipping unlocked.";
    });
    document.querySelectorAll("[data-shipping-progress]").forEach((el) => {
      el.style.width = `${percent}%`;
    });

    const list = document.querySelector("[data-cart-items]");
    if (list) {
      list.innerHTML = items.length
        ? items
            .map(
              (item) => `
        <article class="cart-line">
          <img src="${item.image}" alt="${item.title} product image" width="78" height="78">
          <div>
            <h3>${item.title}</h3>
            <p>${item.variant}</p>
            <div class="cart-qty">
              <button type="button" data-cart-qty="minus" data-key="${item.key}">-</button>
              <span>${item.quantity}</span>
              <button type="button" data-cart-qty="plus" data-key="${item.key}">+</button>
            </div>
            <button class="cart-remove" type="button" data-cart-remove data-key="${item.key}">Remove</button>
          </div>
          <strong>${money(item.price * item.quantity)}</strong>
        </article>`
            )
            .join("")
        : '<p class="cart-empty">Your cart is empty. Add a research product to begin.</p>';
    }

    const recWrap = document.querySelector("[data-cart-recommendations]");
    if (recWrap) {
      const current = new Set(items.map((item) => item.handle));
      const recs = catalog.filter((product) => !current.has(product.handle)).slice(0, 3);
      recWrap.innerHTML = recs
        .map(
          (product) => `<article class="rec-item"><img src="${product.image}" alt="${product.title} product image" width="58" height="58"><span><strong>${product.title}</strong><span>${product.categoryTitle}</span><span>${money(product.price)}</span></span><button type="button" data-rec-add data-handle="${product.handle}">Add</button></article>`
        )
        .join("");
    }

    renderCheckoutSummary();
  }

  document.querySelectorAll("[data-variant-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const scope = button.closest("[data-product-page]") || document;
      scope.querySelectorAll("[data-variant-option]").forEach((other) => other.classList.remove("is-active"));
      button.classList.add("is-active");
      updateProductPrice(scope);
    });
  });

  document.querySelectorAll("[data-qty-minus], [data-qty-plus]").forEach((button) => {
    button.addEventListener("click", () => {
      const scope = button.closest("[data-product-page]") || document;
      const input = scope.querySelector("[data-product-qty]");
      if (!input) return;
      input.value = Math.max(1, Number(input.value || 1) + (button.hasAttribute("data-qty-plus") ? 1 : -1));
      updateProductPrice(scope);
    });
  });

  document.querySelectorAll("[data-product-qty]").forEach((input) => input.addEventListener("input", () => updateProductPrice(input.closest("[data-product-page]") || document)));

  function updateProductPrice(scope) {
    const activeVariant = scope.querySelector("[data-variant-option].is-active");
    const qty = scope.querySelector("[data-product-qty]");
    const unit = Number(activeVariant ? activeVariant.dataset.price : 0);
    const total = unit * Math.max(1, Number(qty ? qty.value : 1));
    scope.querySelectorAll("[data-product-price], [data-mobile-product-price]").forEach((el) => {
      el.textContent = money(total);
    });
    scope.querySelectorAll("[data-product-add]").forEach((el) => {
      if (el.closest(".mobile-sticky-buy")) el.textContent = "Add";
      else if (el.classList.contains("btn")) el.textContent = `Add to Cart - ${money(total)}`;
    });
  }
  document.querySelectorAll("[data-product-page]").forEach(updateProductPrice);

  const searchInput = document.querySelector("[data-product-search]");
  const cards = Array.from(document.querySelectorAll("[data-product-card]"));
  const empty = document.querySelector("[data-empty-products]");
  let activeCategory = "all";
  let activeSort = "featured";

  function applyProductFilters() {
    const term = searchInput ? searchInput.value.trim().toLowerCase() : "";
    let visible = 0;
    cards.forEach((card) => {
      const show = (!term || card.dataset.title.includes(term)) && (activeCategory === "all" || card.dataset.category === activeCategory);
      card.hidden = !show;
      card.classList.toggle("is-filtered-out", !show);
      if (show) visible += 1;
    });
    const grid = document.querySelector("[data-product-grid]");
    if (grid) {
      cards
        .slice()
        .sort((a, b) => {
          if (activeSort === "price-asc") return Number(a.dataset.price) - Number(b.dataset.price);
          if (activeSort === "price-desc") return Number(b.dataset.price) - Number(a.dataset.price);
          if (activeSort === "az") return a.dataset.title.localeCompare(b.dataset.title);
          if (activeSort === "newest") return Number(b.dataset.sort) - Number(a.dataset.sort);
          if (activeSort === "best") return Number(a.dataset.sort) - Number(b.dataset.sort);
          return (b.dataset.featured === "true") - (a.dataset.featured === "true") || Number(a.dataset.sort) - Number(b.dataset.sort);
        })
        .forEach((card) => grid.appendChild(card));
    }
    if (empty) empty.hidden = visible > 0;
  }

  if (searchInput) searchInput.addEventListener("input", applyProductFilters);
  document.querySelectorAll("[data-category-filter-chip]").forEach((chip) => {
    chip.addEventListener("click", () => {
      activeCategory = chip.dataset.categoryFilterChip;
      document.querySelectorAll("[data-category-filter-chip]").forEach((item) => item.classList.remove("is-active"));
      chip.classList.add("is-active");
      applyProductFilters();
    });
  });
  document.querySelectorAll("[data-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      activeSort = button.dataset.sort;
      document.querySelectorAll("[data-sort]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      applyProductFilters();
    });
  });
  applyProductFilters();

  document.querySelectorAll("[data-carousel-prev], [data-carousel-next]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.carouselPrev || button.dataset.carouselNext;
      const carousel = document.getElementById(id);
      if (!carousel) return;
      const card = carousel.querySelector(".product-card");
      const styles = window.getComputedStyle(carousel);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
      const step = card ? card.getBoundingClientRect().width + gap : carousel.clientWidth;
      carousel.scrollBy({ left: (button.dataset.carouselNext ? 1 : -1) * step, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    tabs.querySelectorAll("[data-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        tabs.querySelectorAll("[data-tab]").forEach((item) => item.classList.toggle("is-active", item === button));
        tabs.querySelectorAll("[data-tab-panel]").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.tabPanel === button.dataset.tab));
      });
    });
  });

  document.querySelectorAll("[data-search-open]").forEach((button) => {
    button.addEventListener("click", () => {
      body.classList.add("search-open");
      const input = document.querySelector("[data-site-search]");
      renderSearchResults("");
      if (input) setTimeout(() => input.focus(), 40);
    });
  });
  document.querySelectorAll("[data-search-close]").forEach((button) => button.addEventListener("click", () => body.classList.remove("search-open")));
  const siteSearch = document.querySelector("[data-site-search]");
  if (siteSearch) siteSearch.addEventListener("input", () => renderSearchResults(siteSearch.value));

  function renderSearchResults(term) {
    const wrap = document.querySelector("[data-site-search-results]");
    if (!wrap) return;
    const value = (term || "").trim().toLowerCase();
    const results = catalog.filter((product) => !value || product.title.toLowerCase().includes(value) || product.categoryTitle.toLowerCase().includes(value)).slice(0, 8);
    wrap.innerHTML =
      results
        .map((product) => `<a class="search-result" href="${product.url}"><img src="${product.image}" alt="${product.title} product image" width="58" height="58"><span><strong>${product.title}</strong><span>${product.categoryTitle} - ${money(product.price)}</span></span></a>`)
        .join("") || '<p class="cart-empty">No products found.</p>';
  }

  document.querySelectorAll("[data-subscribe-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = form.querySelector("[data-form-message]");
      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName: form.fullName ? form.fullName.value.trim() : "", email: form.email.value.trim(), source: "research_updates", page: location.pathname }),
        });
        if (!response.ok) throw new Error("subscribe failed");
        form.reset();
        setMessage(message, "Subscribed. Your details are saved for research updates.", "success");
      } catch {
        setMessage(message, "Subscription is ready. Add Supabase variables in Vercel to store subscribers.", "error");
      }
    });
  });

  function renderCheckoutSummary() {
    const wrap = document.querySelector("[data-checkout-summary]");
    if (!wrap) return;
    const items = readCart();
    wrap.innerHTML = items.length
      ? items.map((item) => `<div class="checkout-line"><div><strong>${item.title}</strong><span>${item.variant} x ${item.quantity}</span></div><strong>${money(item.price * item.quantity)}</strong></div>`).join("") + `<div class="checkout-line"><strong>Subtotal</strong><strong>${money(cartTotal(items))} CAD</strong></div>`
      : '<p class="cart-empty">Your cart is empty. Add products before checkout.</p>';
  }

  document.querySelectorAll("[data-stripe-checkout]").forEach((button) => {
    button.addEventListener("click", async () => {
      const items = readCart();
      const errorTarget = document.querySelector("[data-cart-error]");
      if (!items.length) {
        setMessage(errorTarget, "Add at least one product before checkout.", "error");
        openCart();
        return;
      }
      const original = button.textContent;
      button.disabled = true;
      button.textContent = "Opening Stripe Checkout...";
      try {
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: items.map((item) => ({ handle: item.handle, variant: item.variant, quantity: item.quantity })) }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.url) throw new Error(data.error || "Stripe Checkout unavailable");
        window.location.href = data.url;
      } catch (error) {
        setMessage(errorTarget, error.message || "Stripe Checkout is not available right now.", "error");
        button.disabled = false;
        button.textContent = original;
      }
    });
  });

  document.querySelectorAll("[data-admin-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const key = form.adminKey.value.trim();
      const message = document.querySelector("[data-admin-message]");
      try {
        const [ordersRes, subscribersRes] = await Promise.all([
          fetch("/api/admin/orders", { headers: { "x-admin-key": key } }),
          fetch("/api/admin/subscribers", { headers: { "x-admin-key": key } }),
        ]);
        if (!ordersRes.ok || !subscribersRes.ok) throw new Error("admin load failed");
        const orders = await ordersRes.json();
        const subscribers = await subscribersRes.json();
        renderAdmin(orders.records || [], subscribers.records || []);
        setMessage(message, "Dashboard loaded.", "success");
      } catch {
        setMessage(message, "Dashboard is ready. Check ADMIN_API_KEY and Supabase variables in Vercel.", "error");
      }
    });
  });

  function renderAdmin(orders, subscribers) {
    const orderBody = document.querySelector("[data-admin-orders]");
    const subBody = document.querySelector("[data-admin-subscribers]");
    const paidTotal = orders.reduce((sum, order) => sum + Number(order.subtotal || 0), 0);
    const orderCount = document.querySelector("[data-admin-orders-count]");
    const subCount = document.querySelector("[data-admin-subs-count]");
    const revenue = document.querySelector("[data-admin-revenue]");
    if (orderCount) orderCount.textContent = orders.length;
    if (subCount) subCount.textContent = subscribers.length;
    if (revenue) revenue.textContent = money(paidTotal);
    if (orderBody) {
      orderBody.innerHTML =
        orders.map((order) => `<tr><td>${new Date(order.created_at).toLocaleString()}</td><td>${order.customer_name || ""}</td><td>${order.customer_email || ""}</td><td>${(order.items || []).map((item) => `${item.title} (${item.variant}) x ${item.quantity}`).join("<br>")}</td><td>${money(order.subtotal || 0)}</td><td>${order.status || "new"}</td></tr>`).join("") || '<tr><td colspan="6">No orders yet.</td></tr>';
    }
    if (subBody) {
      subBody.innerHTML =
        subscribers.map((sub) => `<tr><td>${new Date(sub.created_at).toLocaleString()}</td><td>${sub.full_name || ""}</td><td>${sub.email || ""}</td><td>${sub.source || ""}</td></tr>`).join("") || '<tr><td colspan="4">No subscribers yet.</td></tr>';
    }
  }

  function setMessage(target, text, type) {
    if (!target) return;
    target.textContent = text;
    target.className = type ? `form-message ${type}` : "form-message";
  }

  renderCart();
})();
