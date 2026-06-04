/* ========================================
   Main JS — Interactions
   ======================================== */

(function () {
  'use strict';

  // Current language
  let currentLang = 'zh';

  // === Language Switching ===
  function setLanguage(lang) {
    if (!i18n[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang === 'ja' ? 'ja' : lang === 'en' ? 'en' : 'zh-CN';

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[lang][key]) {
        el.innerHTML = i18n[lang][key];
      }
    });

    // Update lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Store preference
    localStorage.setItem('andrew-lang', lang);
  }

  // Lang button clicks
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });

  // Restore saved language
  const savedLang = localStorage.getItem('andrew-lang');
  if (savedLang && i18n[savedLang]) {
    setLanguage(savedLang);
  }

  // === Mobile Menu ===
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // === Nav Scroll Effect ===
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    nav.classList.toggle('scrolled', currentScroll > 50);
    lastScroll = currentScroll;
  });

  // === Scroll Animations ===
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe animatable elements
  document.querySelectorAll('.service-card, .case-card, .detail-card, .consulting-card, .contact-item, .process-step').forEach(el => {
    el.classList.add('animate-in');
    observer.observe(el);
  });

  // === Smooth scroll for all anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
