import getConexion from '../../db/conexionDB.js'
import sql from "mssql";

const tabla = 'TIPOS_PRODUCTO'

async function obtenerTodos() {  
    const conn = crearConexion()
    let lista = []
    try{        
        lista = await conn.select().from(tabla)
        conn.destroy()
    }
    catch(error){
        console.log(error)
        conn.destroy()
    }
    return lista    
}



export default{
    obtenerTodos
}