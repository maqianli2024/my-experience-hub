// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') navLinks.classList.remove('open');
});

// ==================== Theme toggle ====================
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.dataset.theme = savedTheme;

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  updateNavbar();
});

// ==================== Filter timeline ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const tlItems = document.querySelectorAll('.tl-item');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    tlItems.forEach((item) => {
      const match = filter === 'all' || item.dataset.category === filter;
      if (match) {
        item.classList.remove('hidden');
        item.classList.remove('visible');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            item.classList.add('visible');
          });
        });
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ==================== Scroll reveal ====================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.05 }
);

// Observe timeline items with stagger
document.querySelectorAll('.tl-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 80}ms`;
  item.classList.add('fade-in');
  revealObserver.observe(item);
});

// Observe other elements
document.querySelectorAll('.stat-item, .about-content, .section-header').forEach((el) => {
  el.classList.add('fade-in');
  revealObserver.observe(el);
});

// ==================== Counter animation ====================
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 1500;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-number').forEach((el) => counterObserver.observe(el));

// ==================== Card glow follow mouse ====================
document.querySelectorAll('.tl-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
  });
});

// ==================== Navbar behavior ====================
// Close mobile menu on scroll
let scrollTimer;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    navLinks.classList.remove('open');
  }, 100);
}, { passive: true });

// Navbar solidify on scroll
const navbar = document.querySelector('.navbar');
function updateNavbar() {
  const isDark = document.documentElement.dataset.theme !== 'light';
  if (window.scrollY > 50) {
    navbar.style.background = isDark ? 'rgba(11,11,16,0.92)' : 'rgba(250,251,252,0.95)';
    navbar.style.borderBottomColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  } else {
    navbar.style.background = '';
    navbar.style.borderBottomColor = '';
  }
}
window.addEventListener('scroll', updateNavbar, { passive: true });

// ==================== Reduced motion ====================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.querySelectorAll('.aurora-blob').forEach((blob) => {
    blob.style.animation = 'none';
  });
}
