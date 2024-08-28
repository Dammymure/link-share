import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js";


export const createAccount = async (req, res) => {
    try {
     const {
      email,
      password,
     } = req.body;
   
     // Check if a user already exists using the email
     const existingUser = await User.findOne({ email });
   
     // If user exists, give an error message
     if (existingUser) {
      return res.status(403).json({ msg: 'User already exists', existingUser });
     }
   
     // Hash the password
     const salt = await bcrypt.genSalt();
     const passwordHash = await bcrypt.hash(password, salt);
   
     // Create a new user
     const newUser = await User.create({
      email,
      password: passwordHash,
     });
     await newUser.save();
   
     res.status(201).json(newUser);
    } catch (err) {
     res.status(500).json({ error: err.message });
    }
   };

export const loginUser = async (req, res) => {
    try {
     const { email, password } = req.body
     // Checking if the user exists
     const user = await User.findOne({ email: email })
     if (!user) return res.status(400).json({ msg: "User does not exist" })
     // then check user password for match
     const isMatch = await bcrypt.compare(password, user.password)
     if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })
     // JWT SIGNING
     const token = jwt.sign({ id: user._id, type: "user" }, process.env.JWT_SECRET)
     delete user.password
     res.status(200).json({ token, user })
   
    } catch (err) {
     res.status(500).json({ error: err.message })
    }
   }