import express from 'express';
import passport from "../utils/passport_util.js"
import * as AuthController from "../controlers/auth_controller.js"
import * as AuthMiddleware from "../middlewares/auth_middleware.js"
import args from "../utils/minimist_util.js"
// import { fork } from 'child_process'
import os from 'os'

// function  calculo(cant) {
//     const vueltas = Array.from(Array(cant).keys())
//     const lista = {}

//     for (const number of vueltas) {
//         const random = Math.floor(Math.random() * 1000) + 1
//         if (random in lista) {
//             lista[random] += 1
//         } 
//         else {
//         lista[random] = 1
//         }
//     }
//     return lista
// }


const router = express.Router();

// INDEX
router.get("/", AuthController.getIndex)

// PRODUCTOS
// router.get("/productos/add", AuthController.addProducto)

router.get("/productos", AuthController.getProductos)

router.get("/productos/:id", AuthController.getOneProducto)

// CARRITO

router.get("/carrito", AuthController.verCarrito)

router.get("/carrito/confirmar", AuthController.confirmarCarrito)

router.get("/carrito/vaciar", AuthController.vaciarCarrito)

router.get("/carrito/:id", AuthController.addElementoAlCarrito)



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
    res.send("<h1>Esta autenticado</h1>")
})

// INFO
router.get("/info", (req, res) => {
    let version = process.version
    let sistema = process.platform
    let id = process.pid
    let rss = process.memoryUsage()
    let directorio = process.cwd()
    let cpus = os.cpus().length
    res.status(200).json({"Argumentos": args, "Sistema Operativo" : sistema, "Version de Node": version, "Memoria Reservada": rss.rss, "Path de Ejecucion": directorio, "Process Id ": id, "CPUS": cpus})

})

// const computo = fork("./src/utils/forks_utils.js", [])

// API RANDOMIZATION
// router.get("/api/randoms", (req, res) => {
//     const cant = Number(req.query.cant) || 1000000

//     const result = calculo(cant)
//     const id = process.pid
//     const port = process.argv[2]

//     res.status(200).json({"PORT": port, "Process Id": id, "Resultados" : result})
//     // computo.on("message", (resultado) =>{
//     //     if (resultado) {
//     //         res.status(200).send(resultado)
//     //     }
//     //     else {
//     //         console.log("wololo")
//     //     }
//     // })

//     // computo.send(cant)
// })


export default router