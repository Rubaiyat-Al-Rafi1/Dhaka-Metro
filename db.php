<?php
$host = 'localhost'; // Change if not localhost
$db = 'dhaka_metro'; // Database name
$user = 'root';      // Default MySQL username for XAMPP
$pass = '';          // Default password for XAMPP (usually empty)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
