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