const books = [
    { href: '../pages/frieren.html', img: '../images/frieren.png', alt: 'Фрирен', title: 'Провожающая в последний путь Фрирен.', price: 'Цена: 1000 руб.' },
    { href: '../pages/1984.html', img: '../images/1984.png', alt: '1984', title: 'Джордж Оруэлл. 1984.', price: 'Цена: 1000 руб.' },
    { href: '../pages/voina-i-mir.html', img: '../images/voina-i-mir.png', alt: 'Война и мир', title: 'Л.Толстой. Война и мир.', price: 'Цена: 1000 руб.' },
];

const container = document.getElementById("books-preview");

const fragment = document.createDocumentFragment();

const box = document.createElement('div');
box.className = 'cover';


books.forEach(book => {


    const bookWrap = document.createElement('div');
    bookWrap.className = 'book-title';

    const a = document.createElement('a');
    a.className = 'sign';
    a.href = book.href;

    const img = document.createElement('img');
    img.className = 'image-cover-title';
    img.src = book.img;
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