const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../../core/utils/AppError");
const User = require("../user/User");
const catchAsync = require("../../core/utils/catchAsync");
const { Op } = require("sequelize");

const generateToken = (payload, jwtSecret, options) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, jwtSecret, options, (err, token) => {
			if (err) {
				reject(err);
			} else {
				resolve(token);
			}
		});
	});
};

const findByUsername = (username) => {
	const user = User.findOne({
		where: {
			username: {
				[Op.eq]: username,
			},
		},
	});
	if (user) {
		return user;
	}
	return null;
};

exports.login = catchAsync(async (req, res, next) => {
	const { username, password } = req.body;
	const candidate = await findByUsername(username);
	if (!candidate) {
		return next(
			new AppError(
				`${res.status(400).send({
					message: "Login yoki parol xato",
				})}`,
				400
			)
		);
	}
	const passwordIsMatch = await compare(password, candidate.password);
	if (!passwordIsMatch) {
		return next(new AppError("Login yoki parol xato", 400));
	}
	const payload = {
		id: candidate.id,
		firstName: candidate.firstName,
		lastName: candidate.lastName,
		userRole: candidate.userRole,
		username: candidate.username,
		attachmentId: candidate.attachmentId
	};

	const token = await generateToken(payload, `${process.env.JWT_SECRET}`, {
		algorithm: "HS512",
		expiresIn: "7d",
	});

	res.json({
		status: "sucess",
		message: "Welcome to Doshqozon",
		error: null,
		data: {
			user: {
				...payload,
			},
			jwt: token,
		},
	});
});
