// index.js — mobile-first, robust theme + nav handling
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('primary-navigation');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  // --- Theme handling ---
  const THEME_KEY = 'site-theme-v1';

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      themeIcon.textContent = '☀️';
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      document.body.classList.remove('dark-theme');
      themeIcon.textContent = '🌙';
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    } else {
      // fallback to system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  }

  if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isDark = document.body.classList.toggle('dark-theme');
      applyTheme(isDark ? 'dark' : 'light');
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    });
  } else {
    console.warn('Theme toggle elements missing');
  }

  // --- Nav handling (mobile) ---
  function closeNav() {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }
  function openNav() {
    navMenu.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) { closeNav(); } else { openNav(); }
    });

    // Close nav on click of a link for better UX
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) closeNav();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && navMenu.classList.contains('open')) {
        closeNav();
        navToggle.focus();
      }
    });

    // Click outside to close (touch-friendly)
    document.addEventListener('click', (ev) => {
      if (!navMenu.contains(ev.target) && !navToggle.contains(ev.target) && navMenu.classList.contains('open')) {
        closeNav();
      }
    });
  }

  // Initialize theme at load
  initTheme();
});
