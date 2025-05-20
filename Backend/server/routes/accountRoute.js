const express = require('express');
const router = express.Router();

router.get('/:accountId', (req, res) => {
  const { accountId } = req.params;
  res.json({
    status: 200,
    message: 'Compte récupéré',
    account: {
      id: accountId,
      balance: 1200.00
    }
  });
});

module.exports = router;
