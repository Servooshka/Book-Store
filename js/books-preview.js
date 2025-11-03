document.addEventListener('DOMContentLoaded', async () => {
const container = document.getElementById("books-preview");

const fragment = document.createDocumentFragment();

const box = document.createElement('div');
box.className = 'cover';


const products = await ChangeCart.fetchProduct('all');
products.forEach(book => {


    const bookWrap = document.createElement('div');
    bookWrap.className = 'book-title';

    const a = document.createElement('a');
    a.className = 'sign';
    a.href = book.link;

    const img = document.createElement('img');
    img.className = 'image-cover-title';
    img.src = book.image;
    img.alt = book.alt;

    const info = document.createElement('div');
    info.className = 'flex-vertical';

    const title = document.createElement('p');
    title.className = 'align-text';
    title.textContent = book.title;

    const price = document.createElement('p');
    price.className = 'align-text';
    price.textContent = book.price;

    info.appendChild(title);
    info.appendChild(price);
    a.appendChild(img);
    a.appendChild(info);
    bookWrap.appendChild(a);
    fragment.appendChild(bookWrap);

});

box.appendChild(fragment);
container.appendChild(box);
});