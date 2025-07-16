const router = require("express").Router();
const adminCtrl = require("../controller/adminController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/login", adminCtrl.login);

// Las siguientes rutas requieren autenticación
router.get("/", adminCtrl.getAllAdmins);
router.get("/:id", adminCtrl.getAdminById);
router.post("/", adminCtrl.createAdmin);
router.put("/:id", adminCtrl.updateAdmin);
router.delete("/:id", adminCtrl.deleteAdmin);


router.post("/login", adminCtrl.login);


module.exports = router;
