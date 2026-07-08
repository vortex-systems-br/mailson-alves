/* ============================================================
   MAILSON ALVES — PSICÓLOGO CLÍNICO
   script.js v1.2
   Developed by Vórtex Systems BR
   ============================================================ */
'use strict';

/* =========================================================
   1. UTILITIES
   ========================================================= */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
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
    header.classList.toggle('scrolled', window.scrollY > 48);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* =========================================================
   4. MOBILE MENU — HAMBURGER TOGGLE
   ========================================================= */
(function initMobileMenu() {
  const hamburger  = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const toggle = (open) => {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', String(open));
  };

  hamburger.addEventListener('click', () => {
    toggle(!mobileMenu.classList.contains('open'));
  });

  $$('.mobile-link, .mobile-menu .btn').forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

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
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $$('.rev,.revL,.revR,.revS').forEach(el => el.classList.add('on'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
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

      // Fecha todos
      items.forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Abre o clicado (se estava fechado)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

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
   8. PARALLAX — HERO VISUAL (SUTIL, APENAS DESKTOP)
   ========================================================= */
(function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const mqDesktop = window.matchMedia('(min-width: 769px)');
  if (!mqDesktop.matches) return;

  const heroVisual = $('.hero-visual img');
  if (!heroVisual) return;

  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const heroHeight = $('.hero')?.offsetHeight || window.innerHeight;
        if (scrolled < heroHeight) {
          heroVisual.style.transform = `translateY(${scrolled * 0.18}px) scale(1.05)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  mqDesktop.addEventListener('change', (e) => {
    if (!e.matches) heroVisual.style.transform = '';
  });
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
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  setTimeout(() => {
    $$('.hero .rev, .hero .revL, .hero .revR, .hero .revS')
      .forEach(el => el.classList.add('on'));
  }, 100);
})();

/* =========================================================
   11. FLOAT-WA — AUTO-HIDE NO HERO E NA SEÇÃO CTA
        Esconde o botão flutuante quando o usuário já está
        sobre uma área que tem botão de WhatsApp visível,
        evitando duplicidade visual no mobile.
   ========================================================= */
(function initFloatWAVisibility() {
  const floatWa = $('.float-wa');
  if (!floatWa) return;

  // Zonas onde o botão flutuante é redundante
  const hideZones = $$('.hero, .cta-final');
  if (!hideZones.length) return;

  // Controla opacidade via estilo inline para não depender de CSS extra
  const setVisibility = (visible) => {
    floatWa.style.transition = 'opacity 0.35s ease, transform 0.35s ease, box-shadow 0.25s ease';
    floatWa.style.opacity       = visible ? '' : '0';
    floatWa.style.pointerEvents = visible ? '' : 'none';
    floatWa.style.transform     = visible ? '' : 'scale(0.75)';
  };

  let visibleCount = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        visibleCount += e.isIntersecting ? 1 : -1;
      });
      // Garante que o valor nunca fique negativo por timing race
      visibleCount = Math.max(0, visibleCount);
      setVisibility(visibleCount === 0);
    },
    { threshold: 0.25 }
  );

  hideZones.forEach(el => observer.observe(el));
})();
