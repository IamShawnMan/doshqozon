const {body} = require("express-validator")

exports.createValidator = [
    body("firstName")
        .notEmpty()
        .withMessage("Ism bo'sh bo'lishi mumkin emas"),
    body("lastName")
        .notEmpty()
        .withMessage("Familiya bo'sh bo'lishi mumkin emas"),
    body("phoneNumber")
		.notEmpty()
		.withMessage("Telefon raqam bo'sh bo'lishi mumkin emas")
		.matches(/^[+]998[0-9]{9}$/)
		.withMessage("Telefon raqam xato kiritildi"),
    body("birthDate")
        .notEmpty()
        .withMessage("Tug'ilgan kun bo'sh bo'lmasligi kerak")
];

exports.updateValidator = [
    body("firstName")
        .notEmpty()
        .withMessage("Ism bo'sh bo'lishi mumkin emas"),
    body("lastName")
        .notEmpty()
        .withMessage("Familiya bo'sh bo'lishi mumkin emas"),
    body("phoneNumber")
		.notEmpty()
		.withMessage("Telefon raqam bo'sh bo'lishi mumkin emas")
		.matches(/^[+]998[0-9]{9}$/)
		.withMessage("Telefon raqam xato kiritildi"),
    body("birthDate")
        .notEmpty()
        .withMessage("Tug'ilgan kun bo'sh bo'lmasligi kerak")
]

exports.passwordChangeValidator = [
	body("username")
		.notEmpty()
		.withMessage("Login bo'sh bo'lishi mumkin emas")
		.isLength({ min: 5 })
		.withMessage("Login 5 ta belgidan kam bo'lmasligi kerak")
		.trim()
		.isLowercase()
		.withMessage("Login faqat kichkina harflardan iborat bo'lishi kerak"),
	body("password")
		.notEmpty()
		.withMessage("Parol bo'sh bo'lishi mumkin emas")
		.isLength({ min: 6 })
		.withMessage("Parol 6 ta belgidan kam bo'lmasligi kerak"),
]