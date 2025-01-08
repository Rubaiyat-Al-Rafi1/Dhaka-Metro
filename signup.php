<?php
require 'db.php'; // Include database connection

// Initialize variables for error/success messages
$error = $success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $username = trim($_POST['username']);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    // Server-side validation
    if (empty($name) || empty($email) || empty($username) || empty($password) || empty($confirmPassword)) {
        $error = 'All fields are required!';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Invalid email address!';
    } elseif ($password !== $confirmPassword) {
        $error = 'Passwords do not match!';
    } else {
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);

        // Insert into database
        try {
            $stmt = $pdo->prepare("INSERT INTO users (full_name, email, username, password_hash) VALUES (?, ?, ?, ?)");
            $stmt->execute([$name, $email, $username, $passwordHash]);
            $success = 'Signup successful. <a href="login.php" class="text-green-600 hover:underline">Login here</a>';
        } catch (PDOException $e) {
            if ($e->errorInfo[1] === 1062) { // Duplicate entry error
                $error = 'Username or email already exists.';
            } else {
                $error = "Error: " . $e->getMessage();
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="h-screen bg-gray-100 flex items-center justify-center">

    <!-- Signup Form Container -->
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <!-- Logo -->
        <div class="flex justify-center mb-6">
            <img src="logo.png" alt="Dhaka Metro Logo" class="w-20 h-auto">
        </div>

        <!-- Sign Up Title -->
        <h2 class="text-2xl font-bold text-center mb-4">Create Your Account</h2>

        <!-- Display error/success messages -->
        <?php if ($error): ?>
            <div class="bg-red-100 text-red-600 p-3 rounded mb-4">
                <?php echo $error; ?>
            </div>
        <?php endif; ?>
        <?php if ($success): ?>
            <div class="bg-green-100 text-green-600 p-3 rounded mb-4">
                <?php echo $success; ?>
            </div>
        <?php endif; ?>

        <!-- Signup Form -->
        <form action="signup.php" method="POST" class="space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                <input id="name" name="name" type="text" placeholder="Enter your full name" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                <input id="email" name="email" type="email" placeholder="Enter your email address" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>
            <div>
                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                <input id="username" name="username" type="text" placeholder="Choose a username" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input id="password" name="password" type="password" placeholder="Create a password" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>
            <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm your password" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            </div>

            <!-- Submit Button -->
            <button type="submit"
                class="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none">
                Sign Up
            </button>
        </form>

        <!-- Already have an account -->
        <p class="mt-6 text-center text-sm text-gray-600">
            Already have an account? 
            <a href="login.php" class="text-green-600 hover:underline">Login here</a>
        </p>
    </div>
    <script src="index.js"></script>
</body>

</html>
