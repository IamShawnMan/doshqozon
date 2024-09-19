const Category = require("./Category");
const catchAsync = require("../../core/utils/catchAsync");
const Attachments = require("../attachments/Attachments");
const Food = require("../food/Food");
const { Op } = require("sequelize");
const fs = require("fs");
exports.getAllCategories = catchAsync(
  async (req, res, next) => {
    const allCategories = await Category.findAndCountAll({
      include: { model: Attachments, as: "attachment" },
    });

    res.json({
      status: "succes",
      message: "Barcha kategoriyalar",
      error: null,
      data: allCategories.rows,
    });
  }
);
exports.getAllFoodsbyCategory = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const findByCategory = await Category.findByPk(id, {
      attributes: ["name"],
    });

    const allFoodsbyCategory = await Food.findAndCountAll({
      where: {
        categoryId: { [Op.eq]: id },
      },
    });
    res.json({
      status: "succes",
      message: `Kategoriyaga tegishli taomlar`,
      error: null,
      data: {
        categoryName: findByCategory.name,
        foodsArr: allFoodsbyCategory.rows,
      },
    });
  }
);

exports.createCategory = catchAsync(
  async (req, res, next) => {
    await Category.bulkCreate(req.body.categories);
    res.json({
      status: "success",
      message: "Yangi kategoriya qo'shildi",
      error: null,
      data: null,
    });
  }
);

exports.updateCategory = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const categoryById = await Category.findByPk(id);
    let updatedCategory;
    updatedCategory = await categoryById.update(req.body);
    res.json({
      status: "success",
      message: "Taom ma'lumotlari o'zgartirildi",
      error: null,
      data: updatedCategory,
    });
  }
);

exports.deleteCategory = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const categoryById = await Category.findByPk(id);
    const attachmentByCategory = await Attachments.findOne({
      where: {
        id: { [Op.eq]: categoryById.attachmentId },
      },
    });
    await attachmentByCategory?.destroy();
    const foodByCategory = await Food.findAll({
      where: {
        categoryId: { [Op.eq]: id },
      },
    });
    foodByCategory.forEach(async food => {
      const foodAttachment = await Attachments.findOne({
        where: {
          id: { [Op.eq]: food.attachmentId },
        },
      });
      await foodAttachment.destroy();
      await food.destroy();
      const directoryPath = `./build/img/${foodAttachment.name}`;
      fs.unlink(directoryPath, err => {
        if (err) {
          throw err;
        }
        console.log("Delete file successfully.");
      });
    });
    await categoryById.destroy();
    const directoryPath = `./build/img/${attachmentByCategory.name}`;
    fs.unlink(directoryPath, err => {
      if (err) {
        throw err;
      }
      console.log("Delete file successfully.");
    });
    res.json({
      status: "success",
      message: "Kategoriya o'chirildi",
      error: null,
      data: null,
    });
  }
);
