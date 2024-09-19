const express = require("express");
const reportControllers = require("./reportControllers");
const router = express.Router();
module.exports = router
  .get("/income", reportControllers.grossProfit)
  .get(
    "/circle",
    reportControllers.circleGrossProfitByCategory
  );
