import CarritoDaoMongo from "./carrito_dao_mongo.js"
import CarritoDaoFile from "./carrito_dao_file.js"

const opcion = process.argv[3] || "mongo";

console.log(opcion);

let dao;
switch (opcion) {
    case "file":
        dao = new CarritoDaoFile()
        break;

    default:
        dao = new CarritoDaoMongo()
}

export default class CarritoDaoFactory {
    static getDao() {
        return dao;
    }
}