<?php
header('Content-Type: application/json');
$servername = "mysql-db";
$username = "servoo";
$password = "servoo";
$dbname = "my-db";
// echo "Подключение к базе данных";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Подключение не удалось: " . $conn->connect_error);
} 


// Получение данных из формы
$username = $_POST['username'];
$name = $_POST['name'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, name, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $name, $password);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'OK']);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}
$stmt->close();
$conn->close();
?>