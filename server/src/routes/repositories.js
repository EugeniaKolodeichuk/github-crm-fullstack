const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
    getAllRepositories,
    createRepository,
    updateRepository,
    deleteRepository
} = require('../controllers/repoController');

router.use(auth);
router.get('/', getAllRepositories);
router.post('/', createRepository);
router.put('/:id', updateRepository);
router.delete('/:id', deleteRepository);

module.exports = router;
