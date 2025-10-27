class CartProducts {
    static loadBasket() {
        const container = document.getElementById('basket-content');
        if (!container) return;
        container.innerHTML = ''; // очистка контейнера перед загрузкой новых данных

        const basketContent = document.createElement('div');
        basketContent.id = 'basketContent';
        container.appendChild(basketContent);

        const cart = ChangeCart.getCart();
        if (cart.length === 0) {
            const emptyBasketMessage = document.createElement('h1');
            emptyBasketMessage.textContent = 'Ваша корзина пуста.';
            emptyBasketMessage.className = 'empty-basket-message';
            basketContent.appendChild(emptyBasketMessage);
            return;
        }

        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            totalItems += item.quantity;
            const itemElement = document.createElement('div');
            itemElement.className = 'basket-item';

            const link = document.createElement('a');
            link.href = `../pages/${item.productId}.html`;

            const img = document.createElement('img');
            img.className = 'basket-img';
            img.src = item.image;
            img.alt = item.name;

            const itemDetails = document.createElement('div');
            itemDetails.className = 'item-details';

            const itemName = document.createElement('h2');
            itemName.textContent = item.name;
            

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `Цена: ${item.price * item.quantity}`;
            

            const itemQuantity = document.createElement('p');
            itemQuantity.textContent = `Количество: ${item.quantity}`;
            

            const plusItemButton = document.createElement('button');
            plusItemButton.textContent = '+';
            plusItemButton.addEventListener('click', () => {
                ChangeCart.addToCart(item.productId);
                CartProducts.loadBasket();
            });
            

            const minusItemButton = document.createElement('button');
            minusItemButton.textContent = '-';
            minusItemButton.addEventListener('click', () => {
                ChangeCart.minusItem(item.productId);
                CartProducts.loadBasket();
            });
            

            const removeItemButton = document.createElement('button');
            removeItemButton.textContent = 'Удалить';
            removeItemButton.className = 'remove-item-button';
            removeItemButton.addEventListener('click', () => {
                ChangeCart.removeFromCart(item.productId);
                CartProducts.loadBasket();
            });


            link.appendChild(img);
            itemElement.appendChild(link);
            itemDetails.appendChild(itemName);
            itemDetails.appendChild(itemPrice);
            itemDetails.appendChild(itemQuantity);
            itemDetails.appendChild(minusItemButton);
            itemDetails.appendChild(removeItemButton);
            itemDetails.appendChild(plusItemButton);

            itemElement.appendChild(itemDetails);
            basketContent.appendChild(itemElement);
            
        });

        const totalElement = document.createElement('div');
        totalElement.className = 'basket-total';

        const totalPriceElement = document.createElement('h2');
        totalPriceElement.textContent = `Итоговая цена: ${totalPrice} руб. Всего товаров: ${totalItems}`;

        const buyButton = document.createElement('button');
        buyButton.type = 'button';
        buyButton.className = 'checkout-button';
        buyButton.textContent = 'Купить';
        buyButton.addEventListener('click', function() {
            // alert('Спасибо за покупку! Ваш заказ оформлен.');
            const form = CartProducts.checkoutForm();
            document.body.appendChild(form);
            
        });

        totalElement.appendChild(buyButton);

        totalElement.appendChild(totalPriceElement);
        container.appendChild(totalElement);
}

    static getItemCount(productId) {
        const cart = ChangeCart.getCart();
        const item = cart.find(item => item.productId === productId);
        return item ? item.quantity : 0;
    }


    static checkoutForm() {
        // Форма оформления заказа может быть реализована здесь
        const form = document.createElement('form');
        form.className = 'checkout-form';

        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Имя:';
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameInput.required = true;

        const addressLabel = document.createElement('label');
        addressLabel.textContent = 'Адрес:';
        const addressInput = document.createElement('input');
        addressInput.type = 'text';
        addressInput.name = 'address';
        addressInput.required = true;

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'order-button';
        submitButton.textContent = 'Оформить заказ';

        form.appendChild(nameLabel);
        form.appendChild(nameInput);
        form.appendChild(addressLabel);
        form.appendChild(addressInput);
        form.appendChild(submitButton);

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Спасибо за покупку! Ваш заказ оформлен.');
            ChangeCart.clearCart();
            CartProducts.loadBasket();
            document.body.removeChild(form);
        });

        return form;
    }
}