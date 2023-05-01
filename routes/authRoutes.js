import express from "express";
import {register , loginControllers} from "../controllers/authControllres.js"

const router = express.Router();


router.post('/register', register);
router.post('/login', loginControllers);
export default router;