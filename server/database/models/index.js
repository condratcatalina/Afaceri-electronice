// server/database/models/index.js
//const User = require('./User');
//const Product = require('./Product')
//const CartItem = require('./CartItem');
//const FavoriteItem = require('./FavoriteItem');

// Associations - trebuie facute asociere dintre modele (leg intre tabele)
//module.exports = { User, Product, CartItem, FavoriteItem };


const User = require('./User');
const Product = require('./Product');
const CartItem = require('./CartItem');
const FavoriteItem = require('./FavoriteItem');
const Review = require('./Review'); // Importăm noul model

// --- ASOCIERI ---

// Un produs are mai multe recenzii
Product.hasMany(Review, { foreignKey: 'productId', onDelete: 'CASCADE' });
Review.belongsTo(Product, { foreignKey: 'productId' });

// Un user poate lăsa mai multe recenzii
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Product, CartItem, FavoriteItem, Review };