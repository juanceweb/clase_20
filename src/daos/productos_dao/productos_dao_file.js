import * as fs from 'fs';
import ProductosDao from "./productos_dao.js"

export default class ProductosDaoFile extends ProductosDao {

    constructor() {
        super()
        this.productos = []
        this.maxId = 0
        this.archivo = "./src/archivos/productos.txt"
    }

    async createData(data) {
        try {
            await this.readAllData()
            this.maxId++
            producto._id = this.maxId
            this.productos.push(producto)
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.productos))
            return producto
        }
        catch (error){
            throw new Error(error)
        }
    }

    async readAllData() {
        try {
            const productos = JSON.parse( await fs.promises.readFile(this.archivo, "utf-8"))
            this.productos = productos
            this.productos.map((producto) => {
                if (producto._id && this.maxId < producto._id)
                this.maxId = producto._id
            })
            return this.productos
        } 
        catch(error) {
            throw new Error(error)
        }
    }

    async readOneData(data) {
        try {
            const resultado = await this.readAllData()
            const found = resultado.find(element => element._id == data._id)
            if (found == undefined) {
                return {error: "producto no encontrado"}
            }
            else{
                return found
            }
        }
        catch (error){
            throw new Error(error)
        }
    }

    async deleteOneData(data) {
        try {
            const resultado = await this.readAllData()
            const found = resultado.find(element => element._id == data._id)
            if (found == undefined) {
                return null
            }
            else{
                const new_array = resultado.filter(element => element._id != found._id)
                try {
                    await fs.promises.writeFile(this.archivo, JSON.stringify(new_array))
                    return "producto borrado!"
                }
                catch (error){
                    throw new Error(error)
                }
            }
        }
        catch (error){
            throw new Error(error)
        }
    }


    async  updateOneData(data, new_data) {
        try {

            const resultado = await this.readAllData()
            
            this.productos = []
            
            const found = resultado.find(element => element._id == data._id)

            if (found == undefined) {
                return {error: "producto no encontrado"}
            }
            else{
                found = new_data
                this.productos = resultado
                try {
                    await fs.promises.writeFile(this.archivo, JSON.stringify(this.productos))
                    return this.productos
                }
                catch (error){
                    throw new Error(error)
                }
            }
        }
        catch (error){
            throw new Error(error)
        }
    }

    async open(){
        console.log('File no necesita open');
        
    }

    async exit(){
        console.log('File no necesita exit');
    }    

}