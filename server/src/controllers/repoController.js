const Repository = require('../models/Repository');
const User = require('../models/User');
const axios = require('axios');

exports.getAllRepositories = async (req, res) => {
    try {
        const repositories = await Repository.find({
            user: req.user._id,
            isPrivate: false,
        }).sort({ created_at: -1 });

        res.json(repositories);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to get repositories', error: err.message });
    }
};

exports.createRepository = async (req, res) => {
    try {
        const { path, description, isPrivate, githubToken } = req.body;

        if (!path || !path.includes('/')) {
            return res.status(400).json({ msg: 'Invalid path format. Use owner/repo' });
        }

        if (!githubToken) {
            return res.status(400).json({ msg: 'GitHub token required' });
        }

        const [owner, repoName] = path.split('/');
        const { Octokit } = await import('@octokit/rest');
        const octokit = new Octokit({ auth: githubToken });

        const { data: repo } = await octokit.repos.createForAuthenticatedUser({
            name: repoName,
            private: isPrivate || false,
            description: description || '',
        });

        const repository = await Repository.create({
            user: req.user._id,
            repoId: repo.id,
            ownerId: repo.owner.id,
            owner: repo.owner.login,
            name: repo.name,
            html_url: repo.html_url,
            stargazers_count: repo.stargazers_count,
            forks: repo.forks,
            open_issues: repo.open_issues,
            created_at: Math.floor(new Date(repo.created_at).getTime() / 1000),
            isPrivate: repo.private,
        });

        res.status(201).json(repository);
    } catch (err) {
        res.status(400).json({ msg: 'Failed to create GitHub repository', error: err.message });
    }
};

exports.updateRepository = async (req, res) => {
    try {
        const repoInDb = await Repository.findOne({ _id: req.params.id, user: req.user._id });
        if (!repoInDb) return res.status(404).json({ msg: 'Not found' });

        const response = await axios.get(`https://api.github.com/repos/${repoInDb.owner}/${repoInDb.name}`);
        const updated = response.data;

        repoInDb.stargazers_count = updated.stargazers_count;
        repoInDb.forks = updated.forks;
        repoInDb.open_issues = updated.open_issues;
        await repoInDb.save();

        res.json({ msg: 'Updated', repo: repoInDb });
    } catch (err) {
        res.status(500).json({ msg: 'Failed to update repo', error: err.message });
    }
};

exports.deleteRepository = async (req, res) => {
    try {
        await Repository.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        res.json({ msg: 'Deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Failed to delete repository', error: err.message });
    }
};

exports.syncRepos = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        await syncReposInBackground(user);
        res.json({ msg: 'Repositories synced' });
    } catch (err) {
        res.status(500).json({ msg: 'Failed to sync repos', error: err.message });
    }
};

async function syncReposInBackground(user) {
    if (!user || !user.githubUsername) {
        return;
    }

    try {
        const userInfo = await axios.get(`https://api.github.com/users/${user.githubUsername}`);
        const githubOwnerId = userInfo.data.id;

        if (!user.ownerId || user.ownerId !== githubOwnerId) {
            await User.findByIdAndUpdate(user._id, { ownerId: githubOwnerId });
        }

        let page = 1;
        let allRepos = [];

        while (true) {
            const response = await axios.get(`https://api.github.com/users/${user.githubUsername}/repos?per_page=100&page=${page}`);
            const repos = response.data;
            if (repos.length === 0) break;
            allRepos = [...allRepos, ...repos];
            page++;
        }

        for (const repo of allRepos) {
            await Repository.findOneAndUpdate(
                { repoId: repo.id, user: user._id },
                {
                    user: user._id,
                    repoId: repo.id,
                    ownerId: repo.owner.id,
                    owner: repo.owner.login,
                    name: repo.name,
                    html_url: repo.html_url,
                    stargazers_count: repo.stargazers_count,
                    forks: repo.forks,
                    open_issues: repo.open_issues,
                    created_at: Math.floor(new Date(repo.created_at).getTime() / 1000),
                    isPrivate: repo.private,
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }
    } catch (err) {
        console.error('Failed to sync repositories:', err.message);
    }
}

exports.syncReposInBackground = syncReposInBackground;