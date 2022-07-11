import express from 'express';
import * as CartController from "../controlers/cart_controller.js"



const CartRouter = express.Router();

//######################################################
//                 URL VER CARRITO
//######################################################
CartRouter.get("/", CartController.verCarrito)


//######################################################
//              URL CARGAR CARRITO EN BD
//######################################################
CartRouter.get("/confirmar", CartController.confirmarCarrito)


//######################################################
//                URL VACIAR CARRITO
//######################################################
CartRouter.get("/vaciar", CartController.vaciarCarrito)


//######################################################
//            URL AGREGAR PRODUCTO AL CARRITO
//######################################################
CartRouter.get("/:id", CartController.addElementoAlCarrito)



export default CartRouter



