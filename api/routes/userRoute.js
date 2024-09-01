import express from "express";
import { getUser, getUserLinks, updateaccount, updatelinks } from "../controllers/User.js";
import { verifyToken } from "../middlewares/auth.js";
import { upload } from '../controllers/User.js'; 

// import { loginUser } from "../controllers/authUser.js";
// import { createAccount } from "../controllers/authUser.js";

const router = express.Router()

// router.put('/updateaccount',verifyToken, updateaccount)
router.post('/addlinks',verifyToken, updatelinks)
router.get('/getlinks',verifyToken, getUserLinks)
router.get('/user',verifyToken, getUser)
router.put('/updateaccount', verifyToken, upload.single('picture'), updateaccount);


export default router