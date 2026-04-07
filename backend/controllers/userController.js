const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getAll = async (req, res) => {
    const [rows] = await db.query('SELECT id, nama, email FROM users');
    res.json({ success: true, message: 'Data user', data: rows });
};

exports.create = async (req, res) => {
    const { nama, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (nama, email, password) VALUES (?, ?, ?)', [nama, email, hashed]);
    res.json({ success: true, message: 'User ditambahkan', data: null });
};

exports.update = async (req, res) => {
    const { nama, email } = req.body;
    await db.query('UPDATE users SET nama=?, email=? WHERE id=?', [nama, email, req.params.id]);
    res.json({ success: true, message: 'User diupdate', data: null });
};

exports.delete = async (req, res) => {
    await db.query('DELETE FROM users WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'User dihapus', data: null });
};