class ProductPage {
    constructor(container, product) {
        this.container = container;
        this.product = product;
    }

    render() {
        if (!this.product) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Товар не найден.';
            this.container.innerHTML = '';
            this.container.appendChild(emptyMessage);
            return;
        }
        // Создание блока с названием книги
        const titleNameDiv = document.createElement('div');
        titleNameDiv.className = 'title-name';
        const h1 = document.createElement('h1');
        h1.textContent = this.product.title;
        titleNameDiv.appendChild(h1);

        // Создание блока с обложкой и информацией о книге
        const titleCoverPlusInfoDiv = document.createElement('div');
        titleCoverPlusInfoDiv.className = 'title-cover-plus-info';
 
        const titleCoverPlusDetailsDiv = document.createElement('div');
        titleCoverPlusDetailsDiv.className = 'title-cover-plus-details';

        // Создание обложки книги
        const img = document.createElement('img');
        img.className = 'title-cover';
        img.src = this.product.image;
        img.alt = 'Обложка';

        // Создание блока с информацией о книге
        const titleDetailsDiv = document.createElement('div');
        titleDetailsDiv.className = 'title-details';

        // Создание заголовка для информации о книге
        const h2Details = document.createElement('h2');
        h2Details.textContent = 'О книге';
        titleDetailsDiv.appendChild(h2Details);

        // Массив с информацией о книге
        const details = [
            { label: 'Категория: ', value: this.product.category.name, link: this.product.category.link },
            { label: 'Вес: ', value: this.product.weight },
            { label: 'Размер: ', value: this.product.size },
            { label: 'Количество страниц: ', value: this.product.pages },
            { label: 'Год выпуска: ', value: this.product.year },
            { label: 'Жанр: ', value: this.product.genre },
            { label: 'Автор: ', value: this.product.author },
        ];
        
        // Добавление информации о книге
        details.forEach(detail => {
            const p = document.createElement('p');
            const span = document.createElement('span');
            span.textContent = detail.label;
            p.appendChild(span);
            if (detail.link) {
                const a = document.createElement('a');
                a.href = detail.link;
                a.textContent = detail.value;
                p.appendChild(a);
            } else {
                p.appendChild(document.createTextNode(detail.value));
            }
            titleDetailsDiv.appendChild(p);
        });

        // Добавление обложки и информации в общий блок
        titleCoverPlusDetailsDiv.appendChild(img);
        titleCoverPlusDetailsDiv.appendChild(titleDetailsDiv);

        // Создание блока с описанием и кнопкой "Добавить в корзину"
        const titleInfoDiv = document.createElement('div');
        titleInfoDiv.className = 'title-info';

        // Создание заголовка для описания
        const h2Info = document.createElement('h2');
        h2Info.textContent = 'Описание:';
        titleInfoDiv.appendChild(h2Info);

        // Создание абзаца с описанием
        const descriptionP = document.createElement('p');
        descriptionP.textContent = this.product.description;
        titleInfoDiv.appendChild(descriptionP);

        // Создание контейнера для кнопки "Добавить в корзину"
        const buyContainerDiv = document.createElement('div');
        buyContainerDiv.className = 'buy-container';

        // Создание кнопки "Добавить в корзину"
        const buyButton = document.createElement('button');
        buyButton.type = 'button';
        buyButton.className = 'buy-bottom-button buy-add-to-cart-bottom-button';
        // Добавление товара в корзину
        buyButton.addEventListener("click", async () => {
            await ChangeCart.addToCart(this.product.id);
            // alert(`Товар "${this.product.title}" добавлен в корзину.`);
            ProductPage.clearContainer();
            await ProductPage.initFromPage();
        });

        // Изменения кнопки на + и - при наличии товара в корзине
        const plusItemButton = document.createElement('button');
        plusItemButton.textContent = '+';
        plusItemButton.className = 'buy-bottom-button buy-plus-bottom-button';
        plusItemButton.addEventListener('click', async () => {
            await ChangeCart.addToCart(this.product.id);
            CartProducts.loadBasket();
            ProductPage.clearContainer();
            await ProductPage.initFromPage();
        });
        
        const minusItemButton = document.createElement('button');
        minusItemButton.textContent = '-';
        minusItemButton.className = 'buy-bottom-button buy-minus-bottom-button';
        minusItemButton.addEventListener('click', async () => {
            await ChangeCart.minusItem(this.product.id);
            CartProducts.loadBasket();
            ProductPage.clearContainer();
            await ProductPage.initFromPage();
        });
        
        const removeItemButton = document.createElement('button');
        removeItemButton.textContent = `Удалить. В корзине: ${CartProducts.getItemCount(this.product.id)}`;
        removeItemButton.className = 'buy-bottom-button buy-remove-bottom-button';
        removeItemButton.addEventListener('click', async () => {
            await ChangeCart.removeFromCart(this.product.id);
            CartProducts.loadBasket();
            ProductPage.clearContainer();
            await ProductPage.initFromPage();
        });


        if (!ChangeCart.getCartItem(this.product.id)) {
            buyButton.textContent = `Добавить в корзину: ${this.product.price}`;
            buyContainerDiv.appendChild(buyButton);
        } else {
            buyContainerDiv.appendChild(minusItemButton);
            buyContainerDiv.appendChild(removeItemButton);
            buyContainerDiv.appendChild(plusItemButton);
        }
        

        titleInfoDiv.appendChild(buyContainerDiv);
        
        // Добавление в контейнер
        titleCoverPlusInfoDiv.appendChild(titleCoverPlusDetailsDiv);
        titleCoverPlusInfoDiv.appendChild(titleInfoDiv);

        this.container.appendChild(titleNameDiv);
        this.container.appendChild(titleCoverPlusInfoDiv);

  
    }

    static clearContainer(containerSelector = '#product-root') {
        const container = document.querySelector(containerSelector);
            container.innerHTML = '';
    }

    static async initFromPage(containerSelector = '#product-root') {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const idFromBody = document.body.dataset.productId;
        const productId = idFromBody;

        if (!productId) {
            container.innerHTML = '<p>Товар не указан: добавьте data-product-id в body.</p>';
            return;
        }

        const response = await fetch(`../php/titles.php?id=${encodeURIComponent(productId)}`, {method: 'GET', credentials: 'same-origin'});
        if (!response.ok) {
            const text = await response.text();
            container.innerHTML = `<p>Ошибка загрузки товара (${response.status}): ${text}</p>`;
            return;
        }


        try {
            const product = await response.json();
            new ProductPage(container, product).render();
        } catch (err) {
            container.innerHTML = `<p>Ошибка: ${err.message}.</p>`;
        }  
    }
}