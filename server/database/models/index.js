const sequelize = require('../db'); // <--- Importă din db.js
const User = require('./User');
const Product = require('./Product');
const CartItem = require('./CartItem');
const FavoriteItem = require('./FavoriteItem');
const Review = require('./Review');

// --- ASOCIERI ---
Product.hasMany(Review, { foreignKey: 'productId', onDelete: 'CASCADE' });
Review.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

// Exportăm totul, inclusiv instanța sequelize
module.exports = { sequelize, User, Product, CartItem, FavoriteItem, Review };