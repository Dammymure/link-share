import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({ storage: storage });

export const updateaccount = async (req, res) => {
    try {
        const user = req.user;

        // Build the updates object dynamically
        const updates = {};
        if (req.body.firstname) updates.firstname = req.body.firstname;
        if (req.body.lastname) updates.lastname = req.body.lastname;
        if (req.body.email) updates.email = req.body.email;
        if (req.file) updates.picture = req.file.filename;

        // Only update if there's something to update
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ msg: "No updates provided" });
        }

        const editUser = await User.findOneAndUpdate({ _id: user.id }, updates, { new: true });

        res.status(200).json({ msg: "Record Successfully Updated", editUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updatelinks = async (req, res) => {
    const user = req.user;
    const newLinks = req.body;

    try {
        if (!Array.isArray(newLinks)) {
            return res.status(400).json({ message: "New links must be an array" });
        }

        const findUser = await User.findById(user.id);
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        findUser.links = [...findUser.links, ...newLinks]; // Add the new links to existing links

        await findUser.save();
        res.status(200).json({ msg: "Record Successfully Updated", findUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getUserLinks = async (req, res) => {
    const user = req.user;

    try {
        const findUser = await User.findById(user.id);
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Directly return the links array
        const userLinks = findUser.links;

        res.status(200).json({ links: userLinks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



