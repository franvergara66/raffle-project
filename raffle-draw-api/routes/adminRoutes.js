const router = require("express").Router();
const adminCtrl = require("../controller/adminController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/login", adminCtrl.login);

// Las siguientes rutas requieren autenticación
router.get("/profile", authenticateToken, adminCtrl.getProfile);
router.put("/profile", authenticateToken, adminCtrl.updateProfile);
router.get("/", authenticateToken, adminCtrl.getAllAdmins);
router.get("/:id", authenticateToken, adminCtrl.getAdminById);
router.post("/", authenticateToken, adminCtrl.createAdmin);
router.put("/:id", authenticateToken, adminCtrl.updateAdmin);
router.delete("/:id", authenticateToken, adminCtrl.deleteAdmin);


module.exports = router;
