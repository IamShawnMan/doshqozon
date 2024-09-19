const Attachments = require("../attachments/Attachments")
const Foods = require("../food/Food")
const catchAsync = require("../../core/utils/catchAsync")
const sharp = require("sharp")
const fs = require("fs")

exports.createFoodImg = catchAsync(async (req, res, next) => {
    await sharp(req.file.path).resize(160).toFile(`./build/img/${req.file.filename.slice(0, req.file.filename.lastIndexOf('.'))}.webp`)
      fs.unlink(req.file.path, (err) => {
        if(err) {
          throw err
        }
        console.log("Delete file successfully.");
      })
    const foodObj = {
        name: `${req.file.filename.slice(0, req.file.filename.lastIndexOf('.'))}.webp`,
        originalName: req.file.originalname,
        size: req.file.size,
        url: req.file.path,
        type: "webp"
    }
    const newAttachment = await Attachments.create(foodObj)
    res.status(201).json({
        status: "success",
        message: "",
        error: null,
        data: {
            newAttachment
        }
    })
})
exports.getAllAttachments = catchAsync(async (req, res, next) => {
    const allAttachments = await Attachments.findAll()
    res.json({
        status: "success",
        message: "Barcha rasmlar",
        error: null,
        data: allAttachments
    })
})

exports.getAttachmentById = catchAsync(async (req, res, next) => {
    const {id} = req.params
    const attachmentById = await Attachments.findByPk(id)
    res.json({
        status: "success",
        message: "Tanlangan rasm",
        error: null,
        data: attachmentById
    })
})