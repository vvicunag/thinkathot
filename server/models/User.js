const { Schema, model } = require('mongoose');
const { validateEmail } = require("../utils");

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
                ref: "Thought",
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
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

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const schema = new Schema(userSchema);

// converts email into lower case before saving
schema.pre("save", function (next) {
  this.email = this.email.toLowerCase();
  next();
});

// clientSchema.pre('remove', function(next) {
//   // 'this' is the client being removed. Provide callbacks here if you want
//   // to be notified of the calls' result.
//   Sweepstakes.remove({client_id: this._id}).exec();
//   Submission.remove({client_id: this._id}).exec();
//   next();
// });

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