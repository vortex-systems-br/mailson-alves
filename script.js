/* ============================================================
   MAILSON ALVES — PSICÓLOGO CLÍNICO
   script.js v1.0
   Developed by Vórtex Systems BR
   ============================================================ */

'use strict';

/* =========================================================
   1. UTILITIES
   ========================================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* =========================================================
   2. YEAR IN FOOTER
   ========================================================= */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================================================
   3. NAVBAR — GLASSMORPHISM ON SCROLL
   ========================================================= */
(function initNavbar() {
  const header = $('#header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 48) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* =========================================================
   4. MOBILE MENU — HAMBURGER TOGGLE
   ========================================================= */
(function initMobileMenu() {
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const toggle = (open) => {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', String(open));
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    toggle(!isOpen);
  });

  // Close when a mobile link is clicked
  $$('.mobile-link, .mobile-menu .btn').forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggle(false);
      hamburger.focus();
    }
  });
})();

/* =========================================================
   5. SCROLL REVEAL — INTERSECTION OBSERVER
   ========================================================= */
(function initReveal() {
  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    $$('.rev,.revL,.revR,.revS').forEach(el => el.classList.add('on'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Apply delay from inline style if present
          const delay = entry.target.style.transitionDelay || '0s';
          // Re-apply to ensure it's active at reveal time
          entry.target.style.transitionDelay = delay;
          entry.target.classList.add('on');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.rev, .revL, .revR, .revS').forEach(el => observer.observe(el));
})();

/* =========================================================
   6. FAQ ACCORDION
   ========================================================= */
(function initFAQ() {
  const items = $$('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard support
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
})();

/* =========================================================
   7. SMOOTH SCROLL — ANCHOR LINKS
   ========================================================= */
(function initSmoothScroll() {
  const navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '78',
    10
  );

  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* =========================================================
   8. PARALLAX — HERO VISUAL (SUBTLE)
   ========================================================= */
(function initParallax() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const heroVisual = $('.hero-visual img');
  if (!heroVisual) return;

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || window.innerHeight;
        if (scrolled < heroHeight) {
          const offset = scrolled * 0.18;
          heroVisual.style.transform = `translateY(${offset}px) scale(1.05)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* =========================================================
   9. ACTIVE NAV LINK ON SCROLL
   ========================================================= */
(function initActiveNav() {
  const navLinks = $$('.nav-links a');
  const sections = navLinks
    .map(a => {
      const id = a.getAttribute('href')?.replace('#', '');
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const navH = 90;

  const setActive = () => {
    const scrollY = window.scrollY + navH + 60;
    let current = sections[0];

    sections.forEach(section => {
      if (section.offsetTop <= scrollY) current = section;
    });

    navLinks.forEach(link => {
      link.removeAttribute('aria-current');
      if (link.getAttribute('href') === `#${current.id}`) {
        link.setAttribute('aria-current', 'page');
      }
    });
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

/* =========================================================
   10. HERO ENTRANCE ANIMATION (ON LOAD)
   ========================================================= */
(function initHeroEntrance() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Hero elements animate on load immediately
  const heroEls = $$('.hero .rev, .hero .revL, .hero .revR, .hero .revS');
  // They're handled by IntersectionObserver but hero is above fold, so trigger manually
  setTimeout(() => {
    heroEls.forEach(el => el.classList.add('on'));
  }, 100);
})();
