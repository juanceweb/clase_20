import ProductosDaoFactory from "../daos/productos_dao/productos_dao_factory.js";


export default class ServiceProductos {

    constructor() {
        this.model = ProductosDaoFactory.getDao()
    }

    async createData(data) {
        try {
            const response = await this.model.createData(data)
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async readAllData() {
        try {
            const response = await this.model.readAllData()
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async readOneData(data) {
        try {
            const response = await this.model.readOneData(data)
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
        return await this.model.open()
    }

    async exit(){
        return await this.model.exit()
    }    

}
