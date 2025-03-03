
const cart = [];
const cartSidebar = document.querySelector('.cart-sidebar');
const cartItemsList = document.querySelector('.cart-items');
const totalElement = document.getElementById('total');  // Fixed selector issue

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: parseFloat(button.dataset.price)
        };
        cart.push(product);
        updateCartDisplay();
        cartSidebar.classList.add('active');
    });
});

// Update cart display
function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="remove-item" data-index="${index}">X</button>
        `;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    totalElement.textContent = total.toFixed(2);

    // Attach event listeners for remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            removeFromCart(index);
        });
    });
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Toggle cart visibility
document.querySelector('.close-cart').addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});
