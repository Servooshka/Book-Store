const nav = document.getElementById("main-menu");

function renderMenu() {
    nav.innerHTML = '';

    const ul = document.createElement("ul");
    ul.className = "menu";

    let accountCheck = localStorage.getItem("authUser");
    let accountButton = accountCheck;
    if (!accountCheck) {
        accountButton = "Аккаунт";
    }

    const menuItems = [
        { text: "Главная", href: "../index.html" },
        // { text: "Тест", href: "../pages/test.html" },
        { 
            text: `${accountButton}`, href: "../pages/account.html",
            submenu: [
                { text: "Войти", href: "../pages/account.html"},
                { text: "Выйти", action: "logout"}
            ]
        },
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

                if (subA.textContent === "Выйти") {
                    subA.addEventListener("click", () => {
                        if (subItem.action === "logout") {
                            localStorage.removeItem("authUser");
                            window.dispatchEvent(new Event("userLogout"));
                        }
                    });
                }

                if (subItem.href) {
                    subA.href = subItem.href;
                    if (accountCheck && subA.textContent === "Войти") {
                        return;
                    }
                } else if (subItem.action) {
                    if (!accountCheck && subA.textContent === "Выйти") {
                        return;
                    }
                }
                subLi.appendChild(subA);
                subUl.appendChild(subLi);
            });

            li.appendChild(subUl);
            li.classList.add("dropdown");
        }

        ul.appendChild(li);
    });

    nav.appendChild(ul);
}

window.addEventListener("userLogin", () => renderMenu());
window.addEventListener("userLogout", () => {
    localStorage.removeItem("authUser");
    renderMenu();
});

renderMenu();