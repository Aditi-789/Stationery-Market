// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart in localStorage
function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add item to cart
function addToCart(productId, productName, productPrice, productImage, quantity = 1) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity
        });
    }
    
    updateCartStorage();
    updateCartUI();
    alert('Item added to cart!');
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartStorage();
    updateCartUI();
}

// Function to update quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(newQuantity);
        updateCartStorage();
        updateCartUI();
    }
}

// Function to update cart UI
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            cartItemsContainer.innerHTML += `
                <tr>
                    <td><a href="#" onclick="removeFromCart('${item.id}')"><i class="far fa-times-circle"></i></a></td>
                    <td><img src="${item.image}" alt="${item.name}"></td>
                    <td>${item.name}</td>
                    <td>₹${item.price}</td>
                    <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)"></td>
                    <td>₹${itemTotal}</td>
                </tr>
            `;
        });
        
        if (cartSubtotalElement) cartSubtotalElement.textContent = `₹${subtotal}`;
        if (cartTotalElement) cartTotalElement.innerHTML = `<strong>₹${subtotal}</strong>`;
    }
    
    // Update cart count in navbar
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
}

// Function to apply coupon
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value;
    const discountElement = document.getElementById('discount');
    const cartTotalElement = document.getElementById('cart-total');
    const cartSubtotal = parseFloat(document.getElementById('cart-subtotal').textContent.replace('₹', ''));
    
    // Simple coupon logic - you can expand this
    if (couponCode === 'STATIONERY10') {
        const discount = cartSubtotal * 0.1; // 10% discount
        discountElement.textContent = `-₹${discount.toFixed(2)}`;
        cartTotalElement.innerHTML = `<strong>₹${(cartSubtotal - discount).toFixed(2)}</strong>`;
        alert('Coupon applied successfully! 10% discount added.');
    } else if (couponCode) {
        alert('Invalid coupon code');
    }
}

// Function to proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    // In a real implementation, this would redirect to a checkout page
    alert('Proceeding to checkout! This would redirect to payment in a real implementation.');
}

// Initialize cart UI when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    
    // Add click event to all "Add to Cart" buttons
    document.querySelectorAll('.pro .des a').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const product = this.closest('.pro');
            const productId = product.querySelector('img').src; // Using image src as ID for simplicity
            const productName = product.querySelector('h5').textContent;
            const productPrice = parseFloat(product.querySelector('h4').textContent.replace('₹', ''));
            const productImage = product.querySelector('img').src;
            
            addToCart(productId, productName, productPrice, productImage);
        });
    });
});

// Your existing mobile menu toggle code
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}
