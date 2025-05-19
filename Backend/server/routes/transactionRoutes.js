const express = require('express')
const router = express.Router()

// Mock de transactions avec plusieurs IDs uniques
// Ce tableau simule une base de données temporaire en mémoire
let transactions = [
  {
    id: '663d6c2f1c2bde2ef14569e2',
    amount: 120,
    category: 'Shopping',
    date: '2025-05-01T10:00:00Z'
  },
  {
    id: '773d7d2f1c3fde3ff25670a4',
    amount: 250,
    category: 'Food',
    date: '2025-05-10T12:30:00Z'
  },
  {
    id: '883d8e3f1d4ade4gg36781b5',
    amount: 75,
    category: 'Transport',
    date: '2025-05-15T09:45:00Z'
  },
  {
    id: '994d9f4f1e5bde5hh47892c6',
    amount: 300,
    category: 'Rent',
    date: '2025-05-20T14:00:00Z'
  }
]

// Route GET /transactions
// Renvoie la liste complète des transactions
router.get('/', (req, res) => {
  res.json(transactions)
})

// Route GET /transactions/current-month
// Renvoie les transactions du mois en cours
// Ici, pour simplifier, on renvoie toutes les transactions,
// mais tu peux ajouter un filtre pour ne récupérer que celles du mois en cours
router.get('/current-month', (req, res) => {
  res.json(transactions)
})

// Route GET /transactions/:transactionId
// Recherche une transaction par son ID et la renvoie
// Si la transaction n’est pas trouvée, retourne une erreur 404
router.get('/:transactionId', (req, res) => {
  const { transactionId } = req.params
  const transaction = transactions.find(t => t.id === transactionId)
  if (!transaction) {
    return res.status(404).json({ message: 'Transaction non trouvée' })
  }
  res.json(transaction)
})

// Route POST /transactions
// Crée une nouvelle transaction avec les données envoyées dans req.body
// Vérifie que les champs obligatoires sont bien présents
// Génère un ID simple unique pour la nouvelle transaction
router.post('/', (req, res) => {
  const { amount, category, date } = req.body

  if (amount === undefined || !category || !date) {
    return res.status(400).json({ message: 'Les champs amount, category et date sont requis.' })
  }

  const newTransaction = {
    id: Math.random().toString(36).substring(2, 11), // ID généré aléatoirement
    amount,
    category,
    date
  }

  transactions.push(newTransaction)

  // Renvoie la nouvelle transaction créée avec le status 201 (créé)
  res.status(201).json(newTransaction)
})

// Route PATCH /transactions/:transactionId
// Permet de modifier une transaction existante
// Cherche la transaction par ID, si non trouvée renvoie 404
// Met à jour seulement les champs présents dans le corps de la requête
router.patch('/:transactionId', (req, res) => {
  const { transactionId } = req.params
  const { amount, category, date } = req.body

  const transactionIndex = transactions.findIndex(t => t.id === transactionId)
  if (transactionIndex === -1) {
    return res.status(404).json({ message: 'Transaction non trouvée' })
  }

  // Mise à jour conditionnelle des champs
  if (amount !== undefined) transactions[transactionIndex].amount = amount
  if (category !== undefined) transactions[transactionIndex].category = category
  if (date !== undefined) transactions[transactionIndex].date = date

  // Renvoie un message de succès et la transaction mise à jour
  res.json({ message: 'Mise à jour réussie', transaction: transactions[transactionIndex] })
})

// Route DELETE /transactions/:transactionId
// Supprime une transaction par ID
// Si la transaction n’existe pas, renvoie 404
router.delete('/:transactionId', (req, res) => {
  const { transactionId } = req.params
  const transactionIndex = transactions.findIndex(t => t.id === transactionId)
  if (transactionIndex === -1) {
    return res.status(404).json({ message: 'Transaction non trouvée' })
  }
  // Suppression de la transaction dans le tableau
  transactions.splice(transactionIndex, 1)
  res.json({ message: 'Suppression réussie' })
})

module.exports = router
