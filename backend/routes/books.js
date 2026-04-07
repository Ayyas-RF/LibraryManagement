const router = require('express').Router();
const auth = require('../middleware/auth');
const { getAll, create, update, delete: del } = require('../controllers/bookController');

router.get('/', auth, getAll);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, del);

module.exports = router;