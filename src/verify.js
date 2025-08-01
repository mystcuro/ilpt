// src/verify.js
document.getElementById('verifyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = document.getElementById('token').value.trim();
    const resultDiv = document.getElementById('result');
  
    try {
      const response = await fetch('/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.exists) {
        resultDiv.innerHTML = `<p style="color:green;">✅ Token found on blockchain. Verified!</p>`;
      } else {
        resultDiv.innerHTML = `<p style="color:red;">❌ Token not found.</p>`;
      }
    } catch (err) {
      console.error(err);
      resultDiv.innerHTML = `<p style="color:red;">❌ Error verifying token.</p>`;
    }
  });
  