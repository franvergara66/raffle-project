const router = require("express").Router();
const adminCtrl = require("../controller/adminController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/login", adminCtrl.login);

// Las siguientes rutas requieren autenticación
router.get("/", authenticateToken, adminCtrl.getAllAdmins);
router.get("/:id", authenticateToken, adminCtrl.getAdminById);
router.post("/", authenticateToken, adminCtrl.createAdmin);
router.put("/:id", authenticateToken, adminCtrl.updateAdmin);
router.delete("/:id", authenticateToken, adminCtrl.deleteAdmin);


router.post("/login", adminCtrl.login);


module.exports = router;
