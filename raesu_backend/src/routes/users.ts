import express from "express";
import * as UserController from "../controllers/users";
import { validateAuth } from "../middleware/auth";

const router = express.Router();

router.post("/signup", UserController.signUp);

router.post("/login", UserController.logIn);

router.get("/", validateAuth, UserController.retrieveUserDetails);

router.post("/logout", UserController.logout);

export default router;
