// ==========================================
// MODERN PORTFOLIO JAVASCRIPT - ADAM KASSIS
// ==========================================

// ==========================================
// PARTICLE BACKGROUND ANIMATION
// ==========================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

// Mouse interaction
let mouse = {
  x: null,
  y: null,
  radius: 150
};

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Particle class
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // Mouse interaction
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 2;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 2;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 2;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 2;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

// Initialize particles
function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 3 + 1;
    let x = Math.random() * (canvas.width - size * 2) + size;
    let y = Math.random() * (canvas.height - size * 2) + size;
    let directionX = (Math.random() * 0.4) - 0.2;
    let directionY = (Math.random() * 0.4) - 0.2;
    let color = `rgba(79, 172, 254, ${Math.random() * 0.5 + 0.2})`;

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// Connect particles
function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance = ((particlesArray[a].x - particlesArray[b].x) * 
                     (particlesArray[a].x - particlesArray[b].x)) +
                     ((particlesArray[a].y - particlesArray[b].y) * 
                     (particlesArray[a].y - particlesArray[b].y));
      
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        let opacity = 1 - (distance / 20000);
        ctx.strokeStyle = `rgba(79, 172, 254, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

// Animate particles
function animateParticles() {
  requestAnimationFrame(animateParticles);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connectParticles();
}

// Resize handler
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  mouse.radius = 150;
  initParticles();
});

// Mouse out of window
window.addEventListener('mouseout', () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

// ==========================================
// TYPING ANIMATION
// ==========================================
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = [
  'Hi, I\'m Adam KASSIS',
  'Data Engineer',
  'Problem Solver',
  'AI Enthusiast'
];

const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    cursorSpan.classList.add('typing');
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove('typing');
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    cursorSpan.classList.add('typing');
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove('typing');
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

// ==========================================
// NAVBAR SCROLL BEHAVIOR
// ==========================================
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > scrollThreshold) {
    if (scrollTop > lastScrollTop) {
      // Scrolling down
      navbar.classList.add('scroll-down');
      navbar.classList.remove('scroll-up');
    } else {
      // Scrolling up
      navbar.classList.remove('scroll-down');
      navbar.classList.add('scroll-up');
    }
  } else {
    navbar.classList.remove('scroll-down', 'scroll-up');
  }
  
  lastScrollTop = scrollTop;
});

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
      
      // Animate skill bars
      if (entry.target.classList.contains('skill')) {
        const skillBar = entry.target.querySelector('.skill-bar span');
        const width = skillBar.getAttribute('data-width');
        setTimeout(() => {
          skillBar.style.width = width;
        }, 200);
      }
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.skill, .project-card, .recommendation').forEach(el => {
  observer.observe(el);
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
const scrollBtn = document.getElementById('scrollBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    const scrollBtn = document.getElementById('scrollBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

// Add click handler for scroll button
scrollBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
  } else {
    scrollBtn.classList.remove('show');
  }
});

// ==========================================
// RECOMMENDATION FORM
// ==========================================
function addRecommendation() {
  const nameInput = document.getElementById('rec_name');
  const messageInput = document.getElementById('new_recommendation');
  
  const name = nameInput.value.trim() || 'Anonymous';
  const message = messageInput.value.trim();
  
  // Validation
  if (message === '') {
    messageInput.style.animation = 'shake 0.5s';
    messageInput.focus();
    setTimeout(() => {
      messageInput.style.animation = '';
    }, 500);
    return;
  }
  
  if (message.length < 10) {
    alert('Please write at least 10 characters.');
    return;
  }
  
  // Create new recommendation element
  const recommendationsContainer = document.getElementById('all_recommendations');
  const newRecommendation = document.createElement('div');
  newRecommendation.className = 'recommendation';
  
  // Get first letter for avatar
  const initial = name.charAt(0).toUpperCase();
  
  newRecommendation.innerHTML = `
    <div class="quote-icon">❝</div>
    <p>${message}</p>
    <div class="recommendation-author">
      <div class="author-avatar">${initial}</div>
      <div class="author-info">
        <strong>${name}</strong>
        <span>Visitor</span>
      </div>
    </div>
  `;
  
  // Add with animation
  newRecommendation.style.opacity = '0';
  newRecommendation.style.transform = 'scale(0.9)';
  recommendationsContainer.appendChild(newRecommendation);
  
  // Trigger animation
  setTimeout(() => {
    newRecommendation.classList.add('fade-in-visible');
  }, 100);
  
  // Clear form
  nameInput.value = '';
  messageInput.value = '';
  
  // Show success popup
  showPopup(true);
  
  // Scroll to new recommendation
  setTimeout(() => {
    newRecommendation.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);
}

// ==========================================
// POPUP MANAGEMENT
// ==========================================
function showPopup(show) {
  const popup = document.getElementById('popup');
  
  if (show) {
    popup.style.display = 'flex';
    setTimeout(() => {
      popup.classList.add('show');
    }, 10);
  } else {
    popup.classList.remove('show');
    setTimeout(() => {
      popup.style.display = 'none';
    }, 300);
  }
}

// Close popup when clicking outside
document.getElementById('popup').addEventListener('click', (e) => {
  if (e.target.id === 'popup') {
    showPopup(false);
  }
});

// ==========================================
// SKILL CARDS HOVER EFFECT
// ==========================================
document.querySelectorAll('.skill').forEach(skill => {
  skill.addEventListener('mousemove', (e) => {
    const rect = skill.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    skill.style.setProperty('--mouse-x', `${x}px`);
    skill.style.setProperty('--mouse-y', `${y}px`);
  });
});

// ==========================================
// PROJECT CARDS PARALLAX EFFECT
// ==========================================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ==========================================
// FORM VALIDATION
// ==========================================
const nameInput = document.getElementById('rec_name');
const messageInput = document.getElementById('new_recommendation');

messageInput.addEventListener('input', () => {
  const charCount = messageInput.value.length;
  if (charCount > 0 && charCount < 10) {
    messageInput.style.borderColor = 'rgba(245, 87, 108, 0.5)';
  } else if (charCount >= 10) {
    messageInput.style.borderColor = 'rgba(67, 233, 123, 0.5)';
  } else {
    messageInput.style.borderColor = 'var(--glass-border)';
  }
});

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================
document.addEventListener('keydown', (e) => {
  // Escape key closes popup
  if (e.key === 'Escape') {
    showPopup(false);
  }
  
  // Ctrl/Cmd + Enter submits recommendation
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    if (document.activeElement === messageInput) {
      addRecommendation();
    }
  }
});

// ==========================================
// PAGE LOAD PERFORMANCE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize particles
  initParticles();
  animateParticles();
  
  // Start typing animation
  setTimeout(type, newTextDelay + 250);
  
  // Preload images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });
  
  // Add loaded class to body
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

// ==========================================
// EASTER EGG - KONAMI CODE
// ==========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  // Rainbow effect
  document.body.style.animation = 'rainbow 2s linear infinite';
  
  setTimeout(() => {
    document.body.style.animation = '';
  }, 5000);
  
  // Show secret message
  const message = document.createElement('div');
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 2px solid var(--glass-border);
    border-radius: 20px;
    padding: 2rem;
    z-index: 9999;
    text-align: center;
    animation: scaleIn 0.5s ease-out;
  `;
  message.innerHTML = `
    <h2 style="background: var(--primary-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🎉 You found the secret! 🎉</h2>
    <p style="color: var(--text-secondary); margin-top: 1rem;">Thanks for exploring my portfolio!</p>
  `;
  
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.style.animation = 'fadeOut 0.5s ease-out';
    setTimeout(() => message.remove(), 500);
  }, 3000);
}

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
  }
