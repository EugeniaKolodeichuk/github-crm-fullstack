const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
    syncRepos,
    getAllRepositories,
    deleteRepository,
    updateRepository,
    createRepository
} = require('../controllers/repoController');

router.get('/sync', auth, syncRepos);
router.get('/', auth, getAllRepositories);
router.post('/', auth, createRepository);
router.put('/:id', auth, updateRepository);
router.delete('/:id', auth, deleteRepository);

module.exports = router;