const express = require("express");
const roleMiddleware = require("../../core/middlewares/roleMiddleware");
const orderController = require("../order/orderController");
const router = express.Router();

module.exports = router
  .get(
    "/",
    roleMiddleware(["ADMIN", "STUFF"]),
    orderController.getAllOrders
  )
  .post(
    "/",
    roleMiddleware(["ADMIN", "STUFF"]),
    orderController.createOrder
  )
  .get(
    "/:id",
    roleMiddleware(["ADMIN", "STUFF"]),
    orderController.getOrderItemsbyOrder
  )
  .patch(
    "/:id",
    roleMiddleware(["ADMIN", "STUFF"]),
    orderController.orderCompletion
  );
