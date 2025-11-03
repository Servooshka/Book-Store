const container = document.getElementById("authorization-form");
container.classList.add("auth-container");


// Создание формы авторизации
const authForm = document.createElement("form");
authForm.className = "authorization-form form-container";
authForm.action = "../php/authorize.php";
authForm.method = "POST";

const title = document.createElement("h2");
title.textContent = "Авторизация";
title.style.textAlign = "center";

const inputLogin = document.createElement("input");
inputLogin.type = "text";
inputLogin.placeholder = "Логин";
inputLogin.name = "login";
inputLogin.minLength = 3;
inputLogin.required = true;

const inputPassword = document.createElement("input");
inputPassword.type = "password";
inputPassword.placeholder = "Пароль";
inputPassword.name = "password";
inputPassword.minLength = 8;
inputPassword.required = true;

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Войти";
submitButton.className = "top-authorization-button";

const registrationButton = document.createElement("button");
registrationButton.type = "button";
registrationButton.textContent = "Нет аккаунта? Зарегистрироваться";
registrationButton.className = "bottom-authorization-button";

authForm.appendChild(title);
authForm.appendChild(inputLogin);
authForm.appendChild(inputPassword);
authForm.appendChild(submitButton);
authForm.appendChild(registrationButton);


// Создание формы регистрации
const regForm = document.createElement("form");
regForm.className = "registration-form form-container";
regForm.action = "../php/register.php";
regForm.method = "POST";

const regTitle = document.createElement("h2");
regTitle.textContent = "Регистрация";
regTitle.style.textAlign = "center";

const regInputName = document.createElement("input");
regInputName.type = "text";
regInputName.placeholder = "Имя";
regInputName.name = "name";
regInputName.required = true;

const regInputLogin = document.createElement("input");
regInputLogin.type = "text";
regInputLogin.placeholder = "Логин";
regInputLogin.name = "username";
regInputLogin.minLength = 3;
regInputLogin.required = true;

const regInputPassword = document.createElement("input");
regInputPassword.type = "password";
regInputPassword.placeholder = "Пароль";
regInputPassword.name = "password";
regInputPassword.minLength = 8;
regInputPassword.required = true;

const regSubmitButton = document.createElement("button");
regSubmitButton.type = "submit";
regSubmitButton.textContent = "Зарегистрироваться";
regSubmitButton.className = "top-authorization-button";

const backToLoginBtn = document.createElement("button");
backToLoginBtn.type = "button";
backToLoginBtn.textContent = "Есть аккаунт? Войти";
backToLoginBtn.className = "bottom-authorization-button";


regForm.appendChild(regTitle);
regForm.appendChild(regInputName);
regForm.appendChild(regInputLogin);
regForm.appendChild(regInputPassword);
regForm.appendChild(regSubmitButton);
regForm.appendChild(backToLoginBtn);

const greetingMessageContainer = document.createElement("div");
greetingMessageContainer.style.display = "flex";
greetingMessageContainer.style.flexDirection = "column";
greetingMessageContainer.style.justifyContent = "center";
greetingMessageContainer.style.alignItems = "center";
greetingMessageContainer.style.margin = "0 auto";
const greetingMessage = document.createElement("h2");
greetingMessage.className = "auth-greeting form-container";
greetingMessage.hidden = true;
greetingMessage.style.display = "flex";
greetingMessage.style.textAlign = "center";
greetingMessageContainer.appendChild(greetingMessage);

// Обработка регистрации
regForm.addEventListener("submit", async function(event) {
  event.preventDefault(); // Форма не отправляется стандартным образом на сервер
  
  const formData = new FormData(regForm);
  const response = await fetch('../php/register.php', {method: 'POST', body: formData});
  
  if (response.status === 200) {
    // Возвращаемся на форму входа
    const text = await response.text(); 
    console.log('Успех:', text);
    container.classList.remove("mode-register");
    regForm.reset();
    authForm.reset();
    authForm.style.display = "";
    regForm.style.display = "";
    greetingMessage.hidden = true;
  } else {
    const error = await response.text()
    console.error('Ошибка', response.status, error);
  }
});

// Обработка авторизации
authForm.addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const formData = new FormData(authForm);
  const response = await fetch('../php/authorize.php', {method: 'POST', body: formData});

  
  if (response.status === 200) {
    const name = (await response.text()).trim();
    const userName = name || "пользователь";
    localStorage.setItem("authUser", userName);
    showGreeting(userName);
    return;
  } else {
    const error = await response.text()
    console.error('Ошибка', response.status, error);
  }

});

// Функции для отображения приветствия и сброса форм
const showGreeting = (name) => {
  const userName = name && name.trim() ? name.trim() : "пользователь";
  authForm.style.display = "none";
  regForm.style.display = "none";
  greetingMessage.textContent = `Привет, ${userName}!`;
  greetingMessage.hidden = false;
  greetingMessage.style.display = "block";
};

const resetForms = () => {
  container.classList.remove("mode-register");
  authForm.reset();
  regForm.reset();
  greetingMessage.hidden = true;
  greetingMessage.style.display = "none";
  authForm.style.display = "";
  regForm.style.display = "";
};

const savedUser = localStorage.getItem("authUser");
if (savedUser) {
  showGreeting(savedUser);
} else {
  resetForms();
}

// Кнопка выхода из аккаунта
const logoutButton = document.createElement("button");
logoutButton.textContent = "Выйти из аккаунта";
logoutButton.className = "logout-button";
logoutButton.style.display = "block";
logoutButton.style.width = "100%";
logoutButton.style.borderRadius = "10px";
logoutButton.style.backgroundColor = "var(--remove-button-bg-color)";
logoutButton.style.border = "none";
logoutButton.style.cursor = "pointer";
logoutButton.style.justifyContent = "center";
logoutButton.style.transition = "background-color 0.3s";
logoutButton.onmouseover = () => {
  logoutButton.style.backgroundColor = "var(--remove-button-hover-bg-color)";
};
logoutButton.onmouseout = () => {
  logoutButton.style.backgroundColor = "var(--remove-button-bg-color)";
};
greetingMessageContainer.appendChild(logoutButton);

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("authUser");
  resetForms();
});



// Добавление форм в контейнер
container.appendChild(authForm);
container.appendChild(regForm);
container.appendChild(greetingMessageContainer);

// Переключение между формами
registrationButton.addEventListener("click", () => {
  container.classList.add("mode-register");
});

backToLoginBtn.addEventListener("click", () => {
  container.classList.remove("mode-register");
});