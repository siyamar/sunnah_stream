const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');
const { loadMockData } = require('../utils/mockLoader');

// Get all products
router.get('/', async (req, res) => {
    if (process.env.USE_MOCK_DATA === 'true') {
        return res.json(loadMockData('products'));
    }
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    if (process.env.USE_MOCK_DATA === 'true') {
        const products = loadMockData('products');
        const product = products.find(p => p._id === req.params.id);
        if (product) return res.json(product);
        else return res.status(404).json({ message: 'Product not found' });
    }
    try {
        const product = await Product.findById(req.params.id);
        if (product) res.json(product);
        else res.status(404).json({ message: 'Product not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create product (Admin only)
router.post('/', protect, admin, async (req, res) => {
    const { name, description, price, image, category, stock, isFeatured } = req.body;
    try {
        const product = await Product.create({ name, description, price, image, category, stock, isFeatured });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update product (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = req.body.name || product.name;
            product.description = req.body.description || product.description;
            product.price = req.body.price || product.price;
            product.image = req.body.image || product.image;
            product.category = req.body.category || product.category;
            product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
            product.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : product.isFeatured;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete product (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

