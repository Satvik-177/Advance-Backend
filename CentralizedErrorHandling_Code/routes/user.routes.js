// routes/user.routes.js
import express from "express";
import { getUser } from "../controllers/user.controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get("/user", asyncHandler(getUser));

export default router;