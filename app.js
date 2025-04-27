let allProducts = [];
async function data() {
    let response = await fetch('https://fakestoreapi.com/products');
    let products = await response.json();
    allProducts = products;
    renderProducts(allProducts);
}
function renderProducts(products) {
    const Products = document.getElementById('Products');
    if (!Products) return; 
    Products.innerHTML = "";
    products.forEach((item) => {
        let shortTitle = item.title.length > 10 ? item.title.slice(0, 11) + '...' : item.title;
        let shortDescription = item.description.split(' ').slice(0, 20).join(' ') + '...';
        Products.innerHTML += `
        <div id="products">
         <div>
            <img src="${item.image}" alt="${item.title}" width="100">
            </div>
            <h3><span>${shortTitle}</span></h3> 
            <div><p>${shortDescription}
            </p></div>
            <div class="divider"></div>
            <h2>£${item.price}/-</h2>
            <div class="divider"></div>
            <div class="cartbtn">
                <button class="btn btn-dark">Details</button>
                <button class="btn btn-dark add-to-cart" data-id="${item.id}">Add to Cart</button>
          </div>
        </div>`;
    });
    setupAddToCartButtons(products);
}
function setupAddToCartButtons(currentProducts) {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((button) => {
        const productId = parseInt(button.getAttribute('data-id'));
        const product = currentProducts.find(p => p.id === productId);
        button.addEventListener('click', () => {
            addToCart(product);
        });
    });
}
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const incrementElement = document.getElementById('increment');
    if (incrementElement) {
        incrementElement.textContent = `(${count})`;
    }
}
function renderCart() {
    const cartContainer = document.getElementById('Cart');
    if (!cartContainer) return;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div id="cartlist">
            <a href="./1.Home.html">Continue Shopping 🛒🛍...</a>
            </div>
        `;
        return;
    }
    cartContainer.innerHTML = `
            <div class="cart-items"   ></div>
            <div class="cart-summary" ></div>
    `;
    const itemsContainer = cartContainer.querySelector('.cart-items');
    const summaryContainer = cartContainer.querySelector('.cart-summary');
    let totalQuantity = 0;
    let subtotal = 0;
    cart.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        totalQuantity += item.quantity;
        subtotal += item.price * item.quantity;
        const cartItemHTML = `
            <div class="cart-item" data-id="${item.id}" style="margin-bottom: 10px;">
                <img src="${item.image}" alt="${item.title}" width="50">
                <span>${item.title}</span>
                <div class="cart-itembtn">
                    <button class="decrease-qty" data-id="${item.id}">−</button>
                    <span> ${item.quantity}</span>
                    <button class="increase-qty" data-id="${item.id}">+</button>
                </div>
                <span >£${itemTotal}</span>
            </div>
            <hr>
        `;
        itemsContainer.innerHTML += cartItemHTML;
    });
    const shippingCost = 30;
    const grandTotal = subtotal + shippingCost;
    summaryContainer.innerHTML = `
        <h3>🧾 Order Summary</h3><hr>
        <p><strong>🛍 Products:</strong> ${cart.length}</p>
        <p><strong>📦 Total Quantity:</strong> ${totalQuantity}</p>
        <p><strong>💰 Subtotal:</strong> £${subtotal.toFixed(2)}</p>
        <p><strong>🚚 Shipping:</strong> £${shippingCost.toFixed(2)}</p>
        <hr>
        <h3>🔢 Total: £${grandTotal.toFixed(2)}</h3><hr>
    `;
    setupCartQuantityButtons();
}
function setupCartQuantityButtons() {
    const increaseBtns = document.querySelectorAll('.increase-qty');
    const decreaseBtns = document.querySelectorAll('.decrease-qty');
    increaseBtns.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            updateCartItemQuantity(id, 1);
        });
    });
    decreaseBtns.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            updateCartItemQuantity(id, -1);
        });
    });
}
function updateCartItemQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.id === productId);

    if (index !== -1) {
        cart[index].quantity += change;

        if (cart[index].quantity < 1) {
            cart.splice(index, 1); 
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart(); 
        updateCartCount(); 
    }
}
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('Products')) {
        data();
    }
    if (document.getElementById('Cart')) {
        renderCart();
    }
    updateCartCount();
    const categoryButtons = ['all', 'men', 'women', 'jewelery', 'electronics'];
    categoryButtons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                let filtered;
                switch (id) {
                    case 'all':
                        filtered = allProducts;
                        break;
                    case 'men':
                        filtered = allProducts.filter(item => item.category === "men's clothing");
                        break;
                    case 'women':
                        filtered = allProducts.filter(item => item.category === "women's clothing");
                        break;
                    case 'jewelery':
                        filtered = allProducts.filter(item => item.category === "jewelery");
                        break;
                    case 'electronics':
                        filtered = allProducts.filter(item => item.category === "electronics");
                        break;
                }
                renderProducts(filtered);
            });
        }
    }); 
});
