import express from 'express';
import passport from "../utils/passport_util.js"
import * as AuthController from "../controlers/auth_controller.js"
import * as AuthMiddleware from "../middlewares/auth_middleware.js"
import args from "../utils/minimist_util.js"
import { fork } from 'child_process'

const router = express.Router();


// SIGN UP
router.get("/signup", AuthController.getSignup)
router.post(
    "/signup", 
    passport.authenticate("signup", { failureRedirect: "/failuresignup"}), 
    AuthController.postSignup)
router.get("/failuresignup", AuthController.failSignup)

// LOGIN
router.get("/login", AuthController.getLogin)
router.post(
    "/login",
    passport.authenticate("login", {failureRedirect: "/failurelogin"}),
    AuthController.postLogin)
router.get("/failurelogin", AuthController.failLogin)

router.get("/logout", AuthController.logout)

// PROTECTED
router.get("/protected" , AuthMiddleware.checkAuthentication, (req, res) => {
    console.log("Esta autenticado");
    res.send("<h1>Esta autenticado")
})

// INFO
router.get("/info", (req, res) => {
    let version = process.version
    let sistema = process.platform
    let id = process.pid
    let rss = process.memoryUsage()
    let directorio = process.cwd()
    res.status(200).json({"Argumentos": args, "Sistema Operativo" : sistema, "Version de Node": version, "Memoria Reservada": rss.rss, "Path de Ejecucion": directorio, "Process Id ": id})

})

const computo = fork("./src/utils/forks_utils.js")

// API RANDOMIZATION
router.get("/api/randoms", (req, res) => {
    const cant = Number(req.query.cant) || 100000000

    computo.on("message", (resultado) =>{
        res.status(200).json(resultado)
    })
    computo.send(cant)
})

export default router