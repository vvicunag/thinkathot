const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String, 
            required: true, 
            minlength: 1,
            maxlength: 280 
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter method to format timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            // Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
            virtuals: true,
          },
          id: false,
    }
);

const schema = new Schema(thoughtSchema);

const Thought = model("thought", schema);

module.exports = Thought;