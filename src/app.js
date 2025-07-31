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
app.use(express.static('src'));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'form.html'));
});

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
    } catch (err) {
        console.error(err);
        res.status(500).send('Error storing token on blockchain.');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
