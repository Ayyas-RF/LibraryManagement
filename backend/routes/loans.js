const router = require('express').Router();
const auth = require('../middleware/auth');
const { getAll, create, update } = require('../controllers/loanController');

// Sesuai spesifikasi awal, peminjaman tidak ada endpoint delete (hanya update status)
router.get('/', auth, getAll);
router.post('/', auth, create);
router.put('/:id', auth, update);

module.exports = router;