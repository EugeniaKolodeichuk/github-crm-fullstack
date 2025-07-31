const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    githubUsername: { type: String, required: true },
    deletedRepoId: [Number],
});

module.exports = mongoose.model('User', userSchema);
