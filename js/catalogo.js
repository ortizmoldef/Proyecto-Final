// Seleccionar el menú hamburguesa y el dropdown
const hamburgerMenu = document.querySelector('.hamburger_menu');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Mostrar/ocultar el menú desplegable al hacer clic
hamburgerMenu.addEventListener('click', () => {
    dropdownMenu.style.display =
        dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Función para filtrar los productos según la categoría seleccionada
function filtrarCategoria() {
    const categoria = document.getElementById('categoria').value;
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto => {
        if (categoria === 'todos' || producto.getAttribute('data-categoria') === categoria) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}