import mongoose from "mongoose";

export const SchemaUsuarios = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
},{timestamps:true})

const ModelUsuarios = mongoose.model("usuarios", SchemaUsuarios)

export default ModelUsuarios