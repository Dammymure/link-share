import express from "express";
import { loginUser } from "../controllers/authUser.js";
import { createAccount } from "../controllers/authUser.js";

const router = express.Router()

router.post('/creataccount', createAccount)
router.post('/loginuser', loginUser)

export default router