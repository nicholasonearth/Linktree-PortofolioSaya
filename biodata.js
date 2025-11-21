

document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

console.log("Hamburger element:", hamburger);
console.log("Nav links element:", navLinks);

hamburger.addEventListener("click", () => {
    console.log("Hamburger clicked!");
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    console.log("Hamburger active:", hamburger.classList.contains("active"));
    console.log("Nav links active:", navLinks.classList.contains("active"));
});

document.querySelectorAll(".nav-links li a").forEach(n => n.addEventListener("click", () => {
    console.log("Nav link clicked, closing menu");
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
}));


    const themeSwitchDesktop = document.getElementById('checkbox-desktop');
    const themeSwitchMobile = document.getElementById('checkbox-mobile');
    const switches = [themeSwitchDesktop, themeSwitchMobile].filter(s => s); 

    /**
     * @param {boolean} isDarkMode 
     */
    function updateTheme(isDarkMode) {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            document.documentElement.style.setProperty('--primary-color', '#00CFE8');
            document.documentElement.style.setProperty('--secondary-color', '#172A45');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            document.documentElement.style.setProperty('--primary-color', '#007BFF');
            document.documentElement.style.setProperty('--secondary-color', '#6C757D');
        }
        switches.forEach(s => s.checked = isDarkMode);
        
        // Smooth transition effect
        document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    }

    switches.forEach(themeSwitch => {
        themeSwitch.addEventListener('change', () => {
            const isDarkMode = themeSwitch.checked;
            updateTheme(isDarkMode);
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            themeSwitch.parentElement.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        const isDarkMode = currentTheme === 'dark';
        updateTheme(isDarkMode);
    } else {
        // Default to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        updateTheme(prefersDark);
    }


    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                if (entry.target.classList.contains('skill-bar')) {
                    const progress = entry.target.querySelector('.bar-progress');
                    progress.style.width = progress.getAttribute('data-width');
                }
            }
        });
    }, { 
        threshold: 0.1
    });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    const typingText = document.querySelector('.typing-text');
    const words = ["UDINUS.", "FAKULTAS ILMU KOMPUTER", "PROGRAM STUDI TEKNIK INFORMATIKA"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex--);
            typeSpeed = 50; // Faster when deleting
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = charIndex % 3 === 0 ? 150 : 100; // Variable speed for natural feel
        }

        // Add cursor blink effect
        typingText.style.borderRight = isDeleting ? '2px solid transparent' : '2px solid var(--primary-color)';

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            setTimeout(() => {
                isDeleting = true;
                typeSpeed = 50;
                setTimeout(type, typeSpeed);
            }, typeSpeed);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }
    
    if (typingText) {
        // Add initial cursor
        typingText.style.borderRight = '2px solid var(--primary-color)';
        setTimeout(type, 1000); // Start after 1 second
    }

    const tiltElements = document.querySelectorAll("[data-tilt]");
    tiltElements.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            el.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        el.addEventListener("mouseleave", () => {
            el.style.transform = "perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)";
        });
    });

    const toTopBtn = document.getElementById("to-top-btn");
    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            toTopBtn.style.display = "flex";
        } else {
            toTopBtn.style.display = "none";
        }
    };
    toTopBtn.onclick = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('.nav-links li a');

    function activateMenu() {
        let current = 'hero';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const headerHeight = header ? header.offsetHeight : 50;
            if (pageYOffset >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) {
                a.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', activateMenu);
    window.addEventListener('load', activateMenu);
    
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");

    /**
     * @param {string} imgSrc 
     * @param {string} caption 
     */
    window.openModal = function(imgSrc, caption) {
        modal.style.display = "block";
        modal.classList.add('show-modal'); 
        modalImg.src = imgSrc;
        captionText.innerHTML = caption;
    }

    window.closeModal = function() {
        modal.classList.remove('show-modal');
        setTimeout(() => {
            modal.style.display = "none";
        }, 100); 
    }
    
    const closeBtn = document.querySelector(".modal .close");
    if(closeBtn) {
        closeBtn.onclick = closeModal;
    }
    
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };

    // Smooth Scroll Behavior
    function initSmoothScroll() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without jumping
                    history.pushState(null, null, targetId);
                }
            });
        });

        // Enhanced smooth scroll for "Back to Top" button
        const toTopBtn = document.getElementById("to-top-btn");
        if (toTopBtn) {
            toTopBtn.onclick = function (e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            };
        }

        // Add smooth scroll to any element with data-scroll attribute
        document.querySelectorAll('[data-scroll]').forEach(element => {
            element.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-scroll');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Initialize smooth scroll
    initSmoothScroll();

    // Particle Background Effect
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(particlesContainer);

        const particleCount = 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary-color);
                border-radius: 50%;
                opacity: 0.6;
            `;

            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;

            // Random animation
            const duration = 20 + Math.random() * 30;
            const delay = Math.random() * 5;
            particle.style.animation = `
                floatParticle ${duration}s ease-in-out ${delay}s infinite
            `;

            particlesContainer.appendChild(particle);
            particles.push(particle);
        }

        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
                    opacity: 0.8;
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
                    opacity: 0.5;
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.8);
                    opacity: 0.7;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize particles
    createParticles();

    // Scroll Progress Indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), #4facfe);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    createScrollProgress();

    // Contact Form Validation and Submission
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // Validation functions
        function validateName(name) {
            if (!name.trim()) {
                return 'Nama wajib diisi';
            }
            if (name.trim().length < 2) {
                return 'Nama minimal 2 karakter';
            }
            if (!/^[a-zA-Z\s]+$/.test(name)) {
                return 'Nama hanya boleh mengandung huruf dan spasi';
            }
            return '';
        }

        function validateEmail(email) {
            if (!email.trim()) {
                return 'Email wajib diisi';
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return 'Format email tidak valid';
            }
            return '';
        }

        function validateSubject(subject) {
            if (!subject.trim()) {
                return 'Subjek wajib diisi';
            }
            if (subject.trim().length < 5) {
                return 'Subjek minimal 5 karakter';
            }
            return '';
        }

        function validateMessage(message) {
            if (!message.trim()) {
                return 'Pesan wajib diisi';
            }
            if (message.trim().length < 10) {
                return 'Pesan minimal 10 karakter';
            }
            return '';
        }

        function showError(input, message) {
            const errorElement = document.getElementById(input.id + 'Error');
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
                input.style.borderColor = '#ff4757';
            }
        }

        function clearError(input) {
            const errorElement = document.getElementById(input.id + 'Error');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
                input.style.borderColor = '';
            }
        }

        // Real-time validation
        nameInput.addEventListener('input', () => {
            const error = validateName(nameInput.value);
            if (error) {
                showError(nameInput, error);
            } else {
                clearError(nameInput);
            }
        });

        emailInput.addEventListener('input', () => {
            const error = validateEmail(emailInput.value);
            if (error) {
                showError(emailInput, error);
            } else {
                clearError(emailInput);
            }
        });

        subjectInput.addEventListener('input', () => {
            const error = validateSubject(subjectInput.value);
            if (error) {
                showError(subjectInput, error);
            } else {
                clearError(subjectInput);
            }
        });

        messageInput.addEventListener('input', () => {
            const error = validateMessage(messageInput.value);
            if (error) {
                showError(messageInput, error);
            } else {
                clearError(messageInput);
            }
        });

        // Form submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all fields
            const nameError = validateName(nameInput.value);
            const emailError = validateEmail(emailInput.value);
            const subjectError = validateSubject(subjectInput.value);
            const messageError = validateMessage(messageInput.value);

            if (nameError) showError(nameInput, nameError);
            if (emailError) showError(emailInput, emailError);
            if (subjectError) showError(subjectInput, subjectError);
            if (messageError) showError(messageInput, messageError);

            if (nameError || emailError || subjectError || messageError) {
                return;
            }

            // Show loading state
            contactForm.classList.add('loading');
            submitBtn.disabled = true;

            try {
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Show success message
                const successElement = document.getElementById('formSuccess');
                if (successElement) {
                    successElement.style.display = 'block';
                }

                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (successElement) {
                        successElement.style.display = 'none';
                    }
                }, 5000);

            } catch (error) {
                console.error('Form submission error:', error);
                alert('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
            } finally {
                // Remove loading state
                contactForm.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });

        // Clear errors on focus
        const inputs = [nameInput, emailInput, subjectInput, messageInput];
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                clearError(input);
            });
        });
    }

    // Initialize contact form
    initContactForm();

    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal.style.display === "block") {
            closeModal();
        }
    });
});

const music = document.getElementById("backgroundMusic");
const button = document.getElementById("musicButton");
const text = button.querySelector(".text");

button.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        button.classList.add("active");
    } else {
        music.pause();
        button.classList.remove("active");
        text.textContent = "Play Music";
    }
});
