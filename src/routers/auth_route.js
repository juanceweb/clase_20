import express from 'express';
import passport from '../utils/passport_utils.js';
import * as AuthController from "../controlers/auth_controller.js"

const router = express.Router();

router.get("/signup", AuthController.getSignup)
router.post("/signup", passport.authenticate("signup", { failureRedirect: "/failsignup"}), AuthController.postSignup);
router.get("/failsignup", AuthController.failSignup)

router.get("/login", AuthController.getLogin)
router.post("/login", passport.authenticate("login", {failureRedirect: "/faillogin"}), AuthController.postLogin)
router.get("/faillogin", AuthController.failLogin)

export default router