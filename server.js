const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { Pool } = require('pg');
const path = require('path');

const app = express();

// 導入配置
const dbConfig = require('./config/database');
const appConfig = require('./config/app');

// 中間件設置
app.use(cors(appConfig.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(appConfig.sessionOptions));
app.use(express.static('./public'));

// 數據庫連接
const pool = new Pool(dbConfig);

// 路由
const productRoutes = require('./app/routes/productRoutes');
const menuItemRoutes = require('./app/routes/menuItemRoutes');

app.use('/api/product', productRoutes);
app.use('/api/menuItem', menuItemRoutes);

// 錯誤處理
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});

// 啟動服務器
const PORT = process.env.DB_PORT || 5432;
app.listen(PORT, () => console.log(`伺服器運行在端口 ${PORT}`));