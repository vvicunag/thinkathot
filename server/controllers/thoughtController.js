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

      async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
          ).select('-__v');
          if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
          } else {
            res.json(thought);
          }
        }
        catch (error) {
          console.log(error);
          res.status(500).json('Failed to update thought');
        }
      },

      async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId })
          if(!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
          }
          else {
            const user = await User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            );
            if (!user) {
              res.status(404).json({ message: 'Thought deleted but no user associated' });
            } else {
              res.json({ message: 'Thought successfully deleted!' });
            }
          }
        }
        catch (error) {
          console.log(error);
          res.status(500).json('Failed to delete thought');
        }
      },

      async addReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
          );
          if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
          } else {
            res.json(thought);
          }
        }
        catch (error) {
          console.log(error);
          res.status(500).json('Failed at adding the reaction');
        }
      },
    
      async removeReaction(req, res) {
        try {
          const thought = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId } },
            { new: true }
          );
          if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
          } else {
            res.json(thought);
          }
        }
        catch (error) {
          console.log(error);
          res.status(500).json('Failed at removing the reaction');
        }
      }
}