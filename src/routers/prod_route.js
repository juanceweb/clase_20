import express from 'express';
import * as ProdController from "../controlers/prod_controller.js"


const ProdRouter = express.Router();

//######################################################
//                  URL INDEX
//######################################################
ProdRouter.get("/", ProdController.getIndex)

// router.get("/productos/add", AuthController.addProducto)

//######################################################
//             URL VER TODOS LOS PRODUCTOS
//######################################################
ProdRouter.get("/productos", ProdController.getProductos)


//######################################################
//              URL VER DETALLE 1 PRODUCTO
//######################################################
ProdRouter.get("/productos/:id", ProdController.getOneProducto)




export default ProdRouter



