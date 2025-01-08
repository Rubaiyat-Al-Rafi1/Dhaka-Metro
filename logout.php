<?php
session_start();
session_destroy(); // Destroy the session completely
$response = ["success" => true];
echo json_encode($response);
?>
