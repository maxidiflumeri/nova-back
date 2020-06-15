import crearConexion from '../../db/conexionDB.js'
import sql from "mssql";

const conn = crearConexion()

const tabla = 'USUARIOS'

async function obtenerTodos() {  
    await conn.connect()
    let lista = []
    try{        
        var req = new sql.Request(conn)            
        lista =  await req.query(`SELECT * FROM ${tabla}`)
        conn.close()
    }
    catch(error){
        console.log(error)
        conn.close()
    }
    return lista.recordset    
}



export default{
    obtenerTodos
}