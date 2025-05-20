const express = require('express');
const router = express.Router();

let transactions = [
  {
    id: "1",
    date: "2025-05-01",
    description: "Achat supermarché",
    amount: "-50.00",
    balance: "950.00",
    type: "debit",
    category: "Alimentation",
    note: "Fruits et légumes"
  },
  {
    id: "2",
    date: "2025-05-03",
    description: "Salaire",
    amount: "2000.00",
    balance: "2950.00",
    type: "credit",
    category: "Salaire",
    note: ""
  }
];

// GET transactions by accountId (ici on retourne tout pour l'exemple)
router.get('/accounts/:accountId/transactions', (req, res) => {
  try {
    res.json({
      status: 200,
      message: "Transactions récupérées avec succès",
      body: transactions
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Erreur serveur lors de la lecture des transactions" });
  }
});

// PUT pour mettre à jour uniquement la catégorie
router.put('/transactions/:transactionId/Category', (req, res) => {
  const { transactionId } = req.params;
  const { category } = req.body;

  if (!category) {
    return res.status(400).json({ status: 400, message: "Le champ 'category' est requis" });
  }

  const transaction = transactions.find(t => t.id === transactionId);
  if (!transaction) {
    return res.status(404).json({ status: 404, message: "Transaction non trouvée" });
  }

  transaction.category = category;

  res.json({
    status: 200,
    message: "Catégorie mise à jour avec succès",
    body: transaction
  });
});

// PUT pour mettre à jour uniquement la note
router.put('/transactions/:transactionId/Note', (req, res) => {
  const { transactionId } = req.params;
  const { note } = req.body;

  if (note === undefined) {
    return res.status(400).json({ status: 400, message: "Le champ 'note' est requis" });
  }

  const transaction = transactions.find(t => t.id === transactionId);
  if (!transaction) {
    return res.status(404).json({ status: 404, message: "Transaction non trouvée" });
  }

  transaction.note = note;

  res.json({
    status: 200,
    message: "Note mise à jour avec succès",
    body: transaction
  });
});

module.exports = router;
