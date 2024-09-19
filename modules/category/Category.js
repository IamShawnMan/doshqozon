const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/database/database");
const Attachments = require("../attachments/Attachments");
const Food = require("../food/Food");

const Category = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

Category.hasMany(Food, {
  as: "foods",
  foreignKey: "categoryId",
});
Food.belongsTo(Category, { as: "category" });

Attachments.hasOne(Category, {
  as: "category",
  foreignKey: "attachmentId",
});
Category.belongsTo(Attachments, { as: "attachment" });
module.exports = Category;
