const products = [
    { id: 1, name: 'Espresso', price: 2.00 },
    { id: 2, name: 'Latte', price: 3.50 },
    { id: 3, name: 'Cappuccino', price: 3.00 }
];

const cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const productElements = document.querySelectorAll('.product button');
    productElements.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    document.getElementById('checkout').addEventListener('click', showCheckoutForm);
    document.getElementById('checkoutForm').addEventListener('submit', placeOrder);
});

function addToCart(event) {
    const productId = event.target.parentElement.getAttribute('data-id');
    const product = products.find(p => p.id == productId);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            cart.splice(index, 1);
            updateCart();
        });
        li.appendChild(removeButton);
        cartItemsElement.appendChild(li);
    });

    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

function showCheckoutForm() {
    document.getElementById('checkout-form').style.display = 'block';
}

function placeOrder(event) {
    event.preventDefault();
    alert('Order placed successfully!');
    cart.length = 0;
    updateCart();
    document.getElementById('checkout-form').style.display = 'none';
    document.getElementById('checkoutForm').reset();
}
