import mongoose from "mongoose";

export const SchemaProductos = new mongoose.Schema({
    nombre: {type: String, required : true, max: 50},
    descripcion: {type: String, required : true, max: 100},
    codigo: {type: Number, required : true},
    foto: {type: String, max: 100},
    precio: {type: Number, required : true},
    stock: {type: Number, required : true}
})

const ModelProductos = mongoose.model("productos", SchemaProductos)

export default ModelProductos

