const express = require("express");
const router = express.Router();
const categoryControllers = require("./categoryControllers");

module.exports = router
	.get("/", categoryControllers.getAllCategories)
	.get("/:id", categoryControllers.getAllFoodsbyCategory)
	.post("/", categoryControllers.createCategory)
	.put("/:id", categoryControllers.updateCategory)
	.delete("/:id", categoryControllers.deleteCategory)