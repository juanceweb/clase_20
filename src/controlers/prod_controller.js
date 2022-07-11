import ServiceProductos from "../services/productos_service.js"

// ######################################################
function checkUsername(req) {
    const user = req.user;
    if (user === undefined ) {
        return null 
    } else {
        return user.username
    }
}

//######################################################





//######################################################
//                  INSTANCIA DE PRODUCTOS
//######################################################
export const productos = new ServiceProductos()


//######################################################
//               RENDER PAGINA DE INDEX
//######################################################
export function getIndex(req, res) {
    let username = checkUsername(req)
    res.render("index", {
        usuario: username,
        pid: process.pid,
        PORT: process.argv[2]
    })
}


//######################################################
//             RENDER LISTADO DE PRODUCTOS
//######################################################
export async function getProductos(req, res) {
    await productos.open()
    const all_productos = await productos.readAllData()
    await productos.exit()
    let username = checkUsername(req)
    res.render("productos", {
        lista_productos : all_productos,
        usuario: username,
    })
}


//######################################################
//              RENDER DETALLE DE 1 PRODUCTO
//######################################################
export async function getOneProducto(req, res) {
    await productos.open()
    const { id } = req.params;
    const producto_detalle = await productos.readOneData({_id:id})
    await productos.exit()
    let username = checkUsername(req)
    res.render("producto_detalle", {
            producto: producto_detalle,
            usuario: username,
    })
}

