import path from "path"
import ServiceUsuarios from "../services/user_service.js";
import sendMailGmail from "../utils/nodemailer_util.js"


function checkUsername(req) {
    const user = req.user;
    if (user === undefined ) {
        return null 
    } else {
        return user.username
    }
}
// ######################################################



//######################################################
//             RENDER PAGINA REGISTRO USUARIO  
//######################################################
export function getSignup(req, res) {
    let username = checkUsername(req)
    res.render("signup", {
        usuario: username
    })
}


//######################################################
//     RENDER POST LOGIN DESPUES DE REGISTRO EXITOSO  
//######################################################
export function postSignup(req, res) {
    let mail = `Hubo un nuevo registro!
                Usuario: ${req.user.username}
                Nombre: ${req.user.firstName}
                Apellido: ${req.user.lastName}
                Email: ${req.user.email}`
    sendMailGmail("nuevo registro", mail)
    let username = checkUsername(req)
    res.render("login", {
        usuario: username
    })
}


//######################################################
//     RENDER POST LOGIN DESPUES DE REGISTRO FALLIDO  
//######################################################
export function failSignup(req, res){
    let username = checkUsername(req)
    res.render("signup-error",{
            usuario: username,
        })
}


//######################################################
//              RENDER PAGINA DE LOGIN  
//######################################################
export function getLogin(req, res) {
    if (req.isAuthenticated()) {
        const user = req.user
        res.render("index", {
            usuario: user.username,
            pid: process.pid,
            PORT: process.argv[2]
        })
    } else {
        let username = checkUsername(req)
        res.render("login", {
            usuario: username
        })
    }
}


//######################################################
//     RENDER POST DESPUES DE LOGIN EXITOSO  
//######################################################
export function postLogin(req, res) {
    const user = req.user;
    res.render("index", {
        usuario: user.username,
        pid: process.pid,
        PORT: process.argv[2]
    })
}


//######################################################
//     RENDER POST LOGIN DESPUES DE LOGIN FALLIDO  
//######################################################
export function failLogin(req, res) {
    let username = checkUsername(req)
    res.render("login-error",{
        usuario: username,
    })
}


//######################################################
//              RENDER PAGINA DE LOGOUT  
//######################################################
export function logout(req, res) {
    req.logout()
    let username = checkUsername(req)
    res.render("index", {
        usuario: username,
        pid: process.pid,
        PORT: process.argv[2]
    })
}