`;
document.head.appendChild(style);

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c👋 Hello Developer!', 'color: #4facfe; font-size: 24px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'color: #667eea; font-size: 16px;');
console.log('%cFeel free to reach out: adam.kassis@outlook.fr', 'color: #b8bcc8; font-size: 14px;');

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================
// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#about-me';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--accent-gradient);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 0 0 8px 0;
  z-index: 10000;
  transition: top 0.3s;
`;
skipLink.addEventListener('focus', () => {
  skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
  skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ==========================================
// PERFORMANCE MONITORING
// ==========================================
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 100) {
        console.warn(`Long task detected: ${entry.duration}ms`);
      }
    }
  });
  
  observer.observe({ entryTypes: ['longtask'] });
}

console.log('%c✨ Portfolio loaded successfully!', 'color: #43e97b; font-size: 16px; font-weight: bold;');




// Add this to your existing script.js file

// ==========================================
// NAVBAR TOGGLE FUNCTIONALITY
// ==========================================
const navbarToggleButton = document.querySelector('.navbar-toggle');
let isNavbarHidden = false;

// Toggle navbar visibility
function toggleNavbar() {
  isNavbarHidden = !isNavbarHidden;
  
  if (isNavbarHidden) {
    document.body.classList.add('navbar-hidden');
    navbarToggleButton.setAttribute('data-tooltip', 'Show Navigation');
    navbarToggleButton.setAttribute('aria-label', 'Show navigation menu');
    navbarToggleButton.setAttribute('aria-expanded', 'false');
  } else {
    document.body.classList.remove('navbar-hidden');
    navbarToggleButton.setAttribute('data-tooltip', 'Hide Navigation');
    navbarToggleButton.setAttribute('aria-label', 'Hide navigation menu');
    navbarToggleButton.setAttribute('aria-expanded', 'true');
  }
  
  // Save preference to localStorage
  localStorage.setItem('navbarHidden', isNavbarHidden);
}

