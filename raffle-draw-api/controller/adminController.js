const Admin = require("../models/adminModel");

exports.getAllAdmins = async (_req, res) => {
  const admins = await Admin.findAll();
  res.json(admins);
};

exports.getAdminById = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) return res.status(404).json({ message: "Admin no encontrado" });
  res.json(admin);
};

exports.createAdmin = async (req, res) => {
  const { name, email, username, password, image } = req.body;
  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }
  try {
    const newAdmin = await Admin.create({ name, email, username, password, image });
    res.status(201).json({ message: "Admin creado", id: newAdmin.id });
  } catch (err) {
    res.status(500).json({ message: "Error al crear admin", error: err.message });
  }
};

exports.updateAdmin = async (req, res) => {
  const { name, email, username, image } = req.body;
  try {
    await Admin.update(req.params.id, { name, email, username, image });
    res.json({ message: "Admin actualizado" });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar admin", error: err.message });
  }
};

exports.login = async (req, res) => {
  // lógica de login aquí
};


exports.deleteAdmin = async (req, res) => {
  try {
    await Admin.delete(req.params.id);
    res.json({ message: "Admin eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar admin", error: err.message });
  }
};
