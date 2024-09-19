const FoodItem = require("./FoodItem")
const catchAsync = require("../../core/utils/catchAsync");
const Attachments = require("../attachments/Attachments");
const { Op } = require("sequelize");
const fs = require("fs")

exports.getAllFoodItems = catchAsync(async (req, res, next) => {
    const allFoodItems = await FoodItem.findAll()
    res.json({
      status: "success",
      message: "Barcha qo'shimcha taomlar",
      error: null,
      data: allFoodItems
    })
})

exports.createFoodItems = catchAsync(async (req, res, next) => {
  const {id} = req.params
  const {foodItems} = req.body
  // foodItems.forEach((foodItem) => {
  //   foodItem
  // })
  const newFoodItem = await FoodItem.bulkCreate(foodItems)
  res.status(201).json({
    status: "success",
    message: "Taom qo'shimchasi yaratildi",
    error: null,
    data: newFoodItem
  })
})

exports.updateFoodItems = catchAsync( async (req, res, next) => {
  const {id} = req.params
  const foodItemById = await FoodItem.findByPk(id)
  
  let updatedFoodItem
  updatedFoodItem = await foodItemById.update(req.body)
  res.json({
      status: "success",
      message: "Qo'shimcha taom ma'lumotlari o'zgartirildi",
      error: null,
      data: updatedFoodItem
  })
})

exports.deleteFoodItems = catchAsync( async (req, res, next) => {
    const {id} = req.params
    const foodItemById = await FoodItem.findByPk(id)
    // const attachmentByFoodItem = await Attachments.findOne({
    //     where: {
    //        id: {[Op.eq]: foodItemById.attachmentId} 
    //     }
    // })
    // await attachmentByFoodItem.destroy()
    await foodItemById.destroy()
    // const directoryPath = `build\\img\\${attachmentByFoodItem.name}`
    // fs.unlink(directoryPath, (err) => {
    //   if(err) {
    //     throw err
    //   }
    //   console.log("Delete file successfully.");
    // })
    res.json({
      status: "success",
      message: "Qo'shimcha taom o'chirildi",
      error: null,
      data: null
    })
})
  