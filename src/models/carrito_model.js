import mongoose from "mongoose";

const SchemaProductosCarrito = new mongoose.Schema({
    nombre: {type: String, required : true,  max: 50},
    codigo: {type: Number, required : true},
    precio: {type: Number, required : true},
    cantidad: {type: Number, required : true}
})

export const SchemaCarrito = new mongoose.Schema({
    productos: {type: [SchemaProductosCarrito], default: undefined, required: true},
    total: {type: Number, required: true},
    nombre_comprador: {type: String, max: 50},
    mail: {type: String, max:50}
},{timestamps:true})

const ModelCarritos = mongoose.model("carrito", SchemaCarrito)

export default ModelCarritos