import mongoose from "mongoose";

const SchemaProducto = new mongoose.Schema({
    nombre: {
        type: String,
        required : true,
        max: 50
    },
    codigo: {
        type: Number,
        required : true
    },
    precio: {
        type: Number,
        required : true
    },
    cantidad: {
        type: Number,
        required : true
    }
})

const Schema = new mongoose.Schema({
    productos: {
        type: [SchemaProducto],
        default: undefined,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    nombre_comprador: {
        type: String,
        max: 50
    },
    mail: {
        type: String,
        max:50
    }
},{  timestamps:true
})

class ContenedorCarrito {

    constructor() {
        this.model = mongoose.model("carrito", Schema)
    }

    async createData(data) {
        try {
            const response = await this.model.create(data)
            return response
        } catch (error) {
            console.log(error);
        }
    }
}

export default ContenedorCarrito


// class ContenedorCarrito {

//     constructor() {
//         this.model = mongoose.model("carrito", Schema)
//         createCarrito()
//     }

//     // async createData(data) {
//     //     try {
//     //         const response = await this.model.create(data)
//     //         return response
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // }

//     async readAllData() {
//         try {
//             const response = await this.model.find().lean()
//             return response
//         } catch (error) {
//             console.log(error);
//         }
//     }

    // async readOneData(data) {
    //     try {
    //         const response = await this.model.findOne(data,{_id: 0, __v: 0}).lean()
    //         return response
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // async deleteOneData(data) {
    //     try {
    //         const response = await this.model.deleteOne(data)
    //         return response
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // async  updateOneData(data, new_data) {
    //     try {
    //         const response = await this.model.updateOne(data,new_data)
    //         return response
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

//     async createCarrito() {
//         try {
//             let value = await this.model.findOne({}, {_id: 0, carrito: 1}).sort({carrito : -1}).limit(1)
//             let id;
//             if (value == null) {
//                 id = 1
//             }
//             else{
//                 id = value.carrito + 1
//             }
//             const response = await this.model.create({carrito: id, productos: []})
//             console.log(response);
//             return response
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async pushCarrito(id, data) {
//         try {
//             const response = await this.model.updateOne({carrito: id}, { $push: { productos: [data] } })
//             console.log(response);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async pullCarrito(id, data) {
//         try {
//             const response = await this.model.updateOne({carrito: id}, { $pull: { productos: data } })
//             console.log(response);
//         } catch (error) {
//             console.log(error);
//         }
//     }


// }

// export default ContenedorCarrito