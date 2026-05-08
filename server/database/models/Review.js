const { sequelize } = require('../server');
const { DataTypes } = require('sequelize');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 } // Sistem de la 1 la 5 stele
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  tableName: 'reviews',
  timestamps: true,
});

module.exports = Review;