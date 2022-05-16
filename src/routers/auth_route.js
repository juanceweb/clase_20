import express from 'express';
import passport from "../utils/passport_util.js"
import * as AuthController from "../controlers/auth_controller.js"
import * as AuthMiddleware from "../middlewares/auth_middleware.js"

const router = express.Router();

router.get("/signup", AuthController.getSignup)
router.post(
    "/signup", 
    passport.authenticate("signup", { failureRedirect: "/failuresignup"}), 
    AuthController.postSignup)
router.get("/failuresignup", AuthController.failSignup)

router.get("/login", AuthController.getLogin)
router.post(
    "/login",
    passport.authenticate("login", {failureRedirect: "/failurelogin"}),
    AuthController.postLogin)
router.get("/failurelogin", AuthController.failLogin)

router.get("/logout", AuthController.logout)

router.get("/protected" , AuthMiddleware.checkAuthentication, (req, res) => {
    console.log("Esta autenticado");
    res.send("<h1>Esta autenticado")
})

export default router