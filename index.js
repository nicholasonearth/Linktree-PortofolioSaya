// Particle System for Background
class Particles {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        this.setupCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.setupCanvas());
    }
    
    setupCanvas() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }
    
    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Smooth Scroll Animation
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll('.nav-card, .profile-card, .cta-section');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Hover Sound Effects
function setupHoverSounds() {
    const hoverSound = () => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (error) {
            // Silent fail if audio context is not supported
        }
    };
    
    // Add hover sound to navigation cards
    const cards = document.querySelectorAll('.nav-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', hoverSound);
    });
}

// Typing Animation for Professional Title
function typeWriterEffect() {
    const titleElement = document.querySelector('.professional-title');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    function type() {
        if (i < originalText.length) {
            titleElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

// Counter Animation for Stats (if added later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
        } else {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        }
    };
    
    updateCounter();
}

// Parallax Effect on Mouse Move (Desktop only)
function setupParallax() {
    // Only enable parallax on desktop devices
    if (window.innerWidth > 768) {
        const container = document.querySelector('.container');
        
        container.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            container.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
        });
        
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
}

// Touch-friendly interactions for mobile
document.addEventListener('touchstart', function() {}, {passive: true});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system (only on desktop for performance)
    if (window.innerWidth > 768) {
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            new Particles(particlesContainer);
        }
    }
    
    // Setup animations and interactions
    setupIntersectionObserver();
    
    // Only setup hover sounds on desktop
    if (window.innerWidth > 768) {
        setupHoverSounds();
    }
    
    typeWriterEffect();
    setupParallax();
    
    // Add click event to contact card
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
        contactCard.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to footer contact section
            smoothScrollTo('.main-footer');
        });
    }
    
    // Add subtle hover effects to social links (desktop only)
    if (window.innerWidth > 768) {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-3px) scale(1.1)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Mobile-specific optimizations
    if (window.innerWidth <= 768) {
        // Add touch feedback for mobile
        const touchElements = document.querySelectorAll('.nav-card, .social-link');
        touchElements.forEach(el => {
            el.addEventListener('touchstart', () => {
                el.style.transform = 'scale(0.98)';
                el.style.opacity = '0.9';
            });
            
            el.addEventListener('touchend', () => {
                el.style.transform = 'scale(1)';
                el.style.opacity = '1';
            });
        });
        
        // Prevent zoom on double-tap
        document.addEventListener('dblclick', (e) => {
            e.preventDefault();
        }, { passive: false });
    }
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Re-initialize anything that needs resizing
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer && particlesContainer.querySelector('canvas')) {
            particlesContainer.innerHTML = '';
            new Particles(particlesContainer);
        }
    }, 250);
});