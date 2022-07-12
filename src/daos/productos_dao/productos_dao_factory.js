import ProductosDaoMongo from "./productos_dao_mongo.js";
import ProductosDaoFile from "./productos_dao_file.js";

const opcion = process.argv[3] || "mongo";

console.log(opcion);

let dao;
switch (opcion) {
    case "file":
        dao = new ProductosDaoFile()
        break;

    default:
        dao = new ProductosDaoMongo()
}

export default class ProductosDaoFactory {
    static getDao() {
        return dao;
    }
}