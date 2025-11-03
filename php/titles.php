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
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка подключения к БД']);
    exit;
}

$id = $_GET['id'] ?? '';

if ($id !== 'all') {

    $sql = "SELECT * FROM titles WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if (!$row) {
        http_response_code(404);
        echo json_encode(['error' => 'Книга не найдена']);
        $stmt->close();
        $conn->close();
        exit;
    }

    $product = [
        'id' => $row['id'],
        'title' => $row['title'],
        'image' => $row['image'],
        'alt' => $row['alt'],
        'category' => [
            'name' => $row['category_name'] ?? '',
            'link' => $row['category_link'] ?? ''
        ],
        'weight' => $row['weight'],
        'size' => $row['size'],
        'pages' => $row['pages'],
        'year' => $row['year'],
        'genre' => $row['genre'],
        'author' => $row['author'],
        'price' => $row['price'],
        'purePrice' => (int)$row['purePrice'],
        'link' => $row['link'],
        'description' => $row['description'],
    ];


    // echo json_encode($row);
    echo json_encode($product, JSON_UNESCAPED_UNICODE);
    $stmt->close();
    $conn->close();
    exit;
}


// вернуть все записи
$sql = "SELECT * FROM titles";
$result = $conn->query($sql);
if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка запроса: ' . $conn->error], JSON_UNESCAPED_UNICODE);
    $conn->close();
    exit;
}

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = [
       'id' => $row['id'],
        'title' => $row['title'],
        'image' => $row['image'],
        'alt' => $row['alt'],
        'category' => [
            'name' => $row['category_name'] ?? '',
            'link' => $row['category_link'] ?? ''
        ],
        'weight' => $row['weight'],
        'size' => $row['size'],
        'pages' => $row['pages'],
        'year' => $row['year'],
        'genre' => $row['genre'],
        'author' => $row['author'],
        'price' => $row['price'],
        'purePrice' => (int)$row['purePrice'],
        'link' => $row['link'],
        'description' => $row['description'],
    ];
}

echo json_encode($products, JSON_UNESCAPED_UNICODE);
$conn->close();
exit;
?>