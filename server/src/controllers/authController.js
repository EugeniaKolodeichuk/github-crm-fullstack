const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { syncReposInBackground } = require('./repoController');

exports.register = async (req, res) => {
    const { username, password, githubUsername } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashed, githubUsername });
        res.status(201).json({ msg: 'Registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        await syncReposInBackground(user);

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Login failed' });
    }
};
