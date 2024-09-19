const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/database/database");
const User = require("../user/User");
const orderStatus = require("../../core/constants/orderStatus");
const orderType = require("../../core/constants/orderType");
const typePayments = require("../../core/constants/paymentType");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    table: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
    },
    orderType: {
      type: DataTypes.ENUM(Object.values(orderType)),
      allowNull: false,
    },
    paymentType: DataTypes.ENUM(
      Object.values(typePayments)
    ),
    orderStatus: {
      type: DataTypes.ENUM(Object.values(orderStatus)),
      allowNull: false,
      defaultValue: orderStatus.NEW,
    },
  },
  {
    underscored: true,
  }
);

User.hasMany(Order, {
  as: "orders",
  foreignKey: "stuffId",
});
Order.belongsTo(User, { as: "stuff" });

module.exports = Order;
