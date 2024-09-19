const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/database/database");
const Food = require("../food/Food");
const Order = require("../order/Order");

const OrderItem = sequelize.define(
  "orderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemTotalPrice: {
      type: DataTypes.INTEGER,
    },
  },
  {
    underscored: true,
  }
);
Food.hasOne(OrderItem, {
  as: "orderItem",
  foreignKey: "foodId",
});
OrderItem.belongsTo(Food, { as: "food" });

Order.hasMany(OrderItem, {
  as: "orderItems",
  foreignKey: "orderId",
});
OrderItem.belongsTo(Order, { as: "order" });
module.exports = OrderItem;
