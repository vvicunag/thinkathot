const { Schema, Types } = require('mongoose');
const moment = require('moment');

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
            get: (valueToFormat) => moment(valueToFormat).format("MMM Do YY"),
        },
        username: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            getters: true,
          },
          id: false,
    }
);

module.exports = reactionSchema;