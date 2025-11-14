const express = require('express');
const { verifyToken } = require('../utils/token');
const { FavoriteItem, Product } = require('../database/models');

const router = express.Router();

router.use(verifyToken);

// GET /api/favourites -> lista favorite
router.get('/', async (req, res) => {
  try {
    const favorites = await FavoriteItem.findAll({
      where: { user_id: req.userId },
      include: [Product]
    });
    res.status(200).json({ success: true, data: favorites });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/favourites -> adauga in favorite
router.post('/', async (req, res) => {
  try {
    const { product_id } = req.body;
    if (!product_id) return res.status(400).json({ success: false, message: 'Product ID required' });

    const existing = await FavoriteItem.findOne({ where: { user_id: req.userId, product_id } });
    if (existing) return res.status(400).json({ success: false, message: 'Product already in favorites' });

    const favorite = await FavoriteItem.create({ user_id: req.userId, product_id });
    res.status(201).json({ success: true, data: favorite });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/favourites/:id -> sterge din favorite
router.delete('/:id', async (req, res) => {
  try {
    const favorite = await FavoriteItem.findOne({ where: { id: req.params.id, user_id: req.userId } });
    if (!favorite) return res.status(404).json({ success: false, message: 'Not found' });

    await favorite.destroy();
    res.status(200).json({ success: true, message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
