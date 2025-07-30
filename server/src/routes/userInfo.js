const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

router.get('/name', auth, (req, res) => {
    res.json(req.user);
});

module.exports = router;
