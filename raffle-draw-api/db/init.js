const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT = 3306,
} = process.env;

async function initialize() {
  try {
    // 1. Conexión sin base seleccionada
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
    });

    // 2. Crear base si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`✅ Base de datos '${DB_NAME}' lista`);
    await connection.end();

    // 3. Conectar al pool ahora sí con DB seleccionada
    const pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
    });

    // 4. Crear tabla admins
    const sql = `
      CREATE TABLE IF NOT EXISTS admins (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        email VARCHAR(40) NOT NULL UNIQUE,
        username VARCHAR(40) NOT NULL UNIQUE,
        email_verified_at TIMESTAMP NULL DEFAULT NULL,
        image VARCHAR(255) DEFAULT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;
    await pool.query(sql);
    console.log("✅ Tabla 'admins' verificada o creada");

    // 5. Verificar si hay algún admin
    const [rows] = await pool.query(`SELECT COUNT(*) AS total FROM admins`);
    if (rows[0].total === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await pool.query(`
        INSERT INTO admins (name, email, username, password, image)
        VALUES (?, ?, ?, ?, ?)`,
        ['Super Admin', 'admin@site.com', 'admin', hashedPassword, 'default.jpg']
      );
      console.log("🧑‍💻 Admin por defecto creado (usuario: admin / contraseña: admin123)");
    } else {
      console.log("🔐 Ya existen admins registrados");
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Error al inicializar:", err.message);
    process.exit(1);
  }
}

initialize();
