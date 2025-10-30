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
const greetingMessage = document.createElement("h2");
greetingMessage.className = "auth-greeting form-container";
greetingMessage.hidden = true;
greetingMessage.style.display = "none";
greetingMessage.style.textAlign = "center";
greetingMessageContainer.appendChild(greetingMessage);

// Обработка регистрации
regForm.addEventListener("submit", async function(event) {
  event.preventDefault(); // Форма не отправляется стандартным образом на сервер
  
  const formData = new FormData(regForm);
  
  try {
    const response = await fetch('../php/register.php', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert('Регистрация успешна! Теперь войдите в систему.');
      // Возвращаемся на форму входа
      container.classList.remove("mode-register");
      regForm.reset();
      authForm.reset();
      authForm.style.display = "";
      regForm.style.display = "";
      greetingMessage.hidden = true;
    } else {
      alert('Ошибка: ' + result.message);
    }
  } catch (error) {
    alert('Произошла ошибка при регистрации');
    console.error(error);
  }
});


// Обработка авторизации
authForm.addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const formData = new FormData(authForm);
  
  try {
    const response = await fetch('../php/authorize.php', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      container.classList.remove("mode-register");
      authForm.reset();
      regForm.reset();
      authForm.style.display = "none";
      regForm.style.display = "none";
      greetingMessage.textContent = `Привет, ${result.name || "пользователь"}!`;
      greetingMessage.hidden = false;
      greetingMessage.style.display = "block";
    } else {
      alert('Ошибка: ' + result.message);
    }
  } catch (error) {
    alert('Произошла ошибка при входе');
    console.error(error);
  }
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