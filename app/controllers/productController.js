const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const filters = req.query;
        const products = await Product.getAll(filters);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '內部伺服器錯誤:get' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const productID = await Product.create(req.body);
        res.json({ message: `新增: ${productID} --- ${req.body.productName}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '內部伺服器錯誤:create' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.delete(req.body.productID);
        res.json({ message: `刪除: ${req.body.productID} --- 成功` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '內部伺服器錯誤:delete' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        await Product.update(req.body);
        res.json({ message: `更新: ${req.body.productID} --- 成功` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '內部伺服器錯誤:update' });
    }
};

exports.partialUpdateProduct = async (req, res) => {
    try {
        const result = await Product.partialUpdate(req.body);
        if (result) {
            res.json({ message: `部分更新產品 ID = ${req.body.productID} --- 成功` });
        } else {
            res.status(400).json({ error: '無效的更新參數' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '內部伺服器錯誤:partialUpdateProduct' });
    }
};