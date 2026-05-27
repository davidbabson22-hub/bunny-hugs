// Front-End Interactions for Bunny Hugs Landing Page
document.addEventListener('DOMContentLoaded', () => {
  
  const watchStoryBtn = document.getElementById('watchStoryBtn');
  const primaryCta = document.querySelector('.hero-actions .btn-primary');

  // Interactive Click State Event Handlers
  if (watchStoryBtn) {
    watchStoryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('🎥 Launching the Bunny Hugs Premium comfort production video concept...');
    });
  }

  if (primaryCta) {
    primaryCta.addEventListener('click', (e) => {
      console.log('Action trace: Lead initiating context query via primary acquisition button.');
    });
  }

  // Soft Parallax animation trace for Floating Badge micro-interactions
  const badges = document.querySelectorAll('.floating-badge');
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    badges.forEach((badge, index) => {
      const depth = (index + 1) * 8;
      const moveX = (mouseX - 0.5) * depth;
      const moveY = (mouseY - 0.5) * depth;
      badge.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
});
