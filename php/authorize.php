<?php
header('Content-Type: application/json');
$servername = "mysql-users-db";
$username = "servoo";
$password = "servoo";
$dbname = "my-db";
$port = 3306;
// echo "Подключение к базе данных...";
$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) { 
    echo json_encode(['success'=>false,'message'=>'Ошибка подключения к БД']); 
    exit; 
}


// Получение данных из формы
$login = $_POST['login'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $login); // s означает строковый тип
$stmt->execute();
$result = $stmt->get_result();
// Проверка наличия пользователя и верификация пароля
if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row['password'])) {
        echo json_encode(['success' => true, 'message' => 'OK', 'name' => $row['name']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Неверный пароль']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Пользователь не найден']);
}
$stmt->close();
$conn->close();
?>