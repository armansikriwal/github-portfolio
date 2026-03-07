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

  // --- Experience tabs ---
  const tabList = document.querySelector('.tab-list');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabList && tabButtons.length && tabPanels.length) {
    tabList.addEventListener('click', (e) => {
      const clickedTab = e.target.closest('.tab-btn');
      if (!clickedTab) return;

      e.preventDefault();
      switchTab(clickedTab);
    });

    function switchTab(newTab) {
      const targetPanelId = newTab.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetPanelId);

      // Update button states
      tabButtons.forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
      });
      newTab.classList.add('active');
      newTab.setAttribute('aria-selected', 'true');

      // Update panel states
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      targetPanel.classList.add('active');
    }
  }

  // --- Interactive Architecture Diagram ---
  const archNodes = document.querySelectorAll('.arch-node');
  const infoContent = document.getElementById('info-content');

  const archData = {
    client: {
      title: '🌐 Client Applications',
      desc: 'Handling global traffic from web, mobile, and third-party integrations. Creating seamless API contracts for front-end consumers.',
      tags: ['REST', 'GraphQL', 'WebSockets', 'Rate Limiting']
    },
    api: {
      title: '🚀 API Gateway',
      desc: 'Building robust, resilient API layers using FastAPI. Serving 50K+ daily requests securely with JWT authentication and strict Role-Based Access Control.',
      tags: ['FastAPI', 'JWT Auth', 'RBAC', 'Validation']
    },
    services: {
      title: '⚙️ Microservices Layer',
      desc: 'Designing and developing production-grade business logic. Breaking down monoliths into high-performance, maintainable Python and Node.js microservices.',
      tags: ['Python', 'Django', 'Node.js', 'Pytest']
    },
    database: {
      title: '💾 Relational Databases',
      desc: 'Architecting schemas and optimizing heavy queries in PostgreSQL. Reduced overall API latency by up to 45% through intelligent indexing and execution planning.',
      tags: ['PostgreSQL', 'Query Optimization', 'Transactions']
    },
    async: {
      title: '⚡ Async Task Processing',
      desc: 'Integrating Redis and Celery to offload heavy computations, manage job queues, and implement high-speed caching layers for critical data.',
      tags: ['Redis', 'Celery', 'Caching', 'Message Queues']
    },
    infra: {
      title: '☁️ Cloud Infrastructure',
      desc: '100% Cloud Native deployments. Containerizing services with Docker and orchestrating scalable, fault-tolerant clusters using Kubernetes on AWS.',
      tags: ['Docker', 'Kubernetes', 'AWS', 'GitLab CI/CD']
    }
  };

  if (archNodes.length && infoContent) {
    archNodes.forEach(node => {
      // Allow both click and hover for accessibility and engagement
      ['click', 'mouseenter'].forEach(eventType => {
        node.addEventListener(eventType, () => {
          // Remove active state from all nodes
          archNodes.forEach(n => n.classList.remove('active'));
          // Add active state to current node
          node.classList.add('active');

          // Fetch data for the hovered node
          const target = node.getAttribute('data-target');
          const data = archData[target];

          if (data) {
            // Generate tags HTML
            const tagsHtml = data.tags.map(tag => `<span class="info-tag">${tag}</span>`).join('');
            
            // Build new HTML content
            const newContent = `
              <div class="info-title">${data.title}</div>
              <p class="info-desc">${data.desc}</p>
              <div class="info-tags">${tagsHtml}</div>
            `;

            // Simple transition effect
            infoContent.style.opacity = '0';
            setTimeout(() => {
              infoContent.innerHTML = newContent;
              infoContent.style.opacity = '1';
            }, 100);
          }
        });
      });
    });
  }
});
