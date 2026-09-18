/* ==========================================================================
   A²MILS AMDK - MAIN APPLICATION ENTRY POINT
   ========================================================================== */

import { initWaterCanvas } from './water-canvas.js';
import { initHydrationCalculator } from './calculator.js';
import { initProductInteractions } from './product-modal.js';
import { initOrderGenerator } from './order-generator.js';
import { initDistributionChecker } from './distribution-checker.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Interactive Water Canvas
  initWaterCanvas();

  // 2. Initialize Hydration Calculator
  initHydrationCalculator();

  // 3. Initialize Product Catalog & Modals
  initProductInteractions();

  // 4. Initialize Distribution Area Checker
  initDistributionChecker();

  // 5. Initialize WhatsApp Order Builder
  initOrderGenerator();

  // 6. Theme Toggle Logic (Light / Ocean Deep Dark Mode)
  initThemeToggle();

  // 7. Sticky Navbar & Mobile Navigation
  initNavbar();

  // 8. FAQ Accordion Interaction
  initFAQAccordion();

  // 9. Scroll Reveal Animations
  initScrollReveal();

  // 10. Button Ripple Effect
  initRippleEffects();
});

function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  const savedTheme = localStorage.getItem('a2mils-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('a2mils-theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
    } else {
      themeIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }
}

function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const navLinksList = document.getElementById('nav-links-list');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', () => {
      navLinksList.classList.toggle('open');
      const isOpen = navLinksList.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    const links = navLinksList.querySelectorAll('.nav-link');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
        if (mobileToggle) mobileToggle.innerHTML = '☰';
      });
    });
  }
}

function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other FAQs
      faqItems.forEach((other) => other.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function initRippleEffects() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-send-whatsapp, .btn-card-order');

  buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      const rect = button.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-effect');

      const existingRipple = button.querySelector('.ripple-effect');
      if (existingRipple) {
        existingRipple.remove();
      }

      button.appendChild(circle);
    });
  });
}
