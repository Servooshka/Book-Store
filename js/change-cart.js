class ChangeCart {
    static getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    static getCartItem(productId) {
        const cart = ChangeCart.getCart();
        return cart.find(item => item.productId === productId) || null;
    }

    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    static async fetchProduct(productId) {
        const response = await fetch(`../php/titles.php?id=${encodeURIComponent(productId)}`, { method: 'GET', credentials: 'same-origin' });

        if (!response.ok) {
            const text = await response.text().catch(() => response.statusText || '');
            throw new Error(`Ошибка загрузки продукта (${response.status}): ${text}`);
        }
        const product = await response.json();
        return product;
    }

    static async addToCart(productId) {
        const cart = ChangeCart.getCart();
        const item = cart.find(item => item.productId === productId);
        if (item) {
            item.quantity += 1;
        } else {
            const product = await ChangeCart.fetchProduct(productId);
            if (product) {
                cart.push({
                    productId: productId,
                    name: product.title,
                    price: product.purePrice,
                    image: product.image,
                    quantity: 1
                });
            }
        }
        ChangeCart.saveCart(cart);
    }

    static removeFromCart(productId) {
        const cart = ChangeCart.getCart();
        const updatedCart = cart.filter(item => item.productId !== productId);
        ChangeCart.saveCart(updatedCart);
    }

    static minusItem(productId) {
        const cart = ChangeCart.getCart();
        const item = cart.find(item => item.productId === productId);

        if (item && item.quantity > 1) {
            item.quantity -= 1;
            ChangeCart.saveCart(cart);
        } else if (item && item.quantity === 1) {
            ChangeCart.removeFromCart(productId);
        }
    }

    static updateCartItem(productId, quantity) {
        const cart = ChangeCart.getCart();
        const item = cart.find(item => item.productId === productId);

        if (item) {
            item.quantity = quantity;
            ChangeCart.saveCart(cart);
        }
    }

    static clearCart() {
        localStorage.removeItem('cart');
    }
}

