const express = require('express');
const router = express.Router();
const { Review, User } = require('../database/models');
const { verifyToken } = require('../utils/token');

// 1. Adaugă o recenzie nouă
router.post('/', verifyToken, async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;
    const newReview = await Review.create({
      rating,
      comment,
      productId,
      userId: req.userId // Luat din token-ul de login
    });
    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Ia toate recenziile pentru un produs anume
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.productId },
      include: [{ model: User, attributes: ['name'] }], // Include numele celui care a scris
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;