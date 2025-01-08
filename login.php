<?php
require 'db.php'; // Include database connection
session_start();

// Initialize error variable
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    // Server-side validation
    if (empty($username) || empty($password)) {
        $error = 'Username and password are required!';
    } else {
        try {
            // Fetch user by username
            $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verify password
            if ($user && password_verify($password, $user['password_hash'])) {
                // Set session variables
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];

                // Redirect to profile
                header("Location: index.html");
                exit;
            } else {
                $error = 'Invalid username or password.';
            }
        } catch (PDOException $e) {
            $error = "Database error: " . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="h-screen bg-gray-100 flex items-center justify-center">  

    <!-- Login Form Container -->  
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">  
        <!-- Logo -->  
        <div class="flex justify-center mb-6">  
            <img src="logo.png" alt="Dhaka Metro Logo" class="w-20 h-auto">  
        </div>  

        <!-- Login Title -->  
        <h2 class="text-2xl font-bold text-center mb-4">Login to Your Account</h2>  

        <!-- Display error message -->
        <?php if ($error): ?>
            <div class="bg-red-100 text-red-600 p-3 rounded mb-4">
                <?php echo $error; ?>
            </div>
        <?php endif; ?>

        <!-- Login Form -->  
        <form action="login.php" method="POST" class="space-y-4">  
            <div>  
                <label for="username" class="block text-sm font-medium text-gray-700">Username</label>  
                <input id="username" name="username" type="text" placeholder="Enter your username" required  
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">  
            </div>  
            <div>  
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>  
                <input id="password" name="password" type="password" placeholder="Enter your password" required  
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">  
            </div>  

            <!-- Remember Me & Forgot Password -->  
            <div class="flex items-center justify-between text-sm">  
                <label class="inline-flex items-center">  
                    <input type="checkbox" name="remember" class="text-green-600 focus:ring-green-500 rounded border-gray-300">  
                    <span class="ml-2 text-gray-600">Remember Me</span>  
                </label>  
                <a href="forgot-password.php" class="text-green-600 hover:underline">Forgot Password?</a>  
            </div>  

            <!-- Submit Button -->  
            <button type="submit"  
                class="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none">  
                Login  
            </button>  
        </form>  

        <!-- Don't Have Account -->  
        <p class="mt-6 text-center text-sm text-gray-600">  
            Don't have an account?   
            <a href="signup.php" class="text-green-600 hover:underline">Sign Up</a>  
        </p>  
    </div>  
    <script src="index.js"></script>
</body> 

</html>
