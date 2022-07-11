import ServiceCarritos from "../services/carrito_service.js";
import sendMailGmail from "../utils/nodemailer_util.js"
import {productos} from "./prod_controller.js"

// ######################################################
function checkUsername(req) {
    const user = req.user;
    if (user === undefined ) {
        return null 
    } else {
        return user.username
    }
}

function checkEmail(req) {
    const user = req.user;
    if (user === undefined ) {
        return null 
    } else {
        return user.email
    }
}
// ######################################################





//######################################################
//                  INSTANCIA DE CARRITO
//######################################################
export const carrito = new ServiceCarritos()


//######################################################
//          RENDER AGREGAR ELEMENTO AL CARRITO
//######################################################
export async function addElementoAlCarrito(req, res) {
    await productos.open()
    const { id } = req.params;
    const producto_a_agregar = await productos.readOneData({_id:id})
    await productos.exit()
    producto_a_agregar.cantidad = 1
    let cookie = req.signedCookies.carrito
    let username = checkUsername(req)
    if (cookie == undefined || cookie == false){
        cookie = []
        cookie.push(producto_a_agregar)
        res.cookie("carrito", [producto_a_agregar],  {maxAge: 3000000, signed: true }).render("carrito", {
            lista_carrito:cookie,
            usuario: username,
        })
    } else {
        cookie.push(producto_a_agregar)
        res.cookie("carrito", cookie, {maxAge: 3000000, signed: true }).render("carrito", {
            lista_carrito: cookie,
            usuario: username,
        })
    }
    
}


//######################################################
//                 RENDER VER CARRITO
//######################################################
export function verCarrito(req, res) {
    const cookie = req.signedCookies.carrito
    let username = checkUsername(req)
    res.render("carrito", {
        lista_carrito: cookie,
        usuario:username,
    })
}


//######################################################
//             RENDER GUARDAR CARRITO EN BD
//######################################################
export async function confirmarCarrito(req, res) {
    const cookie = req.signedCookies.carrito
    const total = cookie.reduce( (acc, item) => {
        return acc += item.precio;
    }, 0);
    const username = checkUsername(req)    
    const email = checkEmail(req)
    const cart = {productos: cookie, total: total, nombre_comprador: username, mail: email}
    
    await carrito.open()
    await carrito.createData(cart)
    await carrito.exit()

    sendMailGmail("nuevo pedido", JSON.stringify(cart))
    res.clearCookie("carrito").render("index", {
        usuario: username,
        pid: process.pid,
        PORT: process.argv[2]
    })
    
}


//######################################################
//               RENDER VACIAR CARRITO
//######################################################
export function vaciarCarrito(req, res) {
    let username = checkUsername(req)
    res.clearCookie("carrito").render("carrito", {
        lista_carrito: [],
        usuario:username,
    })
}

