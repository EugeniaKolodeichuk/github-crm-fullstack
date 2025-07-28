const Repository = require('../models/Repository');

exports.getAllRepositories = async (req, res) => {
    const repositories = await Repository.find({ user: req.userId });
    res.json(repositories);
};

exports.createRepository = async (req, res) => {
    const repository = await Repository.create({ ...req.body, user: req.userId });
    res.status(201).json(repository);
};

exports.updateRepository = async (req, res) => {
    const repository = await Repository.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        req.body,
        { new: true }
    );
    res.json(repository);
};

exports.deleteRepository = async (req, res) => {
    await Repository.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ msg: 'Repository deleted' });
};
