const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1,
            maxlength: 280 
        },
        createdAt: {
            type: Date,
            //default: //current timestamp,
            //getter method to format timestamp on query
        },
        username: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought",
            }
        ],
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            // Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
            virtuals: true,
          },
          id: false,
    }
);

const schema = new Schema(userSchema);

schema.pre("save", convertToLowercase);

const User = model("User", schema);

// seed users to test database
const seed = async () => {
    try {
      const collection = await User.find({});
  
      if (collection.length === 0) {
        await User.insertMany([
          { username: 'Pedro', email: 'pedro@gmail.com' },
          { username: 'Juan', email: 'juan@gmail.com' },
          { username: 'Diego', email: 'diego@gmail.com' },
        ]);
      }
      console.log('Already populated');
    } catch (error) {
      console.log('Error while seeding the data: ', error);
    }
  };

seed();

module.exports = User;