const { Schema, model } = require('mongoose');
const { convertToLowercase, validateEmail } = require("../utils");

const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true, 
            unique: true, 
            trim: true, 
        },
        email: {
            type: String,
            unique: true,
            validate: [validateEmail, "This is not a valid email address!"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought",
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
          },
          id: false,
    }
);

const schema = new Schema(userSchema);

schema.pre("save", convertToLowercase);

const User = model("user", schema);

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


// TODO: Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
// userSchema
//   .virtual('fullName')
//   // Getter
//   .get(function () {
//     return `${this.first} ${this.last}`;
//   })
//   // Setter to set the first and last name
//   .set(function (v) {
//     const first = v.split(' ')[0];
//     const last = v.split(' ')[1];
//     this.set({ first, last });
//   });

// // Create a virtual property `upvoteCount` that gets the amount of comments per user
// postSchema
//   .virtual('upvoteCount')
//   // Getter
//   .get(function () {
//     return this.meta.upvotes;
//   });
