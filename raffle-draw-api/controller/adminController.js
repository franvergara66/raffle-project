const Admin = require("../models/adminModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  const { name, email, username, password, image, role = "editor" } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  const allowedRoles = ["editor", "superadmin"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Rol inválido. Debe ser 'editor' o 'superadmin'" });
  }

  try {
    const newAdmin = await Admin.create({ name, email, username, password, image, role });
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

exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin no encontrado" });
    }
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener perfil", error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email, image } = req.body;
  try {
    const current = await Admin.findById(req.admin.id);
    if (!current) {
      return res.status(404).json({ message: "Admin no encontrado" });
    }
    await Admin.update(req.admin.id, {
      name: name ?? current.name,
      email: email ?? current.email,
      username: current.username,
      image: image ?? current.image,
    });
    const updated = await Admin.findById(req.admin.id);
    res.json({ message: "Perfil actualizado", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar perfil", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admins = await Admin.findByEmail(email);

    if (!admins || admins.length === 0) {
      return res.status(401).json({ message: "Correo no registrado" });
    }

    const admin = admins[0];

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};


exports.deleteAdmin = async (req, res) => {
  try {
    await Admin.delete(req.params.id);
    res.json({ message: "Admin eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar admin", error: err.message });
  }
};
