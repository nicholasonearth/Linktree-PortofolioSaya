document.addEventListener('DOMContentLoaded', function () {
    // --- BARU: Logika Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });

    // --- Kursor Kustom ---
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

    // --- Efek Header Saat Scroll ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // --- Menu Mobile (Hamburger) ---
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

    // --- Toggle Dark Mode ---
    const themeSwitch = document.querySelector('#checkbox');
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        // Simpan preferensi tema
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    // Cek preferensi tema saat memuat halaman
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme + '-mode');
        if (currentTheme === 'dark') {
            themeSwitch.checked = true;
            document.body.classList.remove('light-mode');
        }
    }

    // --- Animasi Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Animate skill bars
                if (entry.target.classList.contains('skill-bar')) {
                    const progress = entry.target.querySelector('.bar-progress');
                    progress.style.width = progress.getAttribute('data-width');
                }
            }
        });
    }, { 
        threshold: 0.1 // Sedikit lebih cepat memicu animasi
    });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Efek Mengetik (Typing Effect) ---
    const typingText = document.querySelector('.typing-text');
    const words = ["UDINUS.", "FAKULTAS ILMU KOMPUTER", "PROGRAM STUDI TEKNIK INFORMATIKA"]; // Ganti dengan teks Anda
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
    // Panggil fungsi type() hanya jika elemen .typing-text ada
    if (typingText) {
        type();
    }

    // --- Efek 3D Tilt ---
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

    // --- Tombol Back to Top ---
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

    // --- BARU: Navigasi Aktif (Scroll Spy) ---
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('.nav-links li a');

    function activateMenu() {
        let current = 'hero'; // Default ke hero
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Ambil header height untuk offset yang lebih akurat
            const headerHeight = header ? header.offsetHeight : 50; // default 50px jika header null
            if (pageYOffset >= (sectionTop - headerHeight - 100)) { // buffer 100px
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
    // Panggil di 'scroll' dan 'load'
    window.addEventListener('scroll', activateMenu);
    window.addEventListener('load', activateMenu);
});