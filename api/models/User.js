import { Schema, model } from 'mongoose';

// Define the schema for links
// const LinkSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   url: { type: String, required: true }
// });

// Define the schema for the User
const UserSchema = new Schema({
  firstname: { type: String},
  lastname: { type: String},
  picture: { type: String },  // URL to the picture
  links: [],  // Array of link objects
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create the model from the schema
const User = model('User', UserSchema);

export default User;
