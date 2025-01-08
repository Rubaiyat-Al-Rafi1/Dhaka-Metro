<!DOCTYPE html>  
<html lang="en">  

<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>User Profile</title>  
    <script src="https://cdn.tailwindcss.com"></script>  
    <style>  
        /* Custom styles for the green theme */  
        .bg-green-custom {  
            background-color: #d4edda; /* Light green background */  
        }  
        .text-green-custom {  
            color: #155724; /* Dark green text */  
        }  
        .border-green-custom {  
            border-color: #c3e6cb; /* Light green border */  
        }  
        .hover\:bg-green-dark:hover {  
            background-color: #c3e6cb; /* Darker green on hover */  
        }  
    </style>  
</head>  

<body class="h-screen bg-gray-100 flex items-center justify-center">  
    <?php  
    session_start();  
    if (!isset($_SESSION['user_id'])) {  
        header("Location: login.html");  
        exit;  
    }  

    require 'db.php';  

    try {  
        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");  
        $stmt->execute([$_SESSION['user_id']]);  
        $user = $stmt->fetch(PDO::FETCH_ASSOC);  
    } catch (PDOException $e) {  
        die("Error: " . $e->getMessage());  
    }  

    $paymentAccounts = isset($_SESSION['payment_accounts']) ? $_SESSION['payment_accounts'] : [];  
    ?>  

    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-green-custom">  
        <div class="flex items-center justify-center mb-6">  
            <img src="https://via.placeholder.com/100" alt="Profile" class="rounded-full w-16 h-16 border-2 border-green-custom">  
            <span class="text-2xl font-bold text-green-custom ml-4 flex items-center">  
                <svg class="w-8 h-8 text-green-custom mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">  
                    <path d="M10 2a6 6 0 016 6v4a6 6 0 01-6 6H6a6 6 0 01-6-6V8a6 6 0 016-6h4z"></path>  
                </svg>  
                <?php echo htmlspecialchars($user['full_name']); ?>  
            </span>  
        </div>  
        <div class="space-y-2">  
            <p class="flex items-center text-gray-600">  
                <svg class="w-6 h-6 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">  
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 3H4a2 2 0 00-1.997 2.884zM18 8.118l-8 4-8-4V13a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>  
                </svg>  
                <?php echo htmlspecialchars($user['email']); ?>  
            </p>  
            <p class="flex items-center text-gray-600">  
                <svg class="w-6 h-6 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">  
                    <path d="M6 2a6 6 0 00-6 6v4a6 6 0 006 6h8a6 6 0 006-6V8a6 6 0 00-6-6H6zm4 14a4 4 0 100-8 4 4 0 000 8z"></path>  
                </svg>  
                <?php echo htmlspecialchars($user['username']); ?>  
            </p>  
        </div>  

        <div class="mt-6">  
            <h3 class="text-lg font-semibold text-green-custom mb-2">Add Payment Account</h3>  
            <div class="flex flex-col space-y-4">  
                <select id="payment-method" class="w-full border-gray-300 rounded-md shadow-sm focus:border-green-custom focus:ring-green-custom">  
                    <option value="">Select Payment Method</option>  
                    <option value="bkash">Bkash</option>  
                    <option value="visa">Visa</option>  
                </select>  

                <div id="bkash-fields" class="hidden flex-col space-y-2">  
                    <label for="bkash-number" class="font-medium text-gray-700">Bkash Number:</label>  
                    <input type="text" id="bkash-number" class="border border-gray-300 rounded-md p-2 w-full focus:border-green-custom focus:ring-green-custom" placeholder="Enter your Bkash number">  

                    <label for="bkash-pin" class="font-medium text-gray-700">Bkash Pin:</label>  
                    <input type="password" id="bkash-pin" class="border border-gray-300 rounded-md p-2 w-full focus:border-green-custom focus:ring-green-custom" placeholder="Enter your Bkash pin">  
                </div>  

                <div id="visa-fields" class="hidden flex-col space-y-2">  
                    <label for="visa-number" class="font-medium text-gray-700">Card Number:</label>  
                    <input type="text" id="visa-number" class="border border-gray-300 rounded-md p-2 w-full focus:border-green-custom focus:ring-green-custom" placeholder="Enter your card number">  

                    <label for="visa-security-code" class="font-medium text-gray-700">Security Code:</label>  
                    <input type="password" id="visa-security-code" class="border border-gray-300 rounded-md p-2 w-full focus:border-green-custom focus:ring-green-custom" placeholder="Enter security code">  
                </div>  
            </div>  

            <button id="add-payment" class="mt-4 w-full bg-green-600 text-white rounded-md p-2 hover:bg-green-dark">Add Payment Account</button>  
        </div>  

        <div class="mt-6">  
            <h3 class="text-lg font-semibold text-green-custom mb-2">Payment Accounts</h3>  
            <div id="payment-accounts" class="space-y-4">  
                <?php foreach ($paymentAccounts as $account): ?>  
                    <div class="flex items-center border border-gray-300 rounded-md p-2 bg-gray-50">  
                        <?php if ($account['type'] === 'bkash'): ?>  
                            <img src="bkash.png" alt="Bkash" class="h-8 mr-2">  
                        <?php else: ?>  
                            <img src="card.png" alt="Visa" class="h-8 mr-2">  
                        <?php endif; ?>  
                        <span class="text-green-custom font-medium"><?php echo htmlspecialchars($account['number']); ?></span>  
                    </div>  
                <?php endforeach; ?>  
            </div>  
        </div>  

        <div class="text-center mt-6 space-y-2">  
            <a href="index.html" class="block text-green-custom hover:text-green-700 hover:underline">Back to Home</a>  
            <a href="logout.php" class="block text-green-custom hover:text-green-700 hover:underline">Logout</a>  
        </div>  
    </div>  

    <script>  
        const paymentMethodSelect = document.getElementById('payment-method');  
        const bkashFields = document.getElementById('bkash-fields');  
        const visaFields = document.getElementById('visa-fields');  
        const paymentAccounts = document.getElementById('payment-accounts');  

        paymentMethodSelect.addEventListener('change', function () {  
            const selectedValue = this.value;  

            bkashFields.classList.add('hidden');  
            visaFields.classList.add('hidden');  

            if (selectedValue === 'bkash') {  
                bkashFields.classList.remove('hidden');  
            } else if (selectedValue === 'visa') {  
                visaFields.classList.remove('hidden');  
            }  
        });  

        document.getElementById('add-payment').addEventListener('click', function () {  
            const selectedValue = paymentMethodSelect.value;  
            let number;  
            let type;  

            if (selectedValue === 'bkash') {  
                number = document.getElementById('bkash-number').value;  
                type = 'bkash';  
            } else if (selectedValue === 'visa') {  
                number = document.getElementById('visa-number').value;  
                type = 'visa';  
            } else {  
                alert('Please select a payment method.');  
                return;  
            }  

            const accountDiv = document.createElement('div');  
            accountDiv.classList.add('flex', 'items-center', 'border', 'border-gray-300', 'rounded-md', 'p-2', 'bg-gray-50');  
            const img = document.createElement('img');  
            img.src = type === 'bkash'  
                ? 'bkash.png'  
                : 'card.png';  
            img.alt = type.charAt(0).toUpperCase() + type.slice(1);  
            img.classList.add('h-8', 'mr-2');  
            accountDiv.appendChild(img);  

            const span = document.createElement('span');  
            span.classList.add('text-green-custom', 'font-medium');  
            span.textContent = number; // Display the payment account number  
            accountDiv.appendChild(span);  

            paymentAccounts.appendChild(accountDiv); // Add the new account to the payment accounts list  

            // Clear the input fields after adding  
            if (selectedValue === 'bkash') {  
                document.getElementById('bkash-number').value = '';  
            } else if (selectedValue === 'visa') {  
                document.getElementById('visa-number').value = '';  
            }  
        });  
    </script>  
</body>  
</html>