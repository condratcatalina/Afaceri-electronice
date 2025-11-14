// server/database/models/index.js
const User = require('./User');
const Product = require('./Product')
const CartItem = require('./CartItem');
const FavoriteItem = require('./FavoriteItem');

// Associations - trebuie facute asociere dintre modele (leg intre tabele)
module.exports = { User, Product, CartItem, FavoriteItem };