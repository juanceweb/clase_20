import path from "path"
import ContenedorProductos from "../models/productos_models.js"
import ContenedorCarrito from "../models/carrito_model.js";

// SIGN UP

export function getSignup(req, res) {
    res.sendFile(path.resolve() + "/src/views/signup.html")
}

export function postSignup(req, res) {
    const user = req.user;
    console.log(user);
    res.sendFile(path.resolve() + "/src/views/login.html")
}

export function failSignup(req, res){
    console.log('Error en el registro');
    res.render("signup-error",{})
    
}

// LOGIN

export function getLogin(req, res) {
    
    if (req.isAuthenticated()) {
        const user = req.user
        console.log("Usuario logueado!");
        res.render("index", {
            usuario: user.username,
            nombre: user.firstName,
            apellido: user.lastName,
            email: user.email
        })
    } else {
        console.log('Usuario no logueado');
        res.sendFile(path.resolve()+"/src/views/login.html")
    }
}

export function postLogin(req, res) {
    const user = req.user;
    console.log(user);
    res.sendFile(path.resolve()+"/src/views/index.html")
}

export function failLogin(req, res) {
    console.log('Error en el logueo');
    res.render("login-error",{})
}

// LOGOUT

export function logout(req, res) {
    console.log("logout")
    req.logout()
    res.sendFile(path.resolve() + "/src/views/login.html")
}

// INDEX

export function getIndex(req, res) {
    res.status(200).render("index", {
        pid: process.pid,
        PORT: process.argv[2]
    })
}

// PRODUCTOS

const productos = new ContenedorProductos()

export async function getProductos(req, res) {
    const all_productos = await productos.readAllData()
    res.render("productos", {lista_productos : all_productos})
}

export async function GetOneProducto(req, res) {
    const { id } = req.params;
    const one_producto = await productos.readOneData({_id:id})
    res.render("producto_detalle", {producto: one_producto})
}

export async function addProducto (req, res) {
    let producto = {nombre:"afeitadora", descripcion:"descripcion afeitadora", codigo: 126, foto:"foto_afeitadora", precio: 250, stock: 10}
    res.json(await productos.createData(producto))
}

// CARRITO

const carrito = new ContenedorCarrito()

export async function AddCarrito(req, res) {
    const { id } = req.params;
    const one_producto = await productos.readOneData({_id:id})
    carrito.add_carrito(one_producto)
    const cart = carrito.ver_carrito()
    res.render("carrito", {lista_carrito: cart})
}

export async function VerCarrito(req, res) {
    const cart = carrito.ver_carrito()
    res.render("carrito", {lista_carrito: cart})
}

// export async function getCarrito(req, res){ 
//     const ver_carrito = await
// }