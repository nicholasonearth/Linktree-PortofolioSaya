// Menginisialisasi VanillaTilt.js pada elemen dengan kelas .container
// Ini akan memberikan efek miring 3D yang interaktif
VanillaTilt.init(document.querySelector(".container"), {
    max: 15,      // Kemiringan maksimal (derajat)
    speed: 400,   // Kecepatan transisi
    glare: true,  // Menambahkan efek kilau
    "max-glare": 0.5 // Intensitas kilau
});