import ModelProductos from "../../models/productos_models.js"
import ConexionMongo from "../../config/dbMongo.js"
import ProductosDao from "./productos_dao.js"

export default class ProductosDaoMongo extends ProductosDao {

    constructor() {
        super()
        this.client = new ConexionMongo()
        this.model = ModelProductos
    }

    async createData(data) {
        try {
            const response = await this.model.create(data)
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async readAllData() {
        try {
            const response = await this.model.find().lean()
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async readOneData(data) {
        try {
            const response = await this.model.findOne(data,{__v: 0}).lean()
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async deleteOneData(data) {
        try {
            const response = await this.model.deleteOne(data)
            return response
        } catch (error) {
            console.log(error);
        }
    }


    async  updateOneData(data, new_data) {
        try {
            const response = await this.model.updateOne(data,new_data)
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