import express from 'express'
import path from "path"
import {engine} from "express-handlebars"
import session from "express-session"
import "./config/db.js"
import AuthRouter from "./routers/auth_route.js"



const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set("views", "./src/views")
app.set("view engine", "hbs")
app.engine("hbs", engine({
    extended: ".hbs",
    defaulLayout: "main.hbs", 
    layoutsDir: path.resolve() + "/src/views/layouts"
}))

app.use(session({
    secret:process.env.SECRET,
    cookie: {
        maxAge: Number(process.env.EXPIRE),
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
}),)

app.use("/", AuthRouter)

const PORT = process.env.PORT || 8000
const server = app.listen(PORT, () => {
console.log(`Servidor en el puerto http://localhost:${PORT}`)
});
server.on('error', (err) =>{console.log(err)});