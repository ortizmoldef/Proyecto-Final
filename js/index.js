document.addEventListener('DOMContentLoaded', function() {
    // Carrusel
    const images = document.querySelector('.carousel-images');
    const indicators = document.querySelectorAll('.indicators div');
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        if (images) {
            images.style.transform = `translateX(${offset}%)`;
        }
        indicators.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goNext() {
        currentIndex = (currentIndex + 1) % indicators.length;
        updateCarousel();
    }

    function goPrev() {
        currentIndex = (currentIndex - 1 + indicators.length) % indicators.length;
        updateCarousel();
    }

    function goToIndex(index) {
        currentIndex = index;
        updateCarousel();
    }

    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    if (nextButton && prevButton) {
        nextButton.addEventListener('click', goNext);
        prevButton.addEventListener('click', goPrev);
    }

    if (indicators) {
        indicators.forEach(dot => {
            dot.addEventListener('click', () => {
                goToIndex(parseInt(dot.dataset.index, 10));
            });
        });
    }

    setInterval(goNext, 5000);

    // Filtro de productos
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

    const categoriaSelect = document.getElementById('categoria');
    if (categoriaSelect) {
        categoriaSelect.addEventListener('change', filtrarCategoria);
    }

    // Menú Hamburguesa
    const hamburgerMenu = document.querySelector('.hamburger_menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (hamburgerMenu && dropdownMenu) {
        hamburgerMenu.addEventListener('click', () => {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

     // Carrito de compras
    let cart = [];

    // Función para añadir productos al carrito
    function addToCart(product) {
        cart.push(product);
        updateCart();
    }

    // Función para mostrar/ocultar el carrito
    function toggleCart() {
        const cartPopup = document.getElementById('cartPopup');
        if (cartPopup) {
            cartPopup.style.display = cartPopup.style.display === 'none' || cartPopup.style.display === '' ? 'flex' : 'none';
        }
        updateCart();
    }

    // Función para cerrar el carrito
    function closeCart() {
        const cartPopup = document.getElementById('cartPopup');
        if (cartPopup) {
            cartPopup.style.display = 'none';
        }
    }

    // Función para mostrar el resumen del pedido
    function showOrderSummary() {
        const orderPopup = document.getElementById('orderPopup');
        const confirmOrderButton = document.getElementById('confirmOrderButton');
        
        if (orderPopup) {
            orderPopup.style.display = 'flex';
            updateOrderSummary();
        }

        // Ocultar el botón de confirmar pedido cuando se visualiza el resumen
        if (confirmOrderButton) {
            confirmOrderButton.style.display = 'none';
        }
    }

   

    // Función para cerrar el resumen del pedido
    function closeOrder() {
        const orderPopup = document.getElementById('orderPopup');
        if (orderPopup) {
            orderPopup.style.display = 'none';
        }
    }

    // Función para actualizar la visualización del carrito
    function updateCart() {
        const cartItems = document.getElementById('cartItems');
        if (cartItems) {
            cartItems.innerHTML = ''; // Limpiar el carrito
            cart.forEach((item, index) => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');

                // Crear un contenedor para la imagen, nombre y precio
                const cartItemContent = document.createElement('div');
                cartItemContent.classList.add('cart-item-content');

                // Crear la imagen del producto
                const imageElement = document.createElement('img');
                imageElement.src = item.imageUrl || '';  // Suponiendo que la imagen se pasó al carrito
                imageElement.alt = item.name;
                imageElement.classList.add('cart-item-image');

                // Crear el texto del producto
                const textElement = document.createElement('div');
                textElement.classList.add('cart-item-text');
                textElement.textContent = `${item.name} - $${item.price}`;

                // Crear el botón "Eliminar"
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Eliminar';
                removeButton.classList.add('remove-from-cart');
                removeButton.addEventListener('click', () => removeFromCart(index));

                cartItemContent.appendChild(imageElement);
                cartItemContent.appendChild(textElement);
                cartItemElement.appendChild(cartItemContent);
                cartItemElement.appendChild(removeButton); // Añadir el botón de eliminar
                cartItems.appendChild(cartItemElement);
            });
        }
    }

    // Función para eliminar un producto del carrito
    function removeFromCart(index) {
        cart.splice(index, 1); // Elimina el producto en el índice especificado
        updateCart();  // Actualiza la visualización del carrito
    }

    // Función para actualizar el resumen del pedido
    function updateOrderSummary() {
        const orderDetails = document.getElementById('orderDetails');
        if (orderDetails) {
            orderDetails.innerHTML = ''; // Limpiar el resumen
            let total = 0;
            cart.forEach(item => {
                const orderItemElement = document.createElement('div');
                orderItemElement.classList.add('cart-item');

                // Crear un contenedor para la imagen, nombre y precio
                const orderItemContent = document.createElement('div');
                orderItemContent.classList.add('order-item-content');

                // Crear la imagen del producto
                const imageElement = document.createElement('img');
                imageElement.src = item.imageUrl || '';  // Suponiendo que la imagen se pasó al resumen
                imageElement.alt = item.name;
                imageElement.classList.add('order-item-image');

                // Crear el texto del producto
                const textElement = document.createElement('div');
                textElement.classList.add('order-item-text');
                textElement.textContent = `${item.name} - $${item.price}`;

                orderItemContent.appendChild(imageElement);
                orderItemContent.appendChild(textElement);
                orderItemElement.appendChild(orderItemContent);

                // Añadir al resumen del pedido
                orderDetails.appendChild(orderItemElement);
                total += item.price;
            });

            // Mostrar el total en el resumen
            const totalElement = document.createElement('div');
            totalElement.classList.add('order-total');
            totalElement.textContent = `Total: $${total}`;
            orderDetails.appendChild(totalElement);
        }
    }

    // Función para crear botones "Añadir al carrito" dinámicamente
    function createAddToCartButtons() {
        const productos = document.querySelectorAll('.producto');
        productos.forEach(producto => {
            const name = producto.querySelector('h3').textContent;
            const price = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));
            const imageUrl = producto.querySelector('img').src;  // Obtener la imagen

            // Crear el botón "Añadir al carrito"
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Añadir al carrito';
            addToCartButton.addEventListener('click', function() {
                addToCart({ name, price, imageUrl });
            });

            producto.appendChild(addToCartButton); // Agregar el botón al producto
        });
    }

    // Llamamos a la función para crear los botones "Añadir al carrito"
    createAddToCartButtons();

    // Evento para abrir/cerrar el carrito
    const shoppingCartIcon = document.querySelector('.shopping_Cart');
    if (shoppingCartIcon) {
        shoppingCartIcon.addEventListener('click', toggleCart);
    }

    // Evento para cerrar el carrito (con el id 'closeCart')
    const closeCartButton = document.getElementById('closeCart');
    if (closeCartButton) {
        closeCartButton.addEventListener('click', closeCart);
    }

    // Evento para cerrar el resumen del pedido (con el id 'closeOrder')
    const closeOrderButton = document.getElementById('closeOrder');
    if (closeOrderButton) {
        closeOrderButton.addEventListener('click', closeOrder);
    }

    // Evento para mostrar el resumen del pedido
    const orderSummaryButton = document.querySelector('#cartPopup button');
    if (orderSummaryButton) {
        orderSummaryButton.addEventListener('click', showOrderSummary);
    }

    // Función para agregar el botón "Pagar"
    function pagar() {
        const payButton = document.getElementById('payButton');
        if (payButton) {
            payButton.addEventListener('click', showOrderSummary);
        }
    }

    pagar(); // Llamar la función pagar para asociar el evento al botón de pagar

    // Botón de confirmar pedido
    const confirmOrderButton = document.createElement('button');
    confirmOrderButton.textContent = 'Confirmar Pedido';
    confirmOrderButton.id = 'confirmOrderButton';
    confirmOrderButton.addEventListener('click', function() {
        alert('Pedido confirmado');
        cart = [];  // Vaciar el carrito
        updateCart();  // Actualizar la visualización
        closeOrder();  // Cerrar la pestaña de resumen del pedido
    });

    const orderPopup = document.getElementById('orderPopup');
    if (orderPopup) {
        orderPopup.appendChild(confirmOrderButton);
    }
});
