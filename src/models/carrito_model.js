// import mongoose from "mongoose";

// const Schema = new mongoose.Schema({
//     carrito: {
//         type: Number,
//         required: true
//     },
//     productos: [Schema]
// })

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

//     // async readOneData(data) {
//     //     try {
//     //         const response = await this.model.findOne(data,{_id: 0, __v: 0}).lean()
//     //         return response
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // }

//     // async deleteOneData(data) {
//     //     try {
//     //         const response = await this.model.deleteOne(data)
//     //         return response
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // }


//     // async  updateOneData(data, new_data) {
//     //     try {
//     //         const response = await this.model.updateOne(data,new_data)
//     //         return response
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // }

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

class ContenedorCarrito {
    constructor(){
        this.carrito = [] 
    }

    add_carrito(producto) {
        this.carrito.push(producto)
    }

    ver_carrito() {
        return this.carrito
    }
}



export default ContenedorCarrito