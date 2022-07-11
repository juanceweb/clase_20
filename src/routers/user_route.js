import express from 'express';
import passport from "../utils/passport_util.js"
import * as UserController from "../controlers/user_controller.js"


const UserRouter = express.Router();


//######################################################
//             URL PARA REGISTRO DE USUARIO
//######################################################
UserRouter.get("/signup", UserController.getSignup)


//######################################################
//              URL POST REGISTRO EXITOSO
//######################################################
UserRouter.post("/signup", passport.authenticate("signup", { failureRedirect: "/failuresignup"}), UserController.postSignup)


//######################################################
//                 URL REGISTRO FALLIDO
//######################################################
UserRouter.get("/failuresignup", UserController.failSignup)



//######################################################
//             URL PARA LOGIN DE USUARIO
//######################################################
UserRouter.get("/login", UserController.getLogin)


//######################################################
//              URL POST LOGEO EXITOSO
//######################################################
UserRouter.post("/login", passport.authenticate("login", {failureRedirect: "/failurelogin"}), UserController.postLogin)


//######################################################
//                  URL LOGEO FALLIDO
//######################################################
UserRouter.get("/failurelogin", UserController.failLogin)


//######################################################
//                     URL LOGOUT
//######################################################
UserRouter.get("/logout", UserController.logout)


export default UserRouter








// PROTECTED
// router.get("/protected" , AuthMiddleware.checkAuthentication, (req, res) => {
//     console.log("Esta autenticado");
//     res.send("<h1>Esta autenticado</h1>")
// })
