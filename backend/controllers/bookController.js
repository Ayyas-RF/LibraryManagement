const db = require('../config/db');

exports.getAll = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM books');
    res.json({ success: true, message: 'Data buku', data: rows });
};

exports.create = async (req, res) => {
    const { judul, penulis, tahun } = req.body;
    await db.query('INSERT INTO books (judul, penulis, tahun) VALUES (?, ?, ?)', [judul, penulis, tahun]);
    res.json({ success: true, message: 'Buku ditambahkan', data: null });
};

exports.update = async (req, res) => {
    const { judul, penulis, tahun } = req.body;
    await db.query('UPDATE books SET judul=?, penulis=?, tahun=? WHERE id=?', [judul, penulis, tahun, req.params.id]);
    res.json({ success: true, message: 'Buku diupdate', data: null });
};

exports.delete = async (req, res) => {
    await db.query('DELETE FROM books WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'Buku dihapus', data: null });
};