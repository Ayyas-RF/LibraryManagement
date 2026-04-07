const db = require('../config/db');

exports.getAll = async (req, res) => {
    const query = `
        SELECT l.*, u.nama as user_nama, b.judul as book_judul 
        FROM loans l 
        JOIN users u ON l.user_id = u.id 
        JOIN books b ON l.book_id = b.id`;
    const [rows] = await db.query(query);
    res.json({ success: true, message: 'Data peminjaman', data: rows });
};

exports.create = async (req, res) => {
    const { user_id, book_id, tanggal_pinjam } = req.body;

    const [cekBuku] = await db.query('SELECT * FROM loans WHERE book_id = ? AND status = "dipinjam"', [book_id]);
    if (cekBuku.length > 0) {
        return res.status(400).json({ success: false, message: 'Buku sedang dipinjam', data: null });
    }

    await db.query('INSERT INTO loans (user_id, book_id, tanggal_pinjam) VALUES (?, ?, ?)', [user_id, book_id, tanggal_pinjam]);
    res.json({ success: true, message: 'Peminjaman dicatat', data: null });
};

exports.update = async (req, res) => {
    const { tanggal_kembali, status } = req.body;
    await db.query('UPDATE loans SET tanggal_kembali=?, status=? WHERE id=?', [tanggal_kembali, status, req.params.id]);
    res.json({ success: true, message: 'Status peminjaman diupdate', data: null });
};