<?php
require_once 'controller.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $komentar = $data['komentar'];

    $query = "INSERT INTO komentar (uraian_komentar) VALUES (?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $komentar);
    if ($stmt->execute()) {
        echo json_encode(["message" => "Komentar berhasil ditambahkan!"]);
    } else {
        echo json_encode(["message" => "Gagal menambahkan komentar."]);
    }
    $stmt->close();
} elseif ($method === 'GET') {
    $result = $conn->query("SELECT * FROM komentar");
    $komentar = [];
    while ($row = $result->fetch_assoc()) {
        $komentar[] = $row;
    }
    echo json_encode($komentar);
}

$conn->close();
?>
