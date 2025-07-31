const path = require('path');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config(); // ← carga .env desde el working directory


const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT = 3306,
} = process.env;

console.log('📂 Working dir:', process.cwd());
console.log('🔍 ENV:', {
  DB_HOST,
  DB_USER,
  DB_PASSWORD: DB_PASSWORD ? '***' : undefined,
  DB_NAME,
  DB_PORT,
});

async function initialize() {
  let pool;

  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`✅ Base de datos '${DB_NAME}' lista`);
    await connection.end();

    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
    });

    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        email VARCHAR(40) NOT NULL UNIQUE,
        username VARCHAR(40) NOT NULL UNIQUE,
        email_verified_at TIMESTAMP NULL DEFAULT NULL,
        image LONGTEXT DEFAULT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'editor',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Tabla 'admins' lista");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS lotteries (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        detail TEXT,
        image VARCHAR(255),
        status TINYINT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
    console.log("✅ Tabla 'lotteries' lista");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS phases (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        lottery_id BIGINT UNSIGNED NOT NULL,
        phase_number INT NOT NULL,
        start DATETIME NOT NULL,
        end DATETIME NOT NULL,
        quantity INT NOT NULL,
        available INT NOT NULL,
        at_dr TINYINT DEFAULT 1,
        status TINYINT DEFAULT 1,
        draw_status TINYINT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (lottery_id) REFERENCES lotteries(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);
    console.log("✅ Tabla 'phases' lista");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS win_bonuses (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        lottery_id BIGINT UNSIGNED NOT NULL,
        level INT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        status TINYINT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (lottery_id) REFERENCES lotteries(id) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);
    console.log("✅ Tabla 'win_bonuses' lista");

    const [rows] = await pool.query(`SELECT COUNT(*) AS total FROM admins`);
    if (rows[0].total === 0) {
      const hashedPassword = '$2b$10$TQyHKmMJE3ZvBO91/lQRGehqsHzk48xqEPNHm2IGaKClfyN/R82um'; // m3rcur10
      await pool.query(`
        INSERT INTO admins (name, email, username, password, image, role)
        VALUES (?, ?, ?, ?, ?, ?)`,
        ['Super Admin', 'admin@site.com', 'admin', hashedPassword, 'default.jpg', 'admin']
      );
      console.log("🧑‍💻 Admin por defecto creado (usuario: admin / contraseña: m3rcur10)");
    } else {
      console.log("🔐 Ya existen admins registrados");
    }

    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error al inicializar:", err.message);
    if (pool) await pool.end();
    process.exit(1);
  }
}

initialize();
