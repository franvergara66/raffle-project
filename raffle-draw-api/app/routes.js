const router = require("express").Router();

router.use("/api/v1/admin", require("../routes/adminRoutes"));
router.use("/api/v1/admins", require("../routes/adminRoutes"));
router.use("/api/v1/admin-notifications", require("../routes/adminNotificationRoutes"));
router.use("/api/v1/dashboard", require("../routes/dashboardRoutes"));
router.use("/api/v1/lotteries", require("../routes/lotteryRoutes"));
router.use("/api/auth", require("../routes/authRoutes"));


router.get("/health", (_req, res) => {
  res.status(200).json({ message: "success" });
});

module.exports = router;


