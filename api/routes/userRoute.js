import express from "express";
import { getUserLinks, updateaccount, updatelinks } from "../controllers/User.js";
import { verifyToken } from "../middlewares/auth.js";
import { upload } from '../controllers/User.js'; 

// import { loginUser } from "../controllers/authUser.js";
// import { createAccount } from "../controllers/authUser.js";

const router = express.Router()

// router.put('/updateaccount',verifyToken, updateaccount)
router.post('/addlinks',verifyToken, updatelinks)
router.get('/getlinks',verifyToken, getUserLinks)
router.put('/updateaccount', verifyToken, upload.single('picture'), updateaccount);


export default router