const express = require("express");
const app = express();
const AppError = require("./core/utils/AppError");
const authMiddleware = require("./core/middlewares/authMiddleware");
const authRouter = require("../server/modules/auth/authRouter");
const categoryRouter = require("../server/modules/category/categoryRouter");
const userRouter = require("../server/modules/user/userRouter");
const orderRouter = require("../server/modules/order/orderRouter");
const foodRouter = require("../server/modules/food/foodRouter");
const reportRouter = require("./modules/report/reportRouter");
const attachmentRouter = require("./modules/attachments/attachmentRouter");
const foodItemRouter = require("./modules/foodItem/foodItemRouter");
const errorController = require("./modules/error/errorController");

app.use(express.json());
app.use(require("cors")());
app.use(express.static(__dirname + "/build"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authMiddleware, userRouter);
app.use(
  "/api/v1/categories",
  authMiddleware,
  categoryRouter
);
app.use("/api/v1/foods", authMiddleware, foodRouter);
app.use(
  "/api/v1/food-items",
  authMiddleware,
  foodItemRouter
);
app.use("/api/v1/orders", authMiddleware, orderRouter);
app.use(
  "/api/v1/attachments",
  authMiddleware,
  attachmentRouter
);
app.use("/api/v1/reports", authMiddleware, reportRouter);

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.all("*", (req, res, next) => {
  return next(
    new AppError(`${req.path} yo'li mavjud emas`, 404)
  );
});

app.use(errorController);

module.exports = app;
