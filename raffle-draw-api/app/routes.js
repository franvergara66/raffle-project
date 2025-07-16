const router = require("express").Router();

router.use("/api/v1/tickets", require("../routes/ticket"));
router.use("/api/v1/admin", require("../routes/adminRoutes"));
router.use("/api/v1/admins", require("../routes/adminRoutes"));


router.get("/health", (_req, res) => {
  res.status(200).json({ message: "success" });
});

module.exports = router;


