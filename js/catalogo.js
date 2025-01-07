// Seleccionar el menú hamburguesa y el dropdown
const hamburgerMenu = document.querySelector('.hamburger_menu');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Mostrar/ocultar el menú desplegable al hacer clic
hamburgerMenu.addEventListener('click', () => {
    dropdownMenu.style.display =
        dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

