const Order = require("../order/Order");
const Food = require("../food/Food");
const OrderItems = require("../orderItem/OrderItem");
const catchAsync = require("../../core/utils/catchAsync");
const Category = require("../category/Category");
const { Op } = require("sequelize");

exports.grossProfit = catchAsync(async (req, res, next) => {
  const allPayments = await Order.sum("totalPrice");
  res.json({
    status: "succes",
    message: "Barcha Daromadlar",
    data: allPayments,
  });
});

exports.circlyGrossProfitByCategory = catchAsync(
  async (req, res, next) => {
    const allCategory = await Category.findAll({
      attributes: ["id", "name"],
    });
    let sum = [];
    allCategory?.map(async e => {
      const sumByCategory = await OrderItems.findAll({
        attributes: ["itemTotalPrice"],
        include: [
          {
            model: Food,
            where: { categoryId: { [Op.eq]: e.id } },
          },
        ],
      });
      console.log(sumByCategory.length);
      const sumItem = sumByCategory.reduce(
        (acc, element) => acc + element.itemTotalPrice,
        0
      );
      sum.push({ id: e.id, name: e.name, sum: sumItem });
    });
    setTimeout(() => console.log(sum), 599);
    res.json({
      status: "succes",
      message: "Kategoriya bo`yicha",
      data: sum,
    });
  }
);
