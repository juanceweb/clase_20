import express from 'express'
import path from "path"
import {engine} from "express-handlebars"
import cookieParser from 'cookie-parser';
import session from "express-session"
import UserRouter from "./routers/user_route.js"
import ProdRouter from "./routers/prod_route.js"
import CartRouter from "./routers/cart_route.js"
import passport from "./utils/passport_util.js"
import compression from 'compression'
//import args from "./utils/minimist_util.js"
import logger from "./loggers/winston.js"




//######################################################
//             URL VER TODOS LOS PRODUCTOS
//######################################################

// CONFIGURACION DE LA APP
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(process.env.SECRET))
app.use(compression())

//######################################################
//             URL VER TODOS LOS PRODUCTOS
//######################################################
// CONFIGURACION DE HBS
app.set("views", "./src/views")
app.set("view engine", "hbs")

//######################################################
//             URL VER TODOS LOS PRODUCTOS
//######################################################
// CONFIGURACION DE DONDE BUSCA LOS HTML
app.engine("hbs", 
    engine({
        extended: ".hbs",
        defaultLayout: "main.hbs", 
        layoutsDir: path.resolve() + "/src/views/layouts"
}),)

//######################################################
//             URL VER TODOS LOS PRODUCTOS
//######################################################
// CONFIGURACION DE SESSION
app.use(
    session({
        secret: process.env.SECRET,
        cookie: {
            maxAge: Number(process.env.EXPIRE),
        },
        rolling: true,
        resave: true,
        saveUninitialized: true,
}),)

//######################################################
//             URL VER TODOS LOS PRODUCTOS
//######################################################
// CONFIGURACION DE PASSPORT
app.use(passport.initialize())
app.use(passport.session())
app.use("/", ProdRouter)
app.use("/usuario", UserRouter)
app.use("/carrito", CartRouter)


// app.all("*",(req, res) =>{
//     console.log("No existe esta ruta");
// })

//######################################################
//             URL VER TODOS LOS PRODUCTOS
//######################################################
// CONFIGURACION DE SERVER
const server = app.listen(process.env.PORT, () => {
logger.log("info",`Servidor en el puerto http://localhost:${process.env.PORT} - PID ${process.pid}`)
});
server.on('error', (err) =>{logger.log("error", err)});