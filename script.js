/* ==========================================
   DANIELA LOZANO — V3 — INTERACTIONS
   ========================================== */

(() => {
  'use strict';

  // ----- Nav scroll state -----
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 12) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ----- Mobile menu -----
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // ----- Scroll reveal -----
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealSelectors = [
    '.brands',
    '.hero__bio-text',
    '.hero__bio-stats .stat',
    '.work__head',
    '.project',
    '.windmar-stats .windmar-stat',
    '.windmar-feature',
    '.windmar-role',
    '.windmar-markets .market-card',
    '.aviatur-stats .aviatur-stat',
    '.aviatur-intro__stats .aviatur-stat',
    '.hotels-grid',
    '.hotel-card',
    '.alcestre-feature',
    '.alcestre-item',
    '.experience__head',
    '.timeline__card',
    '.services__head',
    '.service',
    '.stack',
    '.fit__title',
    '.fit__col',
    '.fit__cta',
    '.contact__title',
    '.contact__copy',
    '.contact__cta-primary',
    '.contact__channels-secondary'
  ];

  const targets = [];
  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
      targets.push(el);
    });
  });

  if (reduced) {
    targets.forEach(t => t.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(t => io.observe(t));

    // Failsafe: anything still not visible after 3s of inactivity gets revealed
    setTimeout(() => {
      targets.forEach(t => {
        if (!t.classList.contains('is-visible')) {
          // only reveal if it's already above the fold OR if user has scrolled
          const rect = t.getBoundingClientRect();
          if (rect.top < window.innerHeight + 200) {
            t.classList.add('is-visible');
          }
        }
      });
    }, 600);
  } else {
    targets.forEach(t => t.classList.add('is-visible'));
  }

  // ----- Smooth scroll with nav offset -----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    });
  });
})();
