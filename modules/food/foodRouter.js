const express = require("express");
const foodController = require("./foodControllers");
const router = express.Router();
module.exports = router
.get("/", foodController.getAllFoods)
.get("/:id", foodController.getFoodById)
.post("/", foodController.createFoods)
.put("/:id", foodController.updateFoods)
.delete("/:id", foodController.deleteFoods)

