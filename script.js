(() => {
  const body = document.body;
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileMenuOverlay');
  const searchToggle = document.getElementById('searchToggle');
  const searchPanel = document.getElementById('searchPanel');
  const siteSearch = document.getElementById('siteSearch');
  const clearSearch = document.getElementById('clearSearch');
  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const categoryLinks = Array.from(document.querySelectorAll('[data-category-link]'));
  const products = Array.from(document.querySelectorAll('[data-product]'));
  const emptyState = document.getElementById('emptyState');
  const legalDisclaimer = document.getElementById('legalDisclaimer');
  const disclaimerClose = document.getElementById('disclaimerClose');
  const ageGateModal = document.getElementById('ageGateModal');
  const ageGateConfirm = document.getElementById('ageGateConfirm');
  const ageGateDeny = document.getElementById('ageGateDeny');

  let activeFilter = 'all';

  function setBodyLocked(isLocked) {
    body.classList.toggle('menu-open', isLocked);
    body.classList.toggle('scroll-locked', isLocked);
  }

  function openMobileMenu() {
    if (!mobileMenu || !mobileToggle || !mobileOverlay) return;
    mobileMenu.hidden = false;
    mobileOverlay.classList.add('active');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.classList.add('active');
    setBodyLocked(true);
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileToggle || !mobileOverlay) return;
    mobileMenu.hidden = true;
    mobileOverlay.classList.remove('active');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.classList.remove('active');
    setBodyLocked(false);
  }

  function toggleMobileMenu() {
    if (!mobileMenu) return;
    if (mobileMenu.hidden) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  }

  function toggleSearchPanel() {
    if (!searchPanel || !searchToggle) return;
    const willOpen = searchPanel.hidden;
    searchPanel.hidden = !willOpen;
    searchToggle.setAttribute('aria-expanded', String(willOpen));
    if (willOpen && siteSearch) {
      setTimeout(() => siteSearch.focus(), 30);
    }
  }

  function applyFilters() {
    const query = siteSearch ? siteSearch.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    products.forEach((product) => {
      const category = product.dataset.category || '';
      const searchText = product.dataset.search || product.textContent.toLowerCase();
      const matchesCategory = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = !query || searchText.includes(query) || product.textContent.toLowerCase().includes(query);
      const shouldShow = matchesCategory && matchesSearch;
      product.hidden = !shouldShow;
      if (shouldShow) visibleCount += 1;
    });

    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  function setFilter(filter) {
    activeFilter = filter;
    filterButtons.forEach((button) => {
      button.classList.toggle('active', button.dataset.filter === filter);
    });
    applyFilters();
  }

  mobileToggle?.addEventListener('click', toggleMobileMenu);
  mobileOverlay?.addEventListener('click', closeMobileMenu);

  mobileMenu?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMobileMenu();
    }
  });

  searchToggle?.addEventListener('click', toggleSearchPanel);

  siteSearch?.addEventListener('input', applyFilters);

  clearSearch?.addEventListener('click', () => {
    if (!siteSearch) return;
    siteSearch.value = '';
    siteSearch.focus();
    applyFilters();
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.filter || 'all'));
  });

  categoryLinks.forEach((link) => {
    link.addEventListener('click', () => setFilter(link.dataset.categoryLink || 'all'));
  });

  disclaimerClose?.addEventListener('click', () => {
    legalDisclaimer?.classList.add('is-hidden');
  });

  ageGateConfirm?.addEventListener('click', () => {
    ageGateModal?.classList.add('is-hidden');
    sessionStorage.setItem('pcStaticResearchGateAccepted', 'true');
  });

  ageGateDeny?.addEventListener('click', () => {
    window.location.href = 'about:blank';
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
      if (searchPanel && !searchPanel.hidden) {
        searchPanel.hidden = true;
        searchToggle?.setAttribute('aria-expanded', 'false');
      }
    }
  });

  if (sessionStorage.getItem('pcStaticResearchGateAccepted') === 'true') {
    ageGateModal?.classList.add('is-hidden');
  }

  applyFilters();
})();
