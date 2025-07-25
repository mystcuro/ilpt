# Input-Level Privacy Tokenization (ILPT)

This project implements a **blockchain-based privacy enforcement framework** for securing Personally Identifiable Information (PII) at the point of capture in web interfaces. The system hashes sensitive data using **SHA-256** and stores it immutably on a **Solidity smart contract** deployed via **Web3.js** and **Ganache**.

## 🔐 Use Case
Designed for web systems where:
- Proof of submission is needed
- PII protection is essential
- Anonymity and audit trails are required

## 🧱 Tech Stack
- **Frontend**: HTML5 form
- **Backend**: Node.js + Express
- **Blockchain**: Solidity + Ganache 
- **Hashing**: SHA-256
- **Web3**: Web3.js (v4)

## 🧪 Features
- Real-time form tokenization
- PII never stored in raw form
- Smart contract stores only hashed tokens
- Returns transaction hash for verification

## 🚀 Getting Started

```bash
# Compile and deploy smart contract (via Truffle)
truffle compile
truffle migrate

# Start Ganache on CLI (if not already)
ganache-cli

# Run the Express backend
node src/app.js
