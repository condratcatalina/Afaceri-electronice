// server/database/models/index.js
const User = require('./User');
const Product = require('./Product')

// Associations - trebuie facute asociere dintre modele (leg intre tabele)
module.exports = { User, Product };