const { response } = require('express');
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

  // delete user
  async deleteUser(req, res) {
    try {
      const result = await User.findOneAndDelete({  _id: req.params.userId });
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong, could not delete user' });
    }
  },

  async updateUser(req, res) {
    try {
      const userId = req.params.userId;
      updated = await User.findByIdAndUpdate(userId,
        {username: req.body.username, email: req.body.email},
        {new: true},
      );
      res.status(200).json(updated);
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Something went wrong, could not update user' });
    };
  }
};