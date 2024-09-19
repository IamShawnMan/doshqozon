const express = require("express");
const foodItemController = require("./foodItemController");
const router = express.Router();

module.exports = router
.get("/", foodItemController.getAllFoodItems)
.post("/:id", foodItemController.createFoodItems)
.put("/:id", foodItemController.updateFoodItems)
.delete("/:id", foodItemController.deleteFoodItems)
