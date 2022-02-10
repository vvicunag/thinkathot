const {User, Thought, } = require('../models')

module.exports = {
    async getThoughts(req, res) {
        try {
          const thoughts = await Thought.find();
          res.json(thoughts);
        } catch (error) {
          console.log(error);
          res.status(500).json(error);
        }
      },
      async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId });
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
          } else {
            res.json(thought);
          }
        } catch (error) {
          console.log(error);
          res.status(500).json(error);
        }
      },
    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          );
          if (!user) {
            res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            });
          } else {
            res.json('Created the thought');
          }
        } catch (error) {
          console.log(error);
          res.status(500).json(error);
        }
      },
}