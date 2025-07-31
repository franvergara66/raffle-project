const Admin = require('../models/adminModel');
const AdminPasswordReset = require('../models/adminPasswordResetModel');
const { sendMail } = require('../service/mailService');
const resetTemplate = require('../service/templates/resetPassword');

function generateCode(len = 6) {
  let code = '';
  for (let i = 0; i < len; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

exports.sendResetCode = async (req, res) => {
  const { type, value } = req.body;
  if (!type || !value) {
    return res.status(400).json({ message: { error: ['Invalid request'] } });
  }

  try {
    let admin;
    if (type === 'email') {
      const admins = await Admin.findByEmail(value);
      admin = admins[0];
    } else if (type === 'username') {
      admin = await Admin.findByUsername(value);
    } else {
      return res.status(400).json({ message: { error: ['Invalid type'] } });
    }

    if (!admin) {
      return res.status(404).json({ message: { error: ['User not found'] } });
    }

    const code = generateCode();
    await AdminPasswordReset.create({ email: admin.email, token: code });

    try {
      await sendMail(
        admin.email,
        'Password Reset Code',
        resetTemplate(code)
      );
    } catch (err) {
      console.error('Mail error:', err.message);
    }

    return res.json({
      message: { success: ['Password reset email sent successfully'] },
      data: { email: admin.email },
    });
  } catch (err) {
    console.error('sendResetCode error:', err);
    return res.status(500).json({ message: { error: ['Server error'] } });
  }
};

exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ message: { error: ['Invalid request'] } });
  }

  try {
    const reset = await AdminPasswordReset.findValid(email, code);
    if (!reset) {
      return res.status(400).json({ message: { error: ['Invalid code'] } });
    }
    return res.json({ message: { success: ['Code verified'] } });
  } catch (err) {
    console.error('verifyCode error:', err);
    return res.status(500).json({ message: { error: ['Server error'] } });
  }
};
