document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  // Header scroll state
  const syncHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  // Mobile drawer
  const setDrawer = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileDrawer.hidden = !open;
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setDrawer(!isOpen);
  });

  mobileDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setDrawer(false));
  });

  // Class track tabs
  const classTabs = document.querySelectorAll('.class-tab');
  const classCards = document.querySelectorAll('.class-card');

  classTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const track = tab.dataset.track;
      classTabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      classCards.forEach((card) => {
        card.hidden = card.dataset.track !== track;
      });
    });
  });

  // Select class -> booking form
  const selectedClassInput = document.getElementById('selected-class');
  document.querySelectorAll('[data-select-class]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedClassInput.value = btn.dataset.selectClass;
      document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Shop filter
  const filterTabs = document.querySelectorAll('.filter-tab');
  const products = document.querySelectorAll('.product-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat;
      filterTabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      products.forEach((item) => {
        item.hidden = cat !== 'all' && item.dataset.cat !== cat;
      });
    });
  });

  // Studio bag drawer
  const bagToggle = document.getElementById('bag-toggle');
  const bagDrawer = document.getElementById('bag-drawer');
  const bagClose = document.getElementById('bag-close');
  const bagItemsList = document.getElementById('bag-items');
  const bagEmpty = document.getElementById('bag-empty');
  const bagCount = document.getElementById('bag-count');
  const bagSubtotal = document.getElementById('bag-subtotal');
  const bagStatus = document.getElementById('bag-status');
  const bag = [];

  const renderBag = () => {
    bagCount.textContent = String(bag.length);
    bagEmpty.hidden = bag.length > 0;
    const total = bag.reduce((acc, item) => acc + item.price, 0);
    bagSubtotal.textContent = `€${total}`;

    bagItemsList.innerHTML = bag
      .map(
        (item, idx) => `
        <li class="bag-item-row">
          <div>
            <strong>${item.name}</strong>
            <div>€${item.price}</div>
          </div>
          <button type="button" class="bag-remove" data-remove="${idx}">Remove</button>
        </li>`
      )
      .join('');

    bagItemsList.querySelectorAll('.bag-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        bag.splice(Number(btn.dataset.remove), 1);
        bagStatus.hidden = true;
        renderBag();
      });
    });
  };

  const setBagOpen = (open) => {
    bagDrawer.hidden = !open;
    bagToggle.setAttribute('aria-expanded', String(open));
  };

  bagToggle.addEventListener('click', () => setBagOpen(bagDrawer.hidden));
  bagClose.addEventListener('click', () => setBagOpen(false));

  document.querySelectorAll('.add-bag-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      bag.push({ name: btn.dataset.name, price: Number(btn.dataset.price) });
      bagStatus.hidden = true;
      renderBag();
      setBagOpen(true);
    });
  });

  document.getElementById('bag-checkout-btn').addEventListener('click', () => {
    if (bag.length === 0) return;
    bagStatus.hidden = false;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!bagDrawer.hidden) setBagOpen(false);
      if (!mobileDrawer.hidden) setDrawer(false);
    }
  });

  // Class booking form
  const classForm = document.getElementById('class-form');
  const classError = document.getElementById('class-error');
  const classConfirm = document.getElementById('class-confirmation');
  const classConfirmTitle = document.getElementById('class-confirm-title');
  const classConfirmNote = document.getElementById('class-confirm-note');

  classForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('student-name').value.trim();
    const email = document.getElementById('student-email').value.trim();
    if (!name || !email.includes('@')) {
      classError.hidden = false;
      return;
    }
    classError.hidden = true;
    classConfirmTitle.textContent = selectedClassInput.value;
    classConfirmNote.textContent = `Bench reserved for ${name} (${email}). Aprons, clay, and both kiln firings are included.`;
    classForm.hidden = true;
    classConfirm.hidden = false;
  });

  document.getElementById('reset-class-btn').addEventListener('click', () => {
    classForm.reset();
    classConfirm.hidden = true;
    classForm.hidden = false;
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
});
