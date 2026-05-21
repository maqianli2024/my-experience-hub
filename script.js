// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') navLinks.classList.remove('open');
});

// ==================== Filter cards ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.classList.remove('hidden');
        card.classList.remove('visible');
        // Re-trigger entrance animation
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.classList.add('visible');
          });
        });
      } else {
        card.classList.add('hidden');
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

// Observe cards with stagger
document.querySelectorAll('.card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;
  card.classList.add('fade-in');
  revealObserver.observe(card);
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
document.querySelectorAll('.card').forEach((card) => {
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
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.borderBottomColor = 'rgba(255,255,255,0.1)';
    navbar.style.background = 'rgba(11,11,16,0.9)';
  } else {
    navbar.style.borderBottomColor = '';
    navbar.style.background = '';
  }
}, { passive: true });

// ==================== Reduced motion ====================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.querySelectorAll('.aurora-blob').forEach((blob) => {
    blob.style.animation = 'none';
  });
}
