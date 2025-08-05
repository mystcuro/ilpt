const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Web3 = require('web3').default;
const fs = require('fs');
const path = require('path');

const app = express();

// CHANGED: Read contract ABI and address dynamically from contract-info.json
const contractInfoPath = path.resolve(__dirname, '../contract-info.json');
const contractInfo = JSON.parse(fs.readFileSync(contractInfoPath, 'utf8'));
const abi = contractInfo.abi;
const contractAddress = contractInfo.address;

// Setup Web3 and contract instance
const web3 = new Web3('http://127.0.0.1:8545');
const contractInstance = new web3.eth.Contract(abi, contractAddress);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Route 2 parser enabled
app.use(express.static('src'));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'form.html'));
});

// Route 1: Collect & Submit token to Blockchain
app.post('/submit', async (req, res) => {
    try {
        // Hashed name + NID using SHA-256 from Client 
        const { token } = req.body;

        // Send transaction to blockchain
        const accounts = await web3.eth.getAccounts();
        const receipt = await contractInstance.methods.storeToken(token).send({
            from: accounts[0],
            gas: 300000,
        });

        // Return confirmation to user
        res.send(`<h3>Data submitted securely!<br/>Token: ${token}<br/>Transaction Hash: ${receipt.transactionHash}</h3>`);
        console.log("Storing Token:", token);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error storing token on blockchain.');
    }
});

// Route 2: Verify the Submission
app.post('/verify', async (req, res) => {
    try {
        const { token } = req.body;
        const exists = await contractInstance.methods.checkToken(token).call();
        res.json({ exists });
        console.log("Verifying Token:", token);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error verifying token.' });
    }
});

// Test route for Entries
app.get('/entries', async (req, res) => {
    try {
      const total = await contractInstance.methods.getTotalEntries().call();
      const totalEntries = Number(total); // Converting BigInt to Number
      const entries = [];
  
      for (let i = 0; i < totalEntries; i++) {
        const entry = await contractInstance.methods.getEntry(i).call();
        entries.push({
          token: entry[0],
          timestamp: Number(entry[1])  // Converting BigInt to Number
        });
      }
  
      res.json(entries);
    } catch (err) {
      console.error("Error fetching entries:", err);
      res.status(500).send("Failed to fetch entries.");
    }
  });
  

// Route 3: Audit Trail
app.get('/audit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'audit.html'));
  });
  

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
