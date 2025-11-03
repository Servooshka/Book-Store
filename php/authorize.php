<?php
$servername = "mysql-users-db";
$username = "servoo";
$password = "servoo";
$dbname = "my-db";
$port = 3306;
// echo "Подключение к базе данных...";
$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    http_response_code(500);
    echo 'Ошибка подключения к БД';
    exit;
}


// Получение данных из формы
$login = $_POST['login'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $login);
$stmt->execute();
$result = $stmt->get_result();

// Проверка наличия пользователя и верификация пароля
if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row['password'])) {
        http_response_code(200);
        echo $row['name'];
    } else {
        http_response_code(500);
        echo 'Неверный пароль';
    }
} else {
    http_response_code(404);
    echo 'Пользователь не найден';
}
$stmt->close();
$conn->close();
?>