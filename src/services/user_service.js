import ModelUsuarios from "../models/user_model.js"
import ConexionMongo from "../config/dbMongo.js"

export default class ServiceUsuarios {

    constructor() {
        this.client = new ConexionMongo()
        this.model = ModelUsuarios
    }

    async open(){
        return await this.client.connect()
    }

    async exit(){
        return await this.client.disconnect()
    }   
}