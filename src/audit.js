// Load and display all entries on page load
window.onload = async () => {
    try {
      const response = await fetch('/entries');
      const entries = await response.json();
      const list = document.getElementById('entriesList');
  
      entries.forEach(entry => {
        const li = document.createElement('li');
        const readableTime = new Date(entry.timestamp * 1000).toLocaleString();
        li.textContent = `Token: ${entry.token} | Timestamp: ${readableTime}`;
        list.appendChild(li);
      });
    } catch (err) {
      console.error('Error loading audit entries:', err);
    }
  };
  
  // Search for a token
  async function searchToken() {
    const token = document.getElementById('searchInput').value.trim();
    const resultDisplay = document.getElementById('searchResult');
  
    if (!token) {
      resultDisplay.textContent = 'Please enter a token.';
      return;
    }
  
    try {
      const response = await fetch('/entries');
      const entries = await response.json();
      const found = entries.find(entry => entry.token === token);
  
      if (found) {
        const readableTime = new Date(found.timestamp * 1000).toLocaleString();
        resultDisplay.textContent = `✅ Token Found | Timestamp: ${readableTime}`;
      } else {
        resultDisplay.textContent = `❌ Token Not Found`;
      }
    } catch (err) {
      console.error('Error searching token:', err);
      resultDisplay.textContent = 'Error during search.';
    }
  }
  