const { Op } = require("sequelize");
const Food = require("./Food");
const catchAsync = require("../../core/utils/catchAsync");
const Category = require("../category/Category");
const Attachments = require("../attachments/Attachments");
const fs = require("fs");

exports.getAllFoods = catchAsync(async (req, res, next) => {
  const allFoods = await Food.findAll();
  res.json({
    status: "success",
    message: "Barcha taomlar",
    error: null,
    data: allFoods,
  });
});

exports.getFoodById = catchAsync(async (req, res, next) => {
  const id = +req.params.id;
  const mainFood = await Food.findByPk(id);
  let additional;
  if (id === 1 || id === 2 || id === 3 || id === 4) {
    console.log(id);
    additional = await Food.findAll({
      where: {
        [Op.or]: [
          {
            id: mainFood.id,
          },
          {
            categoryId: 6,
          },
        ],
      },
    });
  } else if (id == 9) {
    additional = await Food.findAll({
      where: {
        [Op.or]: [
          {
            categoryId: {
              [Op.eq]: 3,
            },
          },
          { id: { [Op.eq]: id } },
        ],
      },
    });
  } else {
    additional = await Food.findAll({
      where: { id: { [Op.eq]: id } },
    });
    const ab = await Category.findOne({
      where: { id: { [Op.eq]: additional.categoryId } },
    });
  }

  res.json({
    status: "success",
    message: "Tanlangan taom",
    error: null,
    data: {
      mainFood,
      extra: {
        additional,
      },
    },
  });
});

exports.createFoods = catchAsync(async (req, res, next) => {
  const { foods } = req.body;
  const newFoods = await Food.bulkCreate(foods);
  res.status(201).json({
    status: "success",
    message: "Taom yaratildi",
    error: null,
    data: newFoods,
  });
});

exports.updateFoods = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const foodById = await Food.findByPk(id);
  let updatedFood;
  updatedFood = await foodById.update(req.body);
  res.json({
    status: "success",
    message: "Taom ma'lumotlari o'zgartirildi",
    error: null,
    data: updatedFood,
  });
});

exports.deleteFoods = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const foodById = await Food.findByPk(id);
  const attachmentByFood = await Attachments.findOne({
    where: {
      id: { [Op.eq]: foodById.attachmentId },
    },
  });
  await attachmentByFood?.destroy();
  await foodById.destroy();
  const directoryPath = `./build/img/${attachmentByFood.name}`;
  fs.unlink(directoryPath, err => {
    if (err) {
      throw err;
    }
    console.log("Delete file successfully.");
  });
  res.json({
    status: "success",
    message: "Taom o'chirildi",
    error: null,
    data: null,
  });
});
