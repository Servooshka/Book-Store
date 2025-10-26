const footer = document.getElementById("main-footer");

footer.textContent = "";

const p = document.createElement("p");
const img = document.createElement("img");

p.textContent = "© 2025 Все права защищены.";
img.src = "../images/logo.png";
img.alt = "Логотип";

footer.appendChild(p);
footer.appendChild(img)