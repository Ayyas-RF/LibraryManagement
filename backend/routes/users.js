const router = require('express').Router();
const auth = require('../middleware/auth');
const { getAll, create, update, delete: del } = require('../controllers/userController');

// Terapkan middleware auth untuk memproteksi semua endpoint user
router.get('/', auth, getAll);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, del);

module.exports = router;