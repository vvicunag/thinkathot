const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
          },
        reactionBody: {
            type: String, 
            required: true, 
            minlength: 1,
            maxlength: 280 
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: getMyTime
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
            getters: true,
          },
          id: false,
    }
);

module.exports = reactionSchema;