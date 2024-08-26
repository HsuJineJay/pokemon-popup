// app.js
// 這裡放套件的設定

module.exports = {
  // 解決同源政策CORS 配置
  corsOptions: {
    origin: ['http://localhost:5432', 'http://0.0.0.0:5432', 'https://pokemon-popup.onrender.com', 'https://pokemon-popup-gruop.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  },

  // Session 配置
  sessionOptions: {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  },
  
  // nodemailer 郵件配置
  mailConfig: {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    socketTimeout: 60000
  },

};