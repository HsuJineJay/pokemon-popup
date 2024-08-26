const MenuItem = require('../models/MenuItem');

exports.getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.getAll(req.query);
        res.json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'menuItem資料庫查詢錯誤' });
    }
};

exports.createMenuItem = async (req, res) => {
    try {
        const newItemId = await MenuItem.create(req.body);
        res.json({ message: `insert: ${newItemId} --- OK` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'menuItem資料庫插入錯誤' });
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        await MenuItem.delete(req.body.itemID);
        res.json({ message: `delete: ${req.body.itemID} --- OK` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'menuItem資料庫刪除錯誤' });
    }
};

exports.updateMenuItem = async (req, res) => {
    try {
        await MenuItem.update(req.body);
        res.json({ message: `update: ${req.body.itemID} --- OK` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'menuItem資料庫更新錯誤' });
    }
};

exports.updateMenuItemStatus = async (req, res) => {
    try {
        await MenuItem.updateStatus(req.body);
        res.json({ message: `更改菜單狀態 ${req.body.itemID} --- OK` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'menuItem資料庫更新錯誤' });
    }
};