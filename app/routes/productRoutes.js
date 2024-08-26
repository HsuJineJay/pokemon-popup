const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.delete('/', productController.deleteProduct);
router.put('/', productController.updateProduct);
router.patch('/', productController.partialUpdateProduct);

module.exports = router;