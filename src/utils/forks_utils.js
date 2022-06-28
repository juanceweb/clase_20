// function calculo(cant) {
//     const vueltas = Array.from(Array(cant).keys())
//     const lista = {}

//     for (const number of vueltas) {
//         const random = Math.floor(Math.random() * 1000) + 1
//         if (random in lista) {
//             lista[random] += 1
//         } 
//         else {
//         lista[random] = 1
//         }
//     }
//     return lista
// }

// process.on("message", (msg) => {
//     console.log("Cantidad:", msg);
//     const resultado = calculo(msg)
//     process.send(resultado)
// })