import * as fs from 'fs';
import CarritoDao from "./carrito_dao.js"

export default class ServiceDaoFile extends CarritoDao {

    constructor() {
        super()
        this.carritos = []
        this.maxId = 0
        this.archivo = "./src/archivos/carritos.txt"

    }

    async createData(data) {
        try {
            const carritos = JSON.parse( await fs.promises.readFile(this.archivo, "utf-8"))
            this.carritos = carritos
            this.carritos.map((elem) => {
                if (elem.id && this.maxId < elem.id) {
                    this.maxId = elem.id
                }
            })
            this.maxId++
            data.id = this.maxId
            this.carritos.push(data)
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.carritos))
            return carritos

        } 
        catch(error) {
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