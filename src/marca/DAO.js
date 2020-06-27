import getConexion from '../../db/conexionDB.js'
import sql from "mssql";



const tabla = 'MARCAS'

async function obtenerTodos() {  
    const conn = getConexion()
    let lista = []
    try{        
        lista = await conn.select().from(tabla)
    }
    catch(error){
        console.log(error)
    }
    return lista    
}



export default{
    obtenerTodos
}