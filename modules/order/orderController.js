const { Op } = require("sequelize");
const Order = require("../order/Order");
const OrderItems = require("../orderItem/OrderItem");
const catchAsync = require("../../core/utils/catchAsync");
const statusOrder = require("../../core/constants/orderStatus");
const typeOrder = require("../../core/constants/orderType");
const typePayment = require("../../core/constants/paymentType");
const Food = require("../food/Food");
const Attachments = require("../attachments/Attachments");

exports.getAllOrders = catchAsync(
  async (req, res, next) => {
    const { id, userRole } = req.user;
    let whereObj;
    if (userRole === "STUFF") {
      whereObj = {
        stuffId: { [Op.eq]: id },
      };
    } else {
      whereObj = {};
    }
    const allOrders = await Order.findAndCountAll(whereObj);

    res.json({
      status: "succes",
      message: "Barcha buyurtmalar",
      errors: null,
      data: allOrders.rows,
    });
  }
);

exports.createOrder = catchAsync(async (req, res, next) => {
  const { id, userRole } = req.user;
  const items = req.body.items;
  const orderType = req.body.orderType;
  const paymentType = req.body.paymentType;
  let newOrder;
  if (items?.length > 0) {
    newOrder = await Order.create({
      stuffId: id,
      orderType,
      paymentType,
    });
  }
  const itemArr = [];

  items?.forEach(item => {
    return itemArr.push({
      itemTotalPrice: item.price * item.count,
      quantity: item.count,
      foodId: item.id,
      orderId: newOrder.id,
    });
  });
  await OrderItems.bulkCreate(itemArr);
  const totalMone = await OrderItems.sum("itemTotalPrice", {
    where: { orderId: { [Op.eq]: newOrder.id } },
  });

  await newOrder.update({ totalPrice: totalMone });
  if (orderType === typeOrder.DINE_IN) {
    res.json({
      status: "succes",
      message: "Yangi buyurtma qo`shildi",
      errors: null,
      data: null,
    });
  } else {
    res.json({
      status: "succes",
      message: "Yangi buyurtma qo`shildi",
      errors: null,
      data: null,
    });
  }
});

exports.orderCompletion = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    await Order.update(
      {
        orderStatus: statusOrder.IN_PROCESS,
      },
      { where: { id: { [Op.eq]: id } } }
    );
    res.json({
      status: "succes",
      message: "Buyurtma qabul qilindi",
      errors: null,
      data: null,
    });
  }
);

exports.getOrderItemsbyOrder = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const allItemsbyOrder =
      await OrderItems.findAndCountAll({
        include: [
          {
            model: Food,
            as: "food",
            include: [
              { model: Attachments, as: "attachment" },
            ],
          },
        ],
        where: { orderId: { [Op.eq]: id } },
      });

    res.json({
      status: "succes",
      message: "Buyurtmaga tegishli ovqatlar ro`yhati",
      errrors: null,
      data: allItemsbyOrder.rows,
    });
  }
);
