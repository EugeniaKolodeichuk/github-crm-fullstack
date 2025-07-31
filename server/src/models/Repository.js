const mongoose = require('mongoose');

const RepositorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    repoId: { type: Number, required: true },
    ownerId: { type: Number, required: true },
    owner: { type: String, required: true },
    name: { type: String, required: true },
    html_url: { type: String, required: true },
    stargazers_count: { type: Number },
    forks: { type: Number },
    open_issues: { type: Number },
    created_at: { type: Number },
    isPrivate: { type: Boolean, default: false },
});

module.exports = mongoose.model('Repository', RepositorySchema);
