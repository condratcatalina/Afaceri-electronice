const { CartItem, Product } = require('../database/models');
const express = require('express');
const { verifyToken } = require('../utils/token');

const router = express.Router();

// toate rutele folosesc token
router.use(verifyToken);

// GET /api/cart -> returneaza toate itemele din cos pentru user-ul logat
router.get('/', async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      where: { user_id: req.userId }, // folosit consistent cu POST
      include: [Product],             // include datele produsului
    });

    res.status(200).json({
      success: true,
      message: 'Cart retrieved successfully',
      data: cartItems,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching cart', data: error.message });
  }
});

// POST /api/cart -> add item to cart
router.post('/', async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    if (!product_id || isNaN(product_id)) {
      return res.status(400).json({
        success: false,
        message: 'Product id is not valid',
        data: {},
      });
    }

    let item = await CartItem.findOne({
      where: { user_id: req.userId, product_id },
    });

    if (item) {
      item.quantity += quantity || 1;
      await item.save();
    } else {
      item = await CartItem.create({
        user_id: req.userId,
        product_id,
        quantity: quantity || 1,
      });
    }

    // fetch item complet cu Product inclus
    const fullItem = await CartItem.findByPk(item.id, { include: [Product] });

    res.status(201).json({
      success: true,
      message: 'Product added to cart successfully',
      data: fullItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding product to cart',
      data: error.message,
    });
  }
});

// PUT /api/cart/:id -> update quantity
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { quantity } = req.body;

    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Cart item id is not valid', data: {} });

    const item = await CartItem.findOne({ where: { id, user_id: req.userId } });
    if (!item) return res.status(404).json({ success: false, message: 'Cart item not found', data: {} });

    item.quantity = quantity;
    await item.save();

    const fullItem = await CartItem.findByPk(item.id, { include: [Product] });

    res.status(200).json({ success: true, message: 'Cart item updated successfully', data: fullItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating cart item', data: error.message });
  }
});

// DELETE /api/cart/:id
router.delete('/', async (req, res) => {
  try {
    await CartItem.destroy({
      where: { user_id: req.userId }
    });

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      data: error.message
    });
  }
});

module.exports = router;
