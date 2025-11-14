const { sequelize } = require('../server');
const { DataTypes } = require('sequelize');
const User = require('./User'); // make sure your User model exists
const Product = require('./Product');

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: {
        args: [1],
        msg: 'Quantity must be at least 1',
      },
      isInt: {
        msg: 'Quantity must be an integer',
      },
    },
  },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
  tableName: 'cart_items',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}
);

// Associations
CartItem.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
CartItem.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });

User.hasMany(CartItem, { foreignKey: 'user_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });

module.exports = CartItem;