// Add click event listener
navbarToggleButton.addEventListener('click', toggleNavbar);

// Restore navbar state from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedState = localStorage.getItem('navbarHidden');
  
  if (savedState === 'true') {
    // Apply hidden state without animation on initial load
    document.body.classList.add('navbar-hidden');
    isNavbarHidden = true;
    navbarToggleButton.setAttribute('data-tooltip', 'Show Navigation');
    navbarToggleButton.setAttribute('aria-label', 'Show navigation menu');
    navbarToggleButton.setAttribute('aria-expanded', 'false');
  } else {
    navbarToggleButton.setAttribute('data-tooltip', 'Hide Navigation');
    navbarToggleButton.setAttribute('aria-label', 'Hide navigation menu');
    navbarToggleButton.setAttribute('aria-expanded', 'true');
  }
});

// Keyboard shortcut: Press 'n' to toggle navbar
document.addEventListener('keydown', (e) => {
  // Only trigger if not typing in an input field
  if (e.key === 'n' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    toggleNavbar();
  }
});

// Auto-hide navbar when scrolling down (optional enhancement)
// You can remove this if you only want manual toggle
let autoHideTimeout;
window.addEventListener('scroll', () => {
  // Only auto-hide if navbar is visible and user scrolls significantly
  if (!isNavbarHidden && window.pageYOffset > 500) {
    clearTimeout(autoHideTimeout);
    
    // Don't auto-hide, just show the scroll-up/scroll-down behavior
    // The manual toggle button gives users full control
  }
});

// Show navbar temporarily when hovering near top of screen (optional)
document.addEventListener('mousemove', (e) => {
  // If navbar is hidden and mouse is near top, show a hint
  if (isNavbarHidden && e.clientY < 10) {
    navbarToggleButton.style.transform = 'translateY(-3px) scale(1.1)';
  } else {
    navbarToggleButton.style.transform = '';
  }
});

// Accessibility: Announce navbar state changes to screen readers
function announceNavbarState() {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  
  announcement.textContent = isNavbarHidden ? 
    'Navigation menu hidden' : 
    'Navigation menu visible';
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Update toggle function to include announcement
const originalToggle = toggleNavbar;
toggleNavbar = function() {
  originalToggle();
  announceNavbarState();
};

console.log('%c🎛️ Navbar toggle ready! Press "n" to toggle navigation.', 
  'color: #4facfe; font-size: 14px;');