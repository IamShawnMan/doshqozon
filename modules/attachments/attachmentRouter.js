const express = require("express")
const upload = require("../../core/middlewares/uploadMiddleware")
const attachmentController = require("../attachments/attachmentController")

const router = express.Router()

router
    .post("/", upload.single("food"), attachmentController.createFoodImg)
    .get("/", attachmentController.getAllAttachments)
    .get("/:id", attachmentController.getAttachmentById)

module.exports = router