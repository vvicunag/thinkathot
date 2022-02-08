const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');
        //.populate('thoughts');
      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
};