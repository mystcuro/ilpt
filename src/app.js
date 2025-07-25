const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Web3 = require('web3').default;
const fs = require('fs');
const path = require('path');

const app = express();

// Read ABI and deployed contract address
const contractJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/contracts/TokenStorage.json'), 'utf8'));
const abi = contractJson.abi;

// You'll need to paste your deployed contract address here after deploying
const contractAddress = '0x504c52723C8B981feeCD49dAb52D2c555ec33474'; //need to pin or multiple times copy

// Setup Web3 and provider
const web3 = new Web3('http://127.0.0.1:8545');

const contractInstance = new web3.eth.Contract(abi, contractAddress);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src'));

// Serve form.html at root
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'form.html'));
  });
  

app.post('/submit', async (req, res) => {
    try {
        const { name, email, nid } = req.body;
        const token = crypto.createHash('sha256').update(name + nid).digest('hex');

        const accounts = await web3.eth.getAccounts();

        // Send transaction to storeToken function
        const receipt = await contractInstance.methods.storeToken(token).send({ from: accounts[0], gas: 300000 });

        res.send(`<h3>Data submitted securely!<br/>Token: ${token}<br/>Transaction Hash: ${receipt.transactionHash}</h3>`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error storing token on blockchain.');
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
