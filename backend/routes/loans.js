const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const loansFilePath = path.join(__dirname, '..', 'saved-loans.json');
let memoryLoans = [];

// Load loans from file on startup
try {
  if (fs.existsSync(loansFilePath)) {
    const savedLoans = fs.readFileSync(loansFilePath, 'utf8');
    memoryLoans = JSON.parse(savedLoans);
    console.log(`Loaded ${memoryLoans.length} previously created loans from file`);
  }
} catch (error) {
  console.log('Could not load saved loans:', error.message);
  memoryLoans = [];
}

const saveLoansToFile = () => {
  try {
    fs.writeFileSync(loansFilePath, JSON.stringify(memoryLoans, null, 2));
    console.log(`Saved ${memoryLoans.length} loans to file`);
  } catch (error) {
    console.error('Error saving loans to file:', error.message);
  }
};

// POST /api/loans - Create a new loan application
router.post('/', (req, res) => {
  const { name, email, product, amount, term, notes } = req.body;
  if (!name || !email || !product || !amount || !term) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const loan = {
    id: Date.now(),
    name,
    email,
    product,
    amount,
    term,
    notes,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  memoryLoans.push(loan);
  saveLoansToFile();
  res.status(201).json(loan);
});

// GET /api/loans - List all loan applications
router.get('/', (req, res) => {
  res.json(memoryLoans);
});

// GET /api/loans/:id - Get loan application by ID
router.get('/:id', (req, res) => {
  const loan = memoryLoans.find(l => l.id == req.params.id);
  if (!loan) return res.status(404).json({ error: 'Loan not found' });
  res.json(loan);
});

module.exports = router;
