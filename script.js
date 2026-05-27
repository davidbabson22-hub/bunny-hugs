// INITIALIZE ICON PIPELINES
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}

// SMART MOBILE SCREEN NAVBAR TRIGGER SLIDER
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

if (mobileMenuToggle && mobileNavOverlay) {
  mobileMenuToggle.addEventListener('click', () => {
    const isActived = mobileMenuToggle.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = isActived ? 'hidden' : '';
  });

  mobileNavOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// MOUSE INTERACTIVE TRANSLATION LOGIC (DESKTOP CONTROLLER MAP)
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cursor && cursorRing && window.innerWidth > 900) {
  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function renderCursorRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
    requestAnimationFrame(renderCursorRing);
  }
  renderCursorRing();

  document.querySelectorAll('a, button, input, textarea, .feat-card, .faq-q').forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.4)';
    });
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

// STICKY HEADER SHADOW AND METRIC LINES
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercentage = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = progressPercentage + '%';
  }
});

// AUTOMATED DATA NUMBERS TICKER ENGINE
function runCounterAnimation(targetElement, targetMaxVal) {
  let initialValue = 0;
  const speedIncrement = targetMaxVal / 50;
  const counterTicker = setInterval(() => {
    initialValue = Math.min(initialValue + speedIncrement, targetMaxVal);
    targetElement.textContent = Math.floor(initialValue) + (targetElement.dataset.suffix || '');
    if (initialValue >= targetMaxVal) clearInterval(counterTicker);
  }, 25);
}

if (document.querySelector('.stat-num')) {
  setTimeout(() => {
    document.querySelectorAll('.stat-num').forEach(metricBlock => {
      const maxValue = parseInt(metricBlock.getAttribute('data-target'));
      if (!isNaN(maxValue) && maxValue > 0) {
        runCounterAnimation(metricBlock, maxValue);
      }
    });
  }, 400);
}

// BACKDROP LAYOUT PARTICLES ENGINE
const particleCanvas = document.getElementById('particles');
if (particleCanvas) {
  const context = particleCanvas.getContext('2d');
  let dotsCollection = [];

  function adjustCanvasBounds() {
    particleCanvas.width = particleCanvas.parentElement.offsetWidth;
    particleCanvas.height = particleCanvas.parentElement.offsetHeight;
  }
  adjustCanvasBounds();
  window.addEventListener('resize', adjustCanvasBounds);

  class ScreenDot {
    constructor() { this.spawn(); }
    spawn() {
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.radius = Math.random() * 2.5 + 1;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.3 + 0.1;
      const themePastels = ['rgba(12,60,108,', 'rgba(46,163,220,', 'rgba(249,219,228,'];
      this.assignedColor = themePastels[Math.floor(Math.random() * themePastels.length)];
    }
    animate() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > particleCanvas.width || this.y < 0 || this.y > particleCanvas.height) {
        this.spawn();
      }
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fillStyle = this.assignedColor + this.opacity + ')';
      context.fill();
    }
  }

  for (let i = 0; i < 45; i++) dotsCollection.push(new ScreenDot());

  function runEngineLoop() {
    context.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    dotsCollection.forEach(dot => dot.animate());
    requestAnimationFrame(runEngineLoop);
  }
  runEngineLoop();
}

// MECHANICAL ACCORDION TOGGLE EXPANSION FUNCTION
function toggleFaq(buttonElement) {
  const targetedItem = buttonElement.closest('.faq-item');
  const isCurrentlyOpen = targetedItem.classList.contains('open');
  
  document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));
  if (!isCurrentlyOpen) {
    targetedItem.classList.add('open');
  }
}

// LOAD PROGRESS AUTOMATED BARS STAGE
document.querySelectorAll('.progress-fill').forEach(fillBar => {
  setTimeout(() => {
    const dataWidth = fillBar.getAttribute('data-width');
    fillBar.style.width = dataWidth + '%';
  }, 800);
});
