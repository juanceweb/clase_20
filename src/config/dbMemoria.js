export default class ConexionMemoria {

    async connect() {
        throw new Error("Memoria no necesita conexion!")
    }

    async disconnect() {
        throw new Error("Memoria no necesita desconexion")
    }
}
