// INITIALIZE COMPONENT ICONS
lucide.createIcons();

// MOBILE NAVIGATION LOGIC
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

function toggleMobileMenu() {
  if (!mobileMenuToggle) return;
  const isOpening = !mobileMenuToggle.classList.contains('active');
  
  mobileMenuToggle.classList.toggle('active');
  mobileNavOverlay.classList.toggle('active');
  
  // Disable background movement during overlay viewing
  document.body.style.overflow = isOpening ? 'hidden' : '';
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
      toggleMobileMenu();
    }
  });
});

// DESKTOP CUSTOM MOUSE CURSOR TRACKING
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

if (cursor && cursorRing) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; 
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px'; 
    cursor.style.top = mouseY + 'px';
  });

  function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  // Attach hover expand states across clickable UI selectors
  document.querySelectorAll('button, a, .feat-card, .testi-card, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px'; cursor.style.height = '20px';
      cursorRing.style.width = '60px'; cursorRing.style.height = '60px';
      cursorRing.style.borderColor = 'rgba(14,165,233,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px'; cursor.style.height = '12px';
      cursorRing.style.width = '40px'; cursorRing.style.height = '40px';
      cursorRing.style.borderColor = 'rgba(14,165,233,0.5)';
    });
  });
}

// NAVBAR SCROLL DECORATION MATRIX
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  // Avoid flashing properties on structured static sub-pages (like Contact)
  if (navbar && !document.title.includes("Contact Us")) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrollPct + '%';
  }
});

// GSAP HOMEPAGE INTERACTIVE ANIMATIONS
if (typeof gsap !== 'undefined' && document.getElementById('heroEyebrow')) {
  gsap.registerPlugin(ScrollTrigger);
  
  // Hero section entry sequenzer
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.fromTo('#heroEyebrow', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 })
    .fromTo('#heroLine1', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    .fromTo('#heroLine2', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .fromTo('#heroSub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .fromTo('#heroCtas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .fromTo('#heroStats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .fromTo('#heroImageWrap', { opacity: 0, x: 80, scale: 0.92 }, { opacity: 1, x: 0, scale: 1, duration: 1.2 }, '-=1.0')
    .fromTo('.badge', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15 }, '-=0.5');

  // Global scroll display controllers
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' } });
  });

  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: -70 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } });
  });

  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: 70 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } });
  });

  // Performance progress loader filling track metrics
  document.querySelectorAll('.progress-fill').forEach(bar => {
    ScrollTrigger.create({ trigger: bar, start: 'top 85%', onEnter: () => { bar.style.width = bar.dataset.width + '%'; } });
  });
  
  // Parallax dynamic drift handling
  gsap.to('.bg-circle', { y: -60, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
}

// DATA COUNTER TICKER ALGORITHM
function animateCounter(el, target) {
  if (target === 0) return;
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    if (current >= target) clearInterval(timer);
  }, 20);
}

if (document.querySelector('.stat-num')) {
  setTimeout(() => {
    document.querySelectorAll('.stat-num[data-target]').forEach(el => {
      const t = parseInt(el.dataset.target);
      if (!isNaN(t) && t > 0) animateCounter(el, t);
    });
  }, 900);
}

// HERO BACKDROP BACKGROUND PARTICLES ENGINE
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.r = Math.random() * 3 + 1;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.4 + 0.1;
      const colors = ['rgba(14,165,233,', 'rgba(251,191,36,', 'rgba(249,168,212,'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      this.draw();
    }
  }

  for (let i = 0; i < 70; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => p.update());
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// FAQ ACCORDION EXPANSION UTILS
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}
