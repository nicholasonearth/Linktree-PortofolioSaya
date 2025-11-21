

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
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
    document.querySelectorAll(".nav-links li a").forEach(n => n.addEventListener("click", () => {
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
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
        switches.forEach(s => s.checked = isDarkMode);
    }

    switches.forEach(themeSwitch => {
        themeSwitch.addEventListener('change', () => {
            const isDarkMode = themeSwitch.checked;
            updateTheme(isDarkMode);
        });
    });

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        const isDarkMode = currentTheme === 'dark';
        updateTheme(isDarkMode);
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

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex--);
        } else {
            typingText.textContent = currentWord.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const typeSpeed = isDeleting ? 100 : 200;
        setTimeout(type, typeSpeed);
    }
    if (typingText) {
        type();
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
    }

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
