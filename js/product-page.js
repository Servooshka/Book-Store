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

        this.container.innerHTML = `
            <div class="title-name">
                <h1>${this.product.title}</h1>
            </div>
            <div class="title-cover-plus-info">
                <div class="title-cover-plus-details">
                    <img class="title-cover" src="${this.product.image}" alt="Обложка">
                    <div class="title-details">
                        <h2>О книге</h2>
                        <p><span>Категория: </span><a href="${this.product.category.link}">${this.product.category.name}</a></p>
                        <p><span>Вес: </span>${this.product.weight}</p>
                        <p><span>Размер: </span>${this.product.size}</p>
                        <p><span>Количество страниц: </span>${this.product.pages}</p>
                        <p><span>Год выпуска: </span>${this.product.year}</p>
                        <p><span>Жанр: </span>${this.product.genre}</p>
                        <p><span>Автор: </span>${this.product.author}</p>
                    </div>
                </div>
                <div class="title-info">
                    <h2>Описание:</h2>
                    <p>${this.product.description}</p>
                    <div class="buy-container">
                        <a class="buy-button" href="../pages/buy">Купить: ${this.product.price}</a>
                    </div>
                </div>
            </div>
        `;
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