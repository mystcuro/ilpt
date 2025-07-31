async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(hashBuffer)]
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  
  document.getElementById('piiForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const nid = document.getElementById('nid').value;
  
    const token = await sha256(name + nid); // Hashing PII client-side
  
    const response = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ token })
    });
  
    const resultHTML = await response.text();
    document.getElementById('result').innerHTML = resultHTML;
  });
  