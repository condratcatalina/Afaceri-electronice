const { sequelize } = require('../server');
const { DataTypes } = require('sequelize');
const User = require('./User');
const Product = require('./Product');

const FavoriteItem = sequelize.define('FavoriteItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'favorite_items',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Relații
FavoriteItem.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
FavoriteItem.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
User.hasMany(FavoriteItem, { foreignKey: 'user_id' });
Product.hasMany(FavoriteItem, { foreignKey: 'product_id' });

module.exports = FavoriteItem;
