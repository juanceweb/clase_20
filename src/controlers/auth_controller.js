import path from "path"
import ContenedorProductos from "../models/productos_models.js"
import ContenedorCarrito from "../models/carrito_model.js";

// CHECK USER LOG IN OR NOT US
function checkUser(req) {
    const user = req.user;
    if (user === undefined ) {
        return null 
    } else {
        return user.username
    }
}


// SIGN UP

export function getSignup(req, res) {
    res.sendFile(path.resolve() + "/src/views/signup.html")
}

export function postSignup(req, res) {
    res.sendFile(path.resolve() + "/src/views/login.html")
}

export function failSignup(req, res){
    let username = checkUser(req)
    res.render("signup-error",{
            usuario: username,
        })
}

// LOGIN

export function getLogin(req, res) {
    
    if (req.isAuthenticated()) {
        const user = req.user
        res.render("index", {
            usuario: user.username,
            pid: process.pid,
            PORT: process.argv[2]
        })
    } else {
        res.sendFile(path.resolve()+"/src/views/login.html")
    }
}

export function postLogin(req, res) {
    const user = req.user;
    res.render("index", {
        usuario: user.username,
        pid: process.pid,
        PORT: process.argv[2]
    })
}

export function failLogin(req, res) {
    let username = checkUser(req)
    res.render("login-error",{
        usuario: username,
    })
}

// LOGOUT

export function logout(req, res) {
    req.logout()
    res.sendFile(path.resolve() + "/src/views/login.html")
}

// INDEX

export function getIndex(req, res) {
    let username = checkUser(req)
    res.render("index", {
        usuario: username,
        pid: process.pid,
        PORT: process.argv[2]
    })
}


// PRODUCTOS

const productos = new ContenedorProductos()

export async function getProductos(req, res) {
    const all_productos = await productos.readAllData()
    let username = checkUser(req)
    res.render("productos", {
        lista_productos : all_productos,
        usuario: username,
    })
}


export async function getOneProducto(req, res) {
    const { id } = req.params;
    const one_producto = await productos.readOneData({_id:id})
    let username = checkUser(req)
    res.render("producto_detalle", {
            producto: one_producto,
            usuario: username,
    })
}


// export async function addProducto (req, res) {
//     let producto = {nombre:"cafetera", descripcion:"descripcion cafetera", codigo: 127, foto:"foto_cafetera", precio: 300, stock: 10}
//     res.json(await productos.createData(producto))
// }

// CARRITO

export async function addElementoAlCarrito(req, res) {
    const { id } = req.params;
    const one_producto = await productos.readOneData({_id:id})
    one_producto.cantidad = 1
    let cookie = req.signedCookies.carrito
    let username = checkUser(req)
    if (cookie == undefined || cookie == false){
        cookie = []
        cookie.push(one_producto)
        res.cookie("carrito", [one_producto],  {maxAge: 3000000, signed: true }).render("carrito", {
            lista_carrito:cookie,
            usuario: username,
        })
    } else {
        cookie.push(one_producto)
        res.cookie("carrito", cookie, {maxAge: 3000000, signed: true }).render("carrito", {
            lista_carrito: cookie,
            usuario: username,
        })
    }
    
}

export async function verCarrito(req, res) {
    const cookie = req.signedCookies.carrito
    let username = checkUser(req)
    res.render("carrito", {
        lista_carrito: cookie,
        usuario:username,
    })
}

// export async function getCarrito(req, res){ 
//     const ver_carrito = await
// }