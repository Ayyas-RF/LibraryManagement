const router = require('express').Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

router.get('/', auth, async (req, res) => {
    try {
        // Jalankan 3 query secara bersamaan untuk performa yang lebih baik (menggunakan Promise.all opsional, tapi ini pendekatan berurutan yang mudah dipahami)
        const [books] = await db.query('SELECT COUNT(*) as total FROM books');
        const [users] = await db.query('SELECT COUNT(*) as total FROM users');
        const [activeLoans] = await db.query('SELECT COUNT(*) as total FROM loans WHERE status = "dipinjam"');

        res.json({
            success: true,
            message: 'Data statistik dashboard',
            data: {
                totalBuku: books[0].total,
                totalUser: users[0].total,
                peminjamanAktif: activeLoans[0].total
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
});

module.exports = router;