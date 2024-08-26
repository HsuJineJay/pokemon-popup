const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');

router.get('/', menuItemController.getAllMenuItems);
router.post('/', menuItemController.createMenuItem);
router.delete('/', menuItemController.deleteMenuItem);
router.put('/', menuItemController.updateMenuItem);
router.patch('/', menuItemController.updateMenuItemStatus);

module.exports = router;