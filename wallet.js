document.addEventListener('DOMContentLoaded', () => {
    // Load balance from localStorage or set to 0 if not available
    const balanceAmountElement = document.getElementById('balance-amount');
    let currentBalance = parseFloat(localStorage.getItem('walletBalance')) || 0;
    balanceAmountElement.textContent = currentBalance.toFixed(2);
  
    // Function to handle wallet recharge
    function rechargeWallet() {
      const rechargeAmount = parseFloat(document.getElementById('recharge-amount').value);
  
      if (isNaN(rechargeAmount) || rechargeAmount <= 0) {
        alert('Enter a valid recharge amount!');
        return;
      }
  
      // Get the selected payment method
      const selectedMethod = document.querySelector('input[name="payment"]:checked')?.value;
  
      if (selectedMethod === 'bkash') {
        // Show the bKash modal for payment confirmation
        document.getElementById('modalAmount').textContent = rechargeAmount.toFixed(2);
        document.getElementById('bkashModal').classList.remove('hidden');
      } else {
        alert('Please select a payment method.');
      }
    }
  
    // Close the bKash modal
    function closeBkashModal() {
      document.getElementById('bkashModal').classList.add('hidden');
    }
  
    // Proceed with bKash payment
    function proceedBkashPayment() {
      const bkashAccount = document.getElementById('bkashAccount').value;
      const termsAccepted = document.getElementById('terms').checked;
  
      if (!bkashAccount || bkashAccount.length !== 11 || isNaN(bkashAccount)) {
        alert('Enter a valid 11-digit bKash account number.');
        return;
      }
  
      if (!termsAccepted) {
        alert('You must agree to the terms and services.');
        return;
      }
  
      // Update balance
      const rechargeAmount = parseFloat(document.getElementById('modalAmount').textContent);
      currentBalance += rechargeAmount;
      balanceAmountElement.textContent = currentBalance.toFixed(2);
  
      // Save balance to localStorage
      localStorage.setItem('walletBalance', currentBalance.toFixed(2));
  
      alert('Payment successful! Wallet recharged.');
  
      // Reset the form and close the modal
      document.getElementById('recharge-amount').value = '';
      closeBkashModal();
    }
  
    // Function to select payment method
    function selectPaymentMethod(method) {
      document.getElementById('bkash').checked = method === 'bkash';
    }
  
    // Attach event listeners
    document.querySelector('button[onclick="rechargeWallet()"]').addEventListener('click', rechargeWallet);
    document.getElementById('closeMenuButton').addEventListener('click', closeBkashModal);
    document.querySelector('button[onclick="proceedBkashPayment()"]').addEventListener('click', proceedBkashPayment);
  });
  