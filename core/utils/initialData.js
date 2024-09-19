const { Op } = require("sequelize");
const Category = require("../../modules/category/Category");
const Food = require("../../modules/food/Food");
const catchAsync = require("./catchAsync");
const User = require("../../modules/user/User");
const userRoles = require("../constants/userRole");
module.exports = catchAsync(async () => {
  const adminCount = await User.count({
    where: {
      userRole: {
        [Op.eq]: userRoles.ADMIN,
      },
    },
  });
  if (adminCount === 0) {
    const adminInfo = {
      firstName: "Ali",
      lastName: "Umarov",
      email: "customemail@mail.ru",
      phoneNumber: "+998991112233",
      address: "Navoiy ko'chasi 30",
      gender: "MALE",
      birthDate: 02/03/1998,
      username: "admin",
      password: "20230101",
      userRole: "ADMIN",
    };
    const stuffInfo = {
      firstName: "Ali",
      lastName: "Umarov",
      email: "customemail@mail.ru",
      phoneNumber: "+998991112233",
      address: "Navoiy ko'chasi 30",
      gender: "MALE",
      birthDate: 02 / 03 / 1998,
      username: "stuff",
      password: "20230101",
      userRole: "STUFF",
    };
    await User.create(adminInfo);
    await User.create(stuffInfo);
  }
});
