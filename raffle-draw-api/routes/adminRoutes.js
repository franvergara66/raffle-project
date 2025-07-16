const router = require("express").Router();
const adminCtrl = require("../controller/adminController");

router.get("/", adminCtrl.getAllAdmins);
router.get("/:id", adminCtrl.getAdminById);
router.post("/", adminCtrl.createAdmin);
router.put("/:id", adminCtrl.updateAdmin);
router.delete("/:id", adminCtrl.deleteAdmin);
router.post("/login", adminCtrl.login);


module.exports = router;
