const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) return res.status(404).json({ success: false, message: 'User tidak ditemukan', data: null });

        const validPassword = await bcrypt.compare(password, users[0].password);
        if (!validPassword) return res.status(400).json({ success: false, message: 'Password salah', data: null });

        const token = jwt.sign({ id: users[0].id, email: users[0].email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ success: true, message: 'Login berhasil', data: { token, user: { id: users[0].id, nama: users[0].nama } } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
};