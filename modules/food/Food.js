const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/database/database");
const Attachments = require("../attachments/Attachments");

const Food = sequelize.define(
  "foods",
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
    addition: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

Attachments.hasOne(Food, {
  as: "food",
  foreignKey: "attachmentId",
});
Food.belongsTo(Attachments, { as: "attachment" });

module.exports = Food;
