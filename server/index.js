const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { sequelize, Product } = require('./database/models');
const db = require('./database/models');

const app = express();
dotenv.config(); // Încărcăm variabilele din .env

// Import rute
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const favoriteRoutes = require('./routes/favorites.routes');
const reviewRoutes = require('./routes/review.routes');

// MODIFICARE: Folosim PORT din .env, sau 3001 ca fallback
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: "L'Éternel API is running" });
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/reviews', reviewRoutes);


sequelize.sync(
  //{ alter: true }
) 
  .then(() => {
    console.log('✨ Baza de date sincronizată (spotify_url e gata!)');
    app.listen(PORT, () => console.log(`🚀 Server pe portul ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Eroare la sincronizare:', err);
  });