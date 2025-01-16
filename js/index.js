document.addEventListener('DOMContentLoaded', function() {
    // Carrusel
    const images = document.querySelector('.carousel_images');
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

    // Menú Hamburguesa
    const hamburgerMenu = document.querySelector('.hamburger_menu');
    const dropdownMenu = document.querySelector('.dropdown_menu');
    if (hamburgerMenu && dropdownMenu) {
        hamburgerMenu.addEventListener('click', () => {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    let cart = [];

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

    function toggleCart() {
        const cartPopup = document.getElementById('cartPopup');
        if (cartPopup) {
            cartPopup.style.display = cartPopup.style.display === 'none' || cartPopup.style.display === '' ? 'flex' : 'none';
        }
        updateCart();
    }

    function closeCart() {
        const cartPopup = document.getElementById('cartPopup');
        if (cartPopup) {
            cartPopup.style.display = 'none';
        }
    }

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

    function closeOrder() {
        const orderPopup = document.getElementById('orderPopup');
        if (orderPopup) {
            orderPopup.style.display = 'none';
        }
    }

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

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

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

    function createAddToCartButtons() {
        const productos = document.querySelectorAll('.producto');
        productos.forEach(producto => {
            const name = producto.querySelector('h3').textContent;
            const price = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));
            const imageUrl = producto.querySelector('img').src;
    
            // Crear el label para la cantidad
            const cantidadLabel = document.createElement('label');
            cantidadLabel.textContent = 'Cantidad:';
            cantidadLabel.classList.add('cantidad-label');  // Añadir clase
    
            // Crear el input para seleccionar la cantidad
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = 1;
            quantityInput.min = 1;
            quantityInput.classList.add('cantidad-input'); // Añadir clase
    
            // Crear el botón "Añadir al carrito"
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Añadir al carrito';
            addToCartButton.classList.add('add-to-cart-button'); // Añadir clase
            addToCartButton.addEventListener('click', function () {
                const quantity = parseInt(quantityInput.value, 10);
                addToCart({ name, price, imageUrl }, quantity);
            });
    
            // Añadir el label, input y botón al producto
            producto.appendChild(cantidadLabel);
            producto.appendChild(quantityInput);
            producto.appendChild(addToCartButton);
        });
    }

    function toggleViewOrderButton() {
        const viewOrderButton = document.getElementById('viewOrderButton');
        const confirmOrderButton = document.getElementById('confirmOrderButton');

        if (viewOrderButton) {
            viewOrderButton.style.display = cart.length > 0 ? 'block' : 'none';
        }

        if (confirmOrderButton) {
            confirmOrderButton.style.display = cart.length > 0 ? 'block' : 'none';
        }
    }

    // Actualizar la cantidad de productos
    const cantidadInputs = document.querySelectorAll('.cantidad-range');
    cantidadInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const cantidadValue = e.target.value;
            const cantidadDisplay = e.target.nextElementSibling;
            cantidadDisplay.textContent = cantidadValue;
        });
    });

    createAddToCartButtons();

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

    const confirmOrderButton = document.getElementById('confirmOrderButton');
    if (confirmOrderButton) {
        confirmOrderButton.addEventListener('click', function () {
            if (cart.length === 0) {
                alert('El carrito está vacío. Agrega productos antes de confirmar el pedido.');
                return;
            }

            alert('¡Pedido confirmado!');
            cart = [];
            updateCart();
            closeOrder();
            closeCart();
        });

        confirmOrderButton.style.display = 'none';
    }
});
