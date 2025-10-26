const nav = document.getElementById("main-menu");
const ul = document.createElement("ul");
ul.className = "menu";

const menuItems = [
    { text: "Главная", href: "../index.html" },
    { text: "Тест", href: "../pages/test.html" },
    { text: "Аккаунт", href: "../pages/account.html" },
    {
        text: "Разделы",
        submenu: [
            { text: "Манга", href: "../pages/manga.html" },
            { text: "Классика", href: "../pages/classics.html"}
        ]
    },
    { text: "О нас", href: "../pages/about-us.html" },
    { text: "Контакты", href: "../pages/contacts.html" },
    { text: "Корзина", href: "../pages/cart.html" },
];

menuItems.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = item.text;
    if (item.href)
        a.href = item.href;

    li.appendChild(a);

    if (item.submenu) {
        const subUl = document.createElement("ul");
        subUl.className = "submenu";

        item.submenu.forEach(subItem => {
            const subLi = document.createElement("li");
            const subA = document.createElement("a");
            subA.textContent = subItem.text;
            subA.href = subItem.href;
            subLi.appendChild(subA);
            subUl.appendChild(subLi);
        });

        li.appendChild(subUl);
        li.classList.add("dropdown");
    }

    ul.appendChild(li);
});

nav.appendChild(ul);