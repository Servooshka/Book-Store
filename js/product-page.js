class ProductPage {
    constructor(container, product) {
        this.container = container;
        this.product = product;
    }

    render() {
        if (!this.product) {
            this.container.innerHTML = '<p>Товар не найден.</p>';
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
        buyButton.className = 'buy-bottom-button';
        buyButton.textContent = `Добавить в корзину: ${this.product.price}`;
        buyContainerDiv.appendChild(buyButton);

        titleInfoDiv.appendChild(buyContainerDiv);
        // Добавление в контейнер
        titleCoverPlusInfoDiv.appendChild(titleCoverPlusDetailsDiv);
        titleCoverPlusInfoDiv.appendChild(titleInfoDiv);

        this.container.appendChild(titleNameDiv);
        this.container.appendChild(titleCoverPlusInfoDiv);
    }

    static initFromPage(containerSelector = '#product-root', products = {}) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const idFromBody = document.body.dataset.productId;
        const productId = idFromBody;

        if (!productId) {
            container.innerHTML = '<p>Товар не указан: добавьте data-product-id в body.</p>';
            return;
        }

        const product = products && products[productId];
        if (!product) {
            console.error('ProductPage: товар не найден в переданном объекте Products:', productId);
            container.innerHTML = `<p>Товар "${productId}" не найден. Проверьте файл js/product-data.js — в нём должен быть глобальный объект PRODUCTS с ключом "${productId}".</p>`;
            return;
        }

        new ProductPage(container, product).render();
    }
}