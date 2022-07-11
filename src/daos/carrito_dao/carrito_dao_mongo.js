import ModelCarritos from "../../models/carrito_model.js"
import ConexionMongo from "../../config/dbMongo.js"
import CarritoDao from "./carrito_dao.js"

export default class ServiceDaoMongo extends CarritoDao {

    constructor() {
        super()
        this.client = new ConexionMongo()
        this.model = ModelCarritos
    }

    async createData(data) {
        try {
            const response = await this.model.create(data)
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async open(){
        return await this.client.connect()
    }

    async exit(){
        return await this.client.disconnect()
    }  
}