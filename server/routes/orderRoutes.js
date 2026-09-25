const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { customerName, shippingAddress, totalAmount, items } = req.body;
    const newOrder = await Order.create({
      customerName,
      shippingAddress,
      totalAmount,
      items: JSON.stringify(items)
    });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/clear-orders', async (req, res) => {
  try {
    await Order.destroy({ where: {} });
    res.status(200).json({ message: "Orders history cleared successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;