import express from "express";
import {
    fetchLeaderboard,
    getUserProfile,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router =express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",isAuthenticated,logoutUser);
router.get("/me",isAuthenticated,getUserProfile);
router.get("/leaderboard",fetchLeaderboard);

export default router;
