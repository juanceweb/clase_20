import dotenv from "dotenv";
import mongoose from "mongoose";
import ConexionMemoria from "./dbMemoria.js";
// import { connect } from "moongose/routes";

dotenv.config()

export default class ConexionMongo {
    static instance;

    constructor() {
        if (!ConexionMongo.instance) {
            ConexionMongo.instance = this;
            this.hora = new Date().toLocaleString()
            this.client = mongoose;
            this.connected = false
            console.log("Instancia Creada");
        }
        else {
            console.log("Instancia Existente");
            return ConexionMongo.instance
        }
    }

    async connect() {
        try {
            await this.client.connect(process.env.MONGO_URI)
            this.connected = true;
            console.log('Mongo: ', this.connected)
        } catch (error) {
            console.log("Error al Conectarse a Mongo: " + error)
        }
    }

    async disconnect() {
        try {
            await mongoose.connection.close()
            this.connected = false
            console.log('Mongo: ', this.connected)
        } catch (error) {
            console.log("Error al Desconectarse de Mongo: " + error)
        }
    }

    obtenerHora() {
        return this.hora
    }

}
