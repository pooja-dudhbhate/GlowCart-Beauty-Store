// GlowCart Products
const products = [
    {
        id: 1,
        name: "Vitamin C Face Serum",
        category: "Skincare",
        price: 499,
        oldPrice: 699,
        rating: "★★★★★",
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500"
    },
    {
        id: 2,
        name: "Hydrating Face Cream",
        category: "Skincare",
        price: 349,
        oldPrice: 499,
        rating: "★★★★☆",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500"
    },
    {
        id: 3,
        name: "Matte Lipstick",
        category: "Makeup",
        price: 299,
        oldPrice: 399,
        rating: "★★★★★",
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500"
    },
    {
        id: 4,
        name: "Luxury Foundation",
        category: "Makeup",
        price: 599,
        oldPrice: 799,
        rating: "★★★★☆",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500"
    },
    {
        id: 5,
        name: "Hair Repair Shampoo",
        category: "Haircare",
        price: 399,
        oldPrice: 549,
        rating: "★★★★★",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500"
    },
    {
        id: 6,
        name: "Hair Care Oil",
        category: "Haircare",
        price: 279,
        oldPrice: 349,
        rating: "★★★★☆",
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500"
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem("glowcart")) || [];

// Display Products
function displayProducts(items) {
    const productList = document.getElementById("product-list");

    productList.innerHTML = "";

    if (items.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
    }

    items.forEach(product => {
        productList.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="rating">${product.rating}</p>
                <p>₹${product.price}
                <del>₹${product.oldPrice}</del></p>
                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// Add Product to Cart
function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    alert(product.name + " added to cart!");
}

// Save Cart
function saveCart() {
    localStorage.setItem("glowcart", JSON.stringify(cart));
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").textContent = count;
}

// Show Cart
function showCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "YOUR GLOWCART\n\n";
    let total = 0;

    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
        total += item.price * item.quantity;
    });

    message += `\nTotal Amount: ₹${total}`;
    alert(message);
}

// Category Filter
function filterProducts(category) {
    if (category === "All") {
        displayProducts(products);
    } else {
        const filtered = products.filter(
            product => product.category === category
        );
        displayProducts(filtered);
    }
}

// Search Products
function searchProducts() {
    const searchValue = document
        .getElementById("search")
        .value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue)
    );

    displayProducts(filtered);
}

// Initial Load
displayProducts(products);
updateCartCount();
