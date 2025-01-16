document.addEventListener('DOMContentLoaded', function () {
    // Carrusel
    const images = document.querySelector('.carousel_images'); // Obtiene el contenedor de imágenes del carrusel
    const indicators = document.querySelectorAll('.indicators div'); // Obtiene los indicadores (puntos) del carrusel
    let currentIndex = 0; // Índice actual del carrusel


      // Función para actualizar la posición del carrusel
    function updateCarousel() {
        const offset = -currentIndex * 100; // Calcula el desplazamiento en porcentaje
        if (images) {
            images.style.transform = `translateX(${offset}%)`;  // Mueve las imágenes
        } 
        indicators.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);  // Resalta el indicador activo
        });
    }

    // Función para avanzar al siguiente slide
    function goNext() {
        currentIndex = (currentIndex + 1) % indicators.length;
        updateCarousel();
    }

    // Función para retroceder al slide anterior
    function goPrev() {
        currentIndex = (currentIndex - 1 + indicators.length) % indicators.length;
        updateCarousel();
    }

    // Función para ir a un slide específico
    function goToIndex(index) {
        currentIndex = index;
        updateCarousel();
    }


      // Obtiene los botones de navegación del carrusel
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    // Añade eventos a los botones si existen
    if (nextButton && prevButton) {
        nextButton.addEventListener('click', goNext);
        prevButton.addEventListener('click', goPrev);
    }


     // Agrega funcionalidad a los indicadores del carrusel
    if (indicators) {
        indicators.forEach(dot => {
            dot.addEventListener('click', () => {
                goToIndex(parseInt(dot.dataset.index, 10));
            });
        });
    }


    // Configura el cambio automático de imágenes cada 5 segundos
    setInterval(goNext, 5000);


    // Menú Hamburguesa
    const hamburgerMenu = document.querySelector('.hamburger_menu');
    const dropdownMenu = document.querySelector('.dropdown_menu');
    if (hamburgerMenu && dropdownMenu) {
        hamburgerMenu.addEventListener('click', () => {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    // **Carrito de Compras**
    let cart = [];

     // Función para agregar un producto al carrito
    function addToCart(product, quantity) {
        // Verifica si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            existingProduct.quantity += quantity;
        } else {
            // Si el producto no está, agrégalo con la cantidad
            cart.push({ ...product, quantity });
        }
        updateCart();
    }


    // Función para mostrar u ocultar el carrito
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
        if (cart.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de ver tu pedido.');
            return;
        }

        const orderPopup = document.getElementById('orderPopup');
        if (orderPopup) {
            orderPopup.style.display = 'flex';
            updateOrderSummary();
        }

        const confirmOrderButton = document.getElementById('confirmOrderButton');
        if (confirmOrderButton) {
            confirmOrderButton.style.display = 'block';
        }
    }

    // Función para cerrar el resumen del pedido
    function closeOrder() {
        const orderPopup = document.getElementById('orderPopup');
        if (orderPopup) {
            orderPopup.style.display = 'none';
        }
    }


     // Función para actualizar el carrito
    function updateCart() {
        const cartItems = document.getElementById('cartItems');
        if (cartItems) {
            cartItems.innerHTML = '';
            cart.forEach((item, index) => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart_item');

                const cartItemContent = document.createElement('div');
                cartItemContent.classList.add('cart_item_content');

                const imageElement = document.createElement('img');
                imageElement.src = item.imageUrl || '';
                imageElement.alt = item.name;
                imageElement.classList.add('cart_item_image');

                const textElement = document.createElement('div');
                textElement.classList.add('cart_item_text');
                textElement.textContent = `${item.name} - $${item.price} x ${item.quantity} = $${item.price * item.quantity}`;

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Eliminar';
                removeButton.classList.add('remove_from_cart');
                removeButton.addEventListener('click', () => removeFromCart(index));

                cartItemContent.appendChild(imageElement);
                cartItemContent.appendChild(textElement);
                cartItemElement.appendChild(cartItemContent);
                cartItemElement.appendChild(removeButton);
                cartItems.appendChild(cartItemElement);
            });
        }

        toggleViewOrderButton();
    }

    // Función para eliminar un producto del carrito
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    // Función para actualizar el resumen del pedido
    function updateOrderSummary() {
        const orderDetails = document.getElementById('orderDetails');
        if (orderDetails) {
            orderDetails.innerHTML = '';
            let total = 0;
            cart.forEach(item => {
                const orderItemElement = document.createElement('div');
                orderItemElement.classList.add('cart_item');

                const orderItemContent = document.createElement('div');
                orderItemContent.classList.add('order_item_content');

                const imageElement = document.createElement('img');
                imageElement.src = item.imageUrl || '';
                imageElement.alt = item.name;
                imageElement.classList.add('order_item_image');

                const textElement = document.createElement('div');
                textElement.classList.add('order_item_text');
                textElement.textContent = `${item.name} - $${item.price} x ${item.quantity} = $${item.price * item.quantity}`;

                orderItemContent.appendChild(imageElement);
                orderItemContent.appendChild(textElement);
                orderItemElement.appendChild(orderItemContent);
                orderDetails.appendChild(orderItemElement);
                total += item.price * item.quantity;
            });

            const totalElement = document.createElement('div');
            totalElement.classList.add('order_total');
            totalElement.textContent = `Total: $${total}`;
            orderDetails.appendChild(totalElement);
        }
    }

    
    // **Configuración de botones "Añadir al carrito"**
    function createAddToCartButtons() {
        const productos = document.querySelectorAll('.producto');
        productos.forEach(producto => {
            const name = producto.querySelector('h3').textContent;
            const price = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));
            const imageUrl = producto.querySelector('img').src;
        
            // Crear el label para la cantidad
            const cantidadLabel = document.createElement('label');
            cantidadLabel.textContent = 'Cantidad: 0'; // Cambiado para que inicie en 0
            cantidadLabel.classList.add('cantidad_label');  // Añadir clase
        
            // Crear el input para seleccionar la cantidad
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = 0;  // El valor inicial es 0
            quantityInput.min = 1;    // El valor mínimo es 1 (ya no se puede seleccionar 0)
            quantityInput.classList.add('cantidad_input'); // Añadir clase
        
            // Crear el botón "Añadir al carrito"
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Añadir al carrito';
            addToCartButton.classList.add('add_to_cart_button'); // Añadir clase
            addToCartButton.addEventListener('click', function () {
                const quantity = parseInt(quantityInput.value, 10);
                if (quantity > 0) {  // Solo agregar al carrito si la cantidad es mayor a 0
                    addToCart({ name, price, imageUrl }, quantity);
                } else {
                    alert('Por favor, selecciona una cantidad mayor a 0.');
                }
            });
        
            // Actualizar el label cada vez que cambie la cantidad en el input
            quantityInput.addEventListener('input', function () {
                cantidadLabel.textContent = 'Cantidad: ' + quantityInput.value; // Actualiza el label con el valor del input
            });
        
            // Añadir el label, input y botón al producto
            producto.appendChild(cantidadLabel);
            producto.appendChild(quantityInput);
            producto.appendChild(addToCartButton);
        });
    }


    function toggleViewOrderButton() {
        // Obtener el botón "Ver resumen del pedido" por su ID
        const viewOrderButton = document.getElementById('viewOrderButton');
        
        // Obtener el botón "Confirmar pedido" por su ID
        const confirmOrderButton = document.getElementById('confirmOrderButton');
    
        // Verifica si el botón "Ver resumen del pedido" existe
        if (viewOrderButton) {
            // Si hay productos en el carrito (cart.length > 0), mostrar el botón; si no, ocultarlo
            viewOrderButton.style.display = cart.length > 0 ? 'block' : 'none'; 
        }
    
        // Verifica si el botón "Confirmar pedido" existe
        if (confirmOrderButton) {
            // Si hay productos en el carrito (cart.length > 0), mostrar el botón; si no, ocultarlo
            confirmOrderButton.style.display = cart.length > 0 ? 'block' : 'none'; 
        }
    }

    // Actualizar la cantidad de productos
    const cantidadInputs = document.querySelectorAll('.cantidad_range');
    cantidadInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const cantidadValue = e.target.value;
            const cantidadDisplay = e.target.nextElementSibling;
            cantidadDisplay.textContent = cantidadValue;
        });
    });

    createAddToCartButtons();



    // **Eventos del carrito y del resumen de pedido**
    const shoppingCartIcon = document.querySelector('.shopping_Cart');
    if (shoppingCartIcon) {
        shoppingCartIcon.addEventListener('click', toggleCart);
    }

    const closeCartButton = document.getElementById('closeCart');
    if (closeCartButton) {
        closeCartButton.addEventListener('click', closeCart);
    }

    const closeOrderButton = document.getElementById('closeOrder');
    if (closeOrderButton) {
        closeOrderButton.addEventListener('click', closeOrder);
    }

    const orderSummaryButton = document.getElementById('payButton');
    if (orderSummaryButton) {
        orderSummaryButton.addEventListener('click', showOrderSummary);
    }

    const viewOrderButton = document.getElementById('viewOrderButton');
    if (viewOrderButton) {
        viewOrderButton.addEventListener('click', showOrderSummary);
        viewOrderButton.style.display = 'none'; // Se oculta inicialmente
    }

    // **Confirma y verifica el pedido**
    const confirmOrderButton = document.getElementById('confirmOrderButton');
    if (confirmOrderButton) {
        confirmOrderButton.addEventListener('click', function () {
            if (cart.length === 0) {
                alert('El carrito está vacío. Agrega productos antes de confirmar el pedido.');
                return;
            }

            alert('¡Pedido confirmado!');
            cart = [];  // Vaciar el carrito
            updateCart();

            // Reiniciar las cantidades de productos
            const quantityInputs = document.querySelectorAll('.cantidad_input');
            quantityInputs.forEach(input => {
                input.value = 0; // Restablece la cantidad a 0
            });

            // Reiniciar los labels de cantidad
            const cantidadLabels = document.querySelectorAll('.cantidad_label');
            cantidadLabels.forEach(label => {
                label.textContent = 'Cantidad: 0'; // Restablece el label de cantidad a 0
            });

            closeOrder();
            closeCart();
        });

        confirmOrderButton.style.display = 'none';
    }
});
