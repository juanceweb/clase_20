import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
        console.log("Error" + err)
    }
    else {
        console.log('Conectado a Mongo');
        
    }
})

export default mongoose