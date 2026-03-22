import express from "express";
import { login,register,updateProfile,logout } from "../controller/user.contoller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { SingleUpload } from "../middleware/multer.js";

const router = express.Router();



router.post("/register",SingleUpload, register);
router.post("/login", login);
router.post("/profile/update",SingleUpload,isAuthenticated, updateProfile);
router.get("/logout", logout);


export default router;