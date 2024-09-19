const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/database/database");
const Attachments = require("../attachments/Attachments");
const Food = require("../food/Food");

const FoodItem = sequelize.define(
  "foodItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    measure: DataTypes.STRING(100),
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

Attachments.hasOne(FoodItem, {
  as: "item",
  foreignKey: "attachmentId",
});
FoodItem.belongsTo(Attachments, { as: "attachment" });

Food.hasMany(FoodItem, {
  as: "foodItems",
  foreignKey: "foodId",
});
FoodItem.belongsTo(Food, { as: "food" });

module.exports = FoodItem;
