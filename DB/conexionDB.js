import knexLib from 'knex'
import config from '../src/config/config.js'

let conexionDb = null

function getConexion(){
    if(!conexionDb){
        conexionDb = crearConexion()
        console.log("CONEXION CREADA CON EXITO")
    }
    return conexionDb
}

function crearConexion(){
    const knex = knexLib({
        client: 'mssql',
        connection: {
            server: config.SERVER, 
            database: config.DATABASE,
            user: config.USER, 
            password: config.PASSWORD,
        }, 
        options: {
            port: 1433,
            encrypt: true,
            enableArithAbort: true
        }
    })
    return knex
}

// function crearConexion(){
//     const knex = knexLib({
//         client: 'mssql',
//         connection: {
//             server: "srvnova.database.windows.net", 
//             database: "nova-db",
//             user: "nova", 
//             password: "Nov42020",
//         }, 
//         options: {
//             port: 1433,
//             encrypt: true,
//             enableArithAbort: true
//         }
//     })
//     return knex
// }

export default getConexion

