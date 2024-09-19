const { DataTypes } = require("sequelize");
const sequelize = require("../../core/config/database/database");
const { hash } = require("bcrypt");
const userRole = require("../../core/constants/userRole");
const gender = require("../../core/constants/genders");

const User = sequelize.define(
	"user",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		birthDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			// allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			// allowNull: false,
		},
		userRole: {
			type: DataTypes.ENUM(Object.values(userRole)),
			// allowNull: false,
		},
		gender: {
			type: DataTypes.ENUM(Object.values(gender)),
			allowNull: false,
		},
	},
	{
		underscored: true,
		hooks: {
			async beforeCreate(user) {
				user.password = await hash(user.password, 8);
			},
		},
	}
);

module.exports = User;
