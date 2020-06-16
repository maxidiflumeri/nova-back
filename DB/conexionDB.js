import sql from "mssql";
import knexLib from 'knex'

function crearConexion(){
    const knex = knexLib({
        client: 'mssql',
        connection: {
            server: "srvnova.database.windows.net", 
            database: "nova-db",
            user: "nova", 
            password: "Nov42020",
        }, 
        options: {
            port: 1433,
            encrypt: true,
            enableArithAbort: true
        }
    })
    return knex
}


export default crearConexion





