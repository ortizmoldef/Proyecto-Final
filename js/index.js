const images = document.querySelector('.carousel-images');
const buttons = document.querySelectorAll('.carousel-buttons button');
const indicators = document.querySelectorAll('.indicators div');
let currentIndex = 0;

function updateCarousel() {
    const offset = -currentIndex * 100;
    images.style.transform = `translateX(${offset}%)`;
    indicators.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % indicators.length;
    updateCarousel();
});

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + indicators.length) % indicators.length;
    updateCarousel();
});

indicators.forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.dataset.index, 10);
        updateCarousel();
    });
});

// Auto-slide functionality
setInterval(() => {
    currentIndex = (currentIndex + 1) % indicators.length;
    updateCarousel();
}, 5000);


// Seleccionar el menú hamburguesa y el dropdown
const hamburgerMenu = document.querySelector('.hamburger_menu');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Mostrar/ocultar el menú desplegable al hacer clic
hamburgerMenu.addEventListener('click', () => {
    dropdownMenu.style.display =
        dropdownMenu.style.display === 'block' ? 'none' : 'block';
});